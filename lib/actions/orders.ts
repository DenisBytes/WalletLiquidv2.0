'use server'

import { db } from '@/lib/db'
import { users, futuresPositions, orders, tradeHistory } from '@/lib/db/schema'
import { eq, and, sql } from 'drizzle-orm'
import { getOrCreateUser } from './user'
import { calculatePnl } from '@/lib/engine/futures'
import { validateOrderPrice } from '@/lib/engine/orders'
import type { PositionSide } from '@/lib/engine/types'

export async function createOrder(data: {
  positionId: string
  type: 'STOP_LOSS' | 'TAKE_PROFIT' | 'TRAILING_STOP'
  triggerPrice: number
  trailingDistance?: number
}) {
  const user = await getOrCreateUser()

  const [position] = await db
    .select()
    .from(futuresPositions)
    .where(
      and(
        eq(futuresPositions.id, data.positionId),
        eq(futuresPositions.userId, user.id),
        eq(futuresPositions.status, 'OPEN')
      )
    )

  if (!position) throw new Error('Position not found')

  if (data.type !== 'TRAILING_STOP') {
    const valid = validateOrderPrice(
      data.triggerPrice,
      parseFloat(position.entryPrice),
      position.side as PositionSide,
      data.type
    )
    if (!valid) throw new Error('Invalid trigger price for order type')
  }

  const [order] = await db
    .insert(orders)
    .values({
      userId: user.id,
      positionId: data.positionId,
      type: data.type,
      triggerPrice: data.triggerPrice.toString(),
      trailingDistance: data.trailingDistance?.toString(),
    })
    .returning()

  return order
}

export async function executeOrder(orderId: string, executePrice: number) {
  const user = await getOrCreateUser()

  const [order] = await db
    .select()
    .from(orders)
    .where(
      and(
        eq(orders.id, orderId),
        eq(orders.userId, user.id),
        eq(orders.status, 'PENDING')
      )
    )

  if (!order) throw new Error('Order not found')

  const [position] = await db
    .select()
    .from(futuresPositions)
    .where(
      and(
        eq(futuresPositions.id, order.positionId),
        eq(futuresPositions.userId, user.id)
      )
    )

  if (!position) throw new Error('Position not found')

  if (position.status !== 'OPEN') {
    await db
      .update(orders)
      .set({ status: 'CANCELLED' })
      .where(eq(orders.id, orderId))
    return null
  }

  const pnl = calculatePnl(
    parseFloat(position.entryPrice),
    executePrice,
    parseFloat(position.quantity),
    position.side as PositionSide
  )

  const margin = parseFloat(position.margin)
  const returnAmount = Math.max(margin + pnl, 0)

  await db
    .update(futuresPositions)
    .set({ status: 'CLOSED', closedAt: new Date() })
    .where(eq(futuresPositions.id, order.positionId))

  await db
    .update(users)
    .set({ balance: sql`${users.balance}::numeric + ${returnAmount.toString()}::numeric` })
    .where(eq(users.id, user.id))

  await db
    .update(orders)
    .set({ status: 'TRIGGERED', triggeredAt: new Date() })
    .where(eq(orders.id, orderId))

  await db
    .update(orders)
    .set({ status: 'CANCELLED' })
    .where(
      and(
        eq(orders.positionId, order.positionId),
        eq(orders.status, 'PENDING')
      )
    )

  const action = order.type === 'TAKE_PROFIT' ? 'TAKE_PROFIT' : 'STOP_LOSS'

  await db.insert(tradeHistory).values({
    userId: user.id,
    positionId: order.positionId,
    type: 'FUTURES',
    action,
    price: executePrice.toString(),
    quantity: position.quantity,
    pnl: pnl.toString(),
  })

  return pnl
}

export async function cancelOrder(orderId: string) {
  const user = await getOrCreateUser()

  await db
    .update(orders)
    .set({ status: 'CANCELLED' })
    .where(
      and(
        eq(orders.id, orderId),
        eq(orders.userId, user.id),
        eq(orders.status, 'PENDING')
      )
    )
}

export async function getOrdersForPosition(positionId: string) {
  const user = await getOrCreateUser()

  return db
    .select()
    .from(orders)
    .where(
      and(
        eq(orders.positionId, positionId),
        eq(orders.userId, user.id),
        eq(orders.status, 'PENDING')
      )
    )
}
