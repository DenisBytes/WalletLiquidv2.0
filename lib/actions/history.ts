'use server'

import { db } from '@/lib/db'
import { futuresPositions, optionsPositions, tradeHistory } from '@/lib/db/schema'
import { eq, desc, and } from 'drizzle-orm'
import { getOrCreateUser } from './user'

export async function getTradeHistory(filters?: {
  type?: 'FUTURES' | 'OPTIONS'
  limit?: number
  offset?: number
}) {
  const user = await getOrCreateUser()
  const limit = filters?.limit ?? 50
  const offset = filters?.offset ?? 0

  const conditions = [eq(tradeHistory.userId, user.id)]
  if (filters?.type) {
    conditions.push(eq(tradeHistory.type, filters.type))
  }

  return db
    .select()
    .from(tradeHistory)
    .where(and(...conditions))
    .orderBy(desc(tradeHistory.executedAt))
    .limit(limit)
    .offset(offset)
}

export async function getOpenPositions() {
  const user = await getOrCreateUser()

  const [futures, options] = await Promise.all([
    db
      .select()
      .from(futuresPositions)
      .where(and(eq(futuresPositions.userId, user.id), eq(futuresPositions.status, 'OPEN'))),
    db
      .select()
      .from(optionsPositions)
      .where(and(eq(optionsPositions.userId, user.id), eq(optionsPositions.status, 'OPEN'))),
  ])

  return { futures, options }
}
