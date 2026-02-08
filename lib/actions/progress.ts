'use server'

import { db } from '@/lib/db'
import { courseProgress } from '@/lib/db/schema'
import { eq, and } from 'drizzle-orm'
import { getOrCreateUser } from './user'

export async function markChapterComplete(courseId: string, chapterSlug: string) {
  const user = await getOrCreateUser()

  await db
    .insert(courseProgress)
    .values({
      userId: user.id,
      courseId,
      chapterSlug,
    })
    .onConflictDoNothing()

  return { success: true }
}

export async function getCourseProgress(courseId: string) {
  const user = await getOrCreateUser()

  const rows = await db
    .select({ chapterSlug: courseProgress.chapterSlug })
    .from(courseProgress)
    .where(and(eq(courseProgress.userId, user.id), eq(courseProgress.courseId, courseId)))

  return rows.map((r) => r.chapterSlug)
}
