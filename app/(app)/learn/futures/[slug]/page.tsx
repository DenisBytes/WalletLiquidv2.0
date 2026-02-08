import { notFound } from 'next/navigation'
import { readFile } from 'fs/promises'
import path from 'path'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getCourseProgress } from '@/lib/actions/progress'
import { ChapterLayout } from '@/components/courses/chapter-layout'
import { mdxComponents } from '@/components/courses/mdx-components'
import futuresMeta from '@/content/courses/futures/meta.json'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function FuturesChapterPage({ params }: PageProps) {
  const { slug } = await params

  const chapter = futuresMeta.chapters.find((c) => c.slug === slug)
  if (!chapter) notFound()

  const mdxPath = path.join(
    process.cwd(),
    'content',
    'courses',
    'futures',
    `${slug}.mdx`
  )
  let source: string
  try {
    source = await readFile(mdxPath, 'utf-8')
  } catch {
    notFound()
  }

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
