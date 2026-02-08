import { getCourseProgress } from '@/lib/actions/progress'
import Link from 'next/link'

const courses = [
  {
    id: 'options',
    title: 'Options Trading Masterclass',
    description:
      'From zero to options trader. Learn calls, puts, Greeks, and pricing strategies.',
    totalChapters: 20,
    firstChapter: '/learn/options/01-what-are-options',
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8 22h16"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M10 16h12"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M12 10h8"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <rect
          x="6"
          y="6"
          width="20"
          height="20"
          rx="3"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
    ),
  },
  {
    id: 'futures',
    title: 'Futures Trading Fundamentals',
    description:
      'Master perpetual futures, leverage, liquidation, and position management.',
    totalChapters: 10,
    firstChapter: '/learn/futures/01-what-are-futures',
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6 22l6-6 5 5 9-10"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M22 11h4v4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
]

export default async function LearnPage() {
  const [optionsProgress, futuresProgress] = await Promise.all([
    getCourseProgress('options'),
    getCourseProgress('futures'),
  ])

  const progressMap: Record<string, string[]> = {
    options: optionsProgress,
    futures: futuresProgress,
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-text-primary">Learn</h1>
        <p className="text-text-secondary mt-1">
          Interactive courses to master crypto derivatives trading.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {courses.map((course) => {
          const completed = progressMap[course.id]?.length ?? 0
          const percentage =
            course.totalChapters > 0
              ? Math.round((completed / course.totalChapters) * 100)
              : 0
          const hasStarted = completed > 0

          return (
            <Link
              key={course.id}
              href={course.firstChapter}
              className="group glass rounded-2xl p-6 transition-all duration-300 hover:border-accent/40 hover:shadow-[0_0_30px_rgba(124,92,252,0.1)]"
            >
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-12 h-12 rounded-xl gradient-accent flex items-center justify-center text-white">
                  {course.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-xl font-bold text-text-primary group-hover:text-white transition-colors">
                    {course.title}
                  </h2>
                  <p className="text-text-secondary text-sm mt-1 leading-relaxed">
                    {course.description}
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                {/* Progress bar */}
                <div className="h-2 rounded-full bg-surface-overlay overflow-hidden">
                  <div
                    className="h-full rounded-full gradient-accent transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-numbers text-sm text-text-muted">
                    {completed} / {course.totalChapters} chapters completed
                  </span>
                  <span className="text-sm font-medium text-accent group-hover:text-accent-hover transition-colors">
                    {hasStarted ? 'Continue' : 'Start'} &rarr;
                  </span>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
