import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getCourseProgress } from '@/lib/actions/progress'
import { ChapterLayout } from '@/components/courses/chapter-layout'
import { mdxComponents } from '@/components/courses/mdx-components'
import futuresMeta from '@/content/courses/futures/meta.json'
import { futuresContent } from '@/content/courses/futures'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function FuturesChapterPage({ params }: PageProps) {
  const { slug } = await params

  const chapter = futuresMeta.chapters.find((c) => c.slug === slug)
  if (!chapter) notFound()

  const source = futuresContent[slug]
  if (!source) notFound()

  const progress = await getCourseProgress('futures')
  const chapterIndex = futuresMeta.chapters.findIndex((c) => c.slug === slug)

  return (
    <ChapterLayout
      courseId="futures"
      chapters={futuresMeta.chapters}
      currentSlug={slug}
      currentIndex={chapterIndex}
      progress={progress}
      basePath="/learn/futures"
    >
      <MDXRemote source={source} components={mdxComponents} />
    </ChapterLayout>
  )
}

export function generateStaticParams() {
  return futuresMeta.chapters.map((c) => ({ slug: c.slug }))
}
