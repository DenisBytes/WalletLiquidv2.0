'use server'

import { db } from '@/lib/db'
import { users, futuresPositions, fundingRateHistory, tradeHistory } from '@/lib/db/schema'
import { eq, and, desc, gte, sql } from 'drizzle-orm'
import { getOrCreateUser } from './user'
import { calculateFundingPayment } from '@/lib/engine/funding'
import type { PositionSide } from '@/lib/engine/types'

const FUNDING_INTERVAL_MS = 8 * 60 * 60 * 1000 // 8 hours
const DEFAULT_FUNDING_RATE = 0.0001

interface BinancePremiumIndex {
  symbol: string
  lastFundingRate: string
  nextFundingTime: number
}

async function fetchFundingRate(symbol: string): Promise<{ rate: number; nextFundingTime: number }> {
  try {
    const res = await fetch(`https://fapi.binance.com/fapi/v1/premiumIndex?symbol=${symbol}USDT`)
    if (!res.ok) throw new Error(`Binance API returned ${res.status}`)
    const data = (await res.json()) as BinancePremiumIndex
    return {
      rate: parseFloat(data.lastFundingRate),
      nextFundingTime: data.nextFundingTime,
    }
  } catch {
    return { rate: DEFAULT_FUNDING_RATE, nextFundingTime: Date.now() + FUNDING_INTERVAL_MS }
  }
}

export async function applyFundingRates() {
  const user = await getOrCreateUser()

  const openPositions = await db
    .select()
    .from(futuresPositions)
    .where(
      and(
        eq(futuresPositions.userId, user.id),
        eq(futuresPositions.status, 'OPEN')
      )
    )

  let applied = 0
  let totalPayment = 0

  const cutoff = new Date(Date.now() - FUNDING_INTERVAL_MS)

  for (const position of openPositions) {
    // Check if funding was already applied within the last 8 hours
    const [recentFunding] = await db
      .select()
      .from(fundingRateHistory)
      .where(
        and(
          eq(fundingRateHistory.positionId, position.id),
          gte(fundingRateHistory.appliedAt, cutoff)
        )
      )
      .orderBy(desc(fundingRateHistory.appliedAt))
      .limit(1)

    if (recentFunding) continue

    const { rate } = await fetchFundingRate(position.symbol)
    const quantity = parseFloat(position.quantity)
    const markPrice = position.markPrice
      ? parseFloat(position.markPrice)
      : parseFloat(position.entryPrice)

    const payment = calculateFundingPayment(
      quantity,
      markPrice,
      rate,
      position.side as PositionSide
    )

    await db.insert(fundingRateHistory).values({
      userId: user.id,
      positionId: position.id,
      symbol: position.symbol,
      fundingRate: rate.toString(),
      payment: payment.toString(),
    })

    // Positive payment = credit, negative = debit
    await db
      .update(users)
      .set({ balance: sql`${users.balance}::numeric + ${payment.toString()}::numeric` })
      .where(eq(users.id, user.id))

    await db.insert(tradeHistory).values({
      userId: user.id,
      positionId: position.id,
      type: 'FUTURES',
      action: 'FUNDING',
      price: markPrice.toString(),
      quantity: position.quantity,
      pnl: payment.toString(),
    })

    applied++
    totalPayment += payment
  }

  return { applied, totalPayment }
}

export async function getFundingHistory(positionId?: string) {
  const user = await getOrCreateUser()

  const conditions = [eq(fundingRateHistory.userId, user.id)]
  if (positionId) {
    conditions.push(eq(fundingRateHistory.positionId, positionId))
  }

  return db
    .select()
    .from(fundingRateHistory)
    .where(and(...conditions))
    .orderBy(desc(fundingRateHistory.appliedAt))
}

export async function getCurrentFundingRate(symbol: string) {
  return fetchFundingRate(symbol)
}
