'use server'

import { auth0 } from '@/lib/auth0'
import { db } from '@/lib/db'
import { users } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export async function getOrCreateUser() {
  const session = await auth0.getSession()
  if (!session) throw new Error('Not authenticated')

  const userId = session.user.sub

  const [existing] = await db.select().from(users).where(eq(users.id, userId))
  if (existing) return existing

  const [created] = await db
    .insert(users)
    .values({ id: userId, balance: '100000' })
    .returning()

  return created
}

export async function getBalance() {
  const user = await getOrCreateUser()
  return parseFloat(user.balance)
}
