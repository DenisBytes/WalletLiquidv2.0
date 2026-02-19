'use server'

import { db } from '@/lib/db'
import { tradeHistory } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { getOrCreateUser } from './user'
import { calculateAnalytics } from '@/lib/engine/analytics'

export async function getPortfolioAnalytics() {
  const user = await getOrCreateUser()
  const balance = parseFloat(user.balance)

  const trades = await db
    .select()
    .from(tradeHistory)
    .where(eq(tradeHistory.userId, user.id))

  return calculateAnalytics(trades, balance)
}
