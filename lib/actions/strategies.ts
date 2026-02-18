'use server'

import { db } from '@/lib/db'
import { users, optionsPositions, optionStrategies, tradeHistory } from '@/lib/db/schema'
import { eq, and, sql } from 'drizzle-orm'
import { getOrCreateUser } from './user'
import type { StrategyType, StrategyLeg } from '@/lib/engine/strategies'
import type { OptionType, OptionSide } from '@/lib/engine/types'

export async function openStrategy(data: {
  symbol: string
  strategyType: StrategyType
  legs: StrategyLeg[]
  expirationDate: Date
  maxProfit?: number
  maxLoss?: number
}) {
  const user = await getOrCreateUser()
  const balance = parseFloat(user.balance)

  // Net premium: sum BUY legs (debit) minus SELL legs (credit)
  let netPremium = 0
  for (const leg of data.legs) {
    const multiplier = leg.side === 'BUY' ? 1 : -1
    netPremium += leg.premium * leg.quantity * multiplier
  }

  if (netPremium > 0 && balance < netPremium) {
    throw new Error('Insufficient balance')
  }

  // Insert each leg as an individual options position
  const legRecords: {
    optionPositionId: string
    optionType: OptionType
    side: OptionSide
    strike: number
    premium: number
    quantity: number
  }[] = []

  for (const leg of data.legs) {
    const [position] = await db
      .insert(optionsPositions)
      .values({
        userId: user.id,
        symbol: data.symbol,
        optionType: leg.optionType,
        side: leg.side,
        strikePrice: leg.strike.toString(),
        premium: leg.premium.toString(),
        expirationDate: data.expirationDate,
        quantity: leg.quantity.toString(),
        greeks: leg.greeks,
      })
      .returning()

    legRecords.push({
      optionPositionId: position.id,
      optionType: leg.optionType,
      side: leg.side,
      strike: leg.strike,
      premium: leg.premium,
      quantity: leg.quantity,
    })
  }

  const [strategy] = await db
    .insert(optionStrategies)
    .values({
      userId: user.id,
      symbol: data.symbol,
      strategyType: data.strategyType,
      legs: legRecords,
      totalPremium: netPremium.toString(),
      maxProfit: data.maxProfit?.toString(),
      maxLoss: data.maxLoss?.toString(),
    })
    .returning()

  // Debit net premium from balance (negative netPremium means credit, so subtract either way)
  if (netPremium !== 0) {
    await db
      .update(users)
      .set({ balance: sql`${users.balance}::numeric - ${netPremium.toString()}::numeric` })
      .where(eq(users.id, user.id))
  }

  await db.insert(tradeHistory).values({
    userId: user.id,
    positionId: strategy.id,
    type: 'OPTIONS',
    action: 'OPEN',
    price: Math.abs(netPremium).toString(),
    quantity: data.legs.length.toString(),
  })

  return strategy
}

export async function closeStrategy(strategyId: string) {
  const user = await getOrCreateUser()

  const [strategy] = await db
    .select()
    .from(optionStrategies)
    .where(
      and(
        eq(optionStrategies.id, strategyId),
        eq(optionStrategies.userId, user.id),
        eq(optionStrategies.status, 'OPEN')
      )
    )

  if (!strategy) throw new Error('Strategy not found')

  const legs = strategy.legs as {
    optionPositionId: string
    optionType: OptionType
    side: OptionSide
    strike: number
    premium: number
    quantity: number
  }[]

  // Close all linked option positions
  for (const leg of legs) {
    await db
      .update(optionsPositions)
      .set({ status: 'CLOSED', closedAt: new Date() })
      .where(eq(optionsPositions.id, leg.optionPositionId))
  }

  // Close the strategy
  await db
    .update(optionStrategies)
    .set({ status: 'CLOSED', closedAt: new Date() })
    .where(eq(optionStrategies.id, strategyId))

  await db.insert(tradeHistory).values({
    userId: user.id,
    positionId: strategy.id,
    type: 'OPTIONS',
    action: 'CLOSE',
    price: Math.abs(parseFloat(strategy.totalPremium)).toString(),
    quantity: legs.length.toString(),
  })

  return strategy
}

export async function getOpenStrategies() {
  const user = await getOrCreateUser()

  return db
    .select()
    .from(optionStrategies)
    .where(
      and(
        eq(optionStrategies.userId, user.id),
        eq(optionStrategies.status, 'OPEN')
      )
    )
}
