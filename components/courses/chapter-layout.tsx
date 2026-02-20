'use client'

import { useState, useTransition } from 'react'
import Link from 'next/link'
import { markChapterComplete } from '@/lib/actions/progress'
import { cn } from '@/lib/utils/cn'

interface Chapter {
  slug: string
  title: string
}

interface ChapterLayoutProps {
  courseId: string
  chapters: Chapter[]
  currentSlug: string
  currentIndex: number
  progress: string[]
  basePath: string
  children: React.ReactNode
}

export function ChapterLayout({
  courseId,
  chapters,
  currentSlug,
  currentIndex,
  progress,
  basePath,
  children,
}: ChapterLayoutProps) {
  const [completedSlugs, setCompletedSlugs] = useState<Set<string>>(
    new Set(progress)
  )
  const [isPending, startTransition] = useTransition()

  const isCurrentCompleted = completedSlugs.has(currentSlug)
  const completedCount = completedSlugs.size
  const percentage = Math.round((completedCount / chapters.length) * 100)

  const prevChapter = currentIndex > 0 ? chapters[currentIndex - 1] : null
  const nextChapter =
    currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null

  function handleMarkComplete() {
    startTransition(async () => {
      await markChapterComplete(courseId, currentSlug)
      setCompletedSlugs((prev) => new Set([...prev, currentSlug]))
    })
  }

  return (
    <div className="flex gap-0 -m-6 h-[calc(100vh-4rem)]">
      {/* Left sidebar — chapter list */}
      <aside className="hidden lg:flex w-72 shrink-0 flex-col border-r border-border bg-surface/50 overflow-y-auto">
        <div className="p-4 border-b border-border-subtle">
          <Link
            href="/learn"
            className="text-xs text-text-muted hover:text-text-secondary transition-colors"
          >
            &larr; All Courses
          </Link>
          <div className="mt-3">
            <div className="flex items-center justify-between text-xs text-text-muted mb-1.5">
              <span>Progress</span>
              <span className="font-numbers">
                {completedCount}/{chapters.length}
              </span>
            </div>
            <div className="h-1.5 rounded-full bg-surface-overlay overflow-hidden">
              <div
                className="h-full rounded-full gradient-accent transition-all duration-500"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        </div>

        <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto">
          {chapters.map((chapter, i) => {
            const isCompleted = completedSlugs.has(chapter.slug)
            const isCurrent = chapter.slug === currentSlug

            return (
              <Link
                key={chapter.slug}
                href={`${basePath}/${chapter.slug}`}
                className={cn(
                  'flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-200',
                  isCurrent
                    ? 'bg-accent-muted text-text-primary'
                    : 'text-text-secondary hover:bg-surface-overlay hover:text-text-primary'
                )}
              >
                <span className="shrink-0">
                  {isCompleted ? (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="text-success"
                    >
                      <circle cx="8" cy="8" r="7" fill="currentColor" opacity="0.15" />
                      <path
                        d="M5 8l2 2 4-4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <circle
                        cx="8"
                        cy="8"
                        r="6.5"
                        stroke="currentColor"
                        strokeWidth="1"
                        className={
                          isCurrent ? 'text-accent' : 'text-text-muted'
                        }
                      />
                    </svg>
                  )}
                </span>
                <span className="truncate">
                  {i + 1}. {chapter.title}
                </span>
              </Link>
            )
          })}
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-6 py-8 lg:px-10">
          {/* Mobile breadcrumb */}
          <div className="lg:hidden mb-4">
            <Link
              href="/learn"
              className="text-xs text-text-muted hover:text-text-secondary transition-colors"
            >
              &larr; All Courses
            </Link>
          </div>

          {/* Chapter header */}
          <div className="mb-8">
            <span className="text-xs font-numbers text-text-muted uppercase tracking-wider">
              Chapter {currentIndex + 1} of {chapters.length}
            </span>
          </div>

          {/* Chapter content */}
          <article className="min-h-[50vh]">{children}</article>

          {/* Bottom navigation */}
          <div className="mt-12 pt-6 border-t border-border-subtle space-y-4">
            {/* Mark complete button */}
            {!isCurrentCompleted && (
              <button
                onClick={handleMarkComplete}
                disabled={isPending}
                className={cn(
                  'w-full py-3 rounded-xl text-sm font-medium transition-all duration-200',
                  'gradient-accent text-white hover:opacity-90',
                  'disabled:opacity-50 disabled:cursor-not-allowed'
                )}
              >
                {isPending ? 'Saving...' : 'Mark as Complete'}
              </button>
            )}
            {isCurrentCompleted && (
              <div className="w-full py-3 rounded-xl text-sm font-medium text-center text-success bg-success-muted border border-success">
                Completed
              </div>
            )}

            {/* Prev / Next */}
            <div className="flex items-center justify-between gap-4">
              {prevChapter ? (
                <Link
                  href={`${basePath}/${prevChapter.slug}`}
                  className="flex-1 glass rounded-xl p-4 hover:border-accent-muted transition-colors group"
                >
                  <span className="text-xs text-text-muted">Previous</span>
                  <p className="text-sm text-text-primary mt-0.5 group-hover:text-white transition-colors truncate">
                    &larr; {prevChapter.title}
                  </p>
                </Link>
              ) : (
                <div className="flex-1" />
              )}
              {nextChapter ? (
                <Link
                  href={`${basePath}/${nextChapter.slug}`}
                  className="flex-1 glass rounded-xl p-4 hover:border-accent-muted transition-colors group text-right"
                >
                  <span className="text-xs text-text-muted">Next</span>
                  <p className="text-sm text-text-primary mt-0.5 group-hover:text-white transition-colors truncate">
                    {nextChapter.title} &rarr;
                  </p>
                </Link>
              ) : (
                <div className="flex-1" />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Right sidebar — placeholder for "On this page" */}
      <aside className="hidden xl:block w-56 shrink-0 border-l border-border bg-surface/50 p-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-3">
          On this page
        </p>
        <p className="text-xs text-text-muted italic">
          Auto-generated from headings
        </p>
      </aside>
    </div>
  )
}
