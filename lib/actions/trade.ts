'use server'

import { db } from '@/lib/db'
import { users, futuresPositions, optionsPositions, tradeHistory } from '@/lib/db/schema'
import { eq, and, sql } from 'drizzle-orm'
import { getOrCreateUser } from './user'
import { calculateMargin, calculateLiquidationPrice, calculatePnl } from '@/lib/engine/futures'
import type { PositionSide, OptionType, OptionSide } from '@/lib/engine/types'
import { z } from 'zod'

const openFuturesSchema = z.object({
  symbol: z.string().min(1),
  side: z.enum(['LONG', 'SHORT']),
  entryPrice: z.number().positive(),
  quantity: z.number().positive(),
  leverage: z.number().int().min(1).max(125),
})

const openOptionsSchema = z.object({
  symbol: z.string().min(1),
  optionType: z.enum(['CALL', 'PUT']),
  side: z.enum(['BUY', 'SELL']),
  strikePrice: z.number().positive(),
  premium: z.number().positive(),
  expirationDate: z.string().min(1),
  quantity: z.number().positive(),
  greeks: z.object({
    delta: z.number(),
    gamma: z.number(),
    theta: z.number(),
    vega: z.number(),
  }),
})

export async function openFuturesPosition(data: {
  symbol: string
  side: PositionSide
  entryPrice: number
  quantity: number
  leverage: number
}) {
  const validated = openFuturesSchema.parse(data)
  const user = await getOrCreateUser()
  const balance = parseFloat(user.balance)

  const margin = calculateMargin(validated.quantity, validated.entryPrice, validated.leverage)
  if (balance < margin) throw new Error('Insufficient balance')

  const liquidationPrice = calculateLiquidationPrice(
    validated.entryPrice,
    validated.leverage,
    validated.side
  )

  const [position] = await db
    .insert(futuresPositions)
    .values({
      userId: user.id,
      symbol: validated.symbol,
      side: validated.side,
      entryPrice: validated.entryPrice.toString(),
      quantity: validated.quantity.toString(),
      leverage: validated.leverage,
      liquidationPrice: liquidationPrice.toString(),
      margin: margin.toString(),
    })
    .returning()

  await db
    .update(users)
    .set({ balance: sql`${users.balance}::numeric - ${margin.toString()}::numeric` })
    .where(eq(users.id, user.id))

  await db.insert(tradeHistory).values({
    userId: user.id,
    positionId: position.id,
    type: 'FUTURES',
    action: 'OPEN',
    price: validated.entryPrice.toString(),
    quantity: validated.quantity.toString(),
  })

  return position
}

export async function closeFuturesPosition(positionId: string, closePrice: number) {
  const user = await getOrCreateUser()

  const [position] = await db
    .select()
    .from(futuresPositions)
    .where(
      and(
        eq(futuresPositions.id, positionId),
        eq(futuresPositions.userId, user.id),
        eq(futuresPositions.status, 'OPEN')
      )
    )

  if (!position) throw new Error('Position not found')

  const pnl = calculatePnl(
    parseFloat(position.entryPrice),
    closePrice,
    parseFloat(position.quantity),
    position.side as PositionSide
  )

  const margin = parseFloat(position.margin)
  const returnAmount = Math.max(margin + pnl, 0)

  await db
    .update(futuresPositions)
    .set({ status: 'CLOSED', closedAt: new Date() })
    .where(eq(futuresPositions.id, positionId))

  await db
    .update(users)
    .set({ balance: sql`${users.balance}::numeric + ${returnAmount.toString()}::numeric` })
    .where(eq(users.id, user.id))

  await db.insert(tradeHistory).values({
    userId: user.id,
    positionId: position.id,
    type: 'FUTURES',
    action: 'CLOSE',
    price: closePrice.toString(),
    quantity: position.quantity,
    pnl: pnl.toString(),
  })

  return pnl
}

export async function liquidatePosition(positionId: string, markPrice: number) {
  const user = await getOrCreateUser()

  const [position] = await db
    .select()
    .from(futuresPositions)
    .where(
      and(
        eq(futuresPositions.id, positionId),
        eq(futuresPositions.userId, user.id),
        eq(futuresPositions.status, 'OPEN')
      )
    )

  if (!position) throw new Error('Position not found')

  const margin = parseFloat(position.margin)
  const pnl = -margin

  await db
    .update(futuresPositions)
    .set({ status: 'LIQUIDATED', closedAt: new Date() })
    .where(eq(futuresPositions.id, positionId))

  await db.insert(tradeHistory).values({
    userId: user.id,
    positionId: position.id,
    type: 'FUTURES',
    action: 'LIQUIDATION',
    price: markPrice.toString(),
    quantity: position.quantity,
    pnl: pnl.toString(),
  })
}

export async function openOptionsPosition(data: {
  symbol: string
  optionType: OptionType
  side: OptionSide
  strikePrice: number
  premium: number
  expirationDate: string
  quantity: number
  greeks: { delta: number; gamma: number; theta: number; vega: number }
}) {
  const validated = openOptionsSchema.parse(data)
  const user = await getOrCreateUser()
  const balance = parseFloat(user.balance)
  const totalCost = validated.premium * validated.quantity

  if (validated.side === 'BUY' && balance < totalCost) {
    throw new Error('Insufficient balance')
  }

  const balanceDelta = validated.side === 'BUY' ? -totalCost : totalCost

  const [position] = await db
    .insert(optionsPositions)
    .values({
      userId: user.id,
      symbol: validated.symbol,
      optionType: validated.optionType,
      side: validated.side,
      strikePrice: validated.strikePrice.toString(),
      premium: validated.premium.toString(),
      expirationDate: new Date(validated.expirationDate),
      quantity: validated.quantity.toString(),
      greeks: validated.greeks,
    })
    .returning()

  await db
    .update(users)
    .set({ balance: sql`${users.balance}::numeric + ${balanceDelta.toString()}::numeric` })
    .where(eq(users.id, user.id))

  await db.insert(tradeHistory).values({
    userId: user.id,
    positionId: position.id,
    type: 'OPTIONS',
    action: 'OPEN',
    price: validated.premium.toString(),
    quantity: validated.quantity.toString(),
  })

  return position
}

export async function closeOptionsPosition(positionId: string, closePrice: number) {
  const user = await getOrCreateUser()

  const [position] = await db
    .select()
    .from(optionsPositions)
    .where(
      and(
        eq(optionsPositions.id, positionId),
        eq(optionsPositions.userId, user.id),
        eq(optionsPositions.status, 'OPEN')
      )
    )

  if (!position) throw new Error('Position not found')

  const premium = parseFloat(position.premium)
  const quantity = parseFloat(position.quantity)

  const pnl =
    position.side === 'BUY'
      ? (closePrice - premium) * quantity
      : (premium - closePrice) * quantity

  await db
    .update(optionsPositions)
    .set({ status: 'CLOSED', closedAt: new Date() })
    .where(eq(optionsPositions.id, positionId))

  await db
    .update(users)
    .set({ balance: sql`${users.balance}::numeric + ${pnl.toString()}::numeric` })
    .where(eq(users.id, user.id))

  await db.insert(tradeHistory).values({
    userId: user.id,
    positionId: position.id,
    type: 'OPTIONS',
    action: 'CLOSE',
    price: closePrice.toString(),
    quantity: position.quantity,
    pnl: pnl.toString(),
  })

  return pnl
}
