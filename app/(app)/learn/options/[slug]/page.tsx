import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getCourseProgress } from '@/lib/actions/progress'
import { ChapterLayout } from '@/components/courses/chapter-layout'
import { mdxComponents } from '@/components/courses/mdx-components'
import optionsMeta from '@/content/courses/options/meta.json'
import { optionsContent } from '@/content/courses/options'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function OptionsChapterPage({ params }: PageProps) {
  const { slug } = await params

  const chapter = optionsMeta.chapters.find((c) => c.slug === slug)
  if (!chapter) notFound()

  const source = optionsContent[slug]
  if (!source) notFound()

  const progress = await getCourseProgress('options')
  const chapterIndex = optionsMeta.chapters.findIndex((c) => c.slug === slug)

  return (
    <ChapterLayout
      courseId="options"
      chapters={optionsMeta.chapters}
      currentSlug={slug}
      currentIndex={chapterIndex}
      progress={progress}
      basePath="/learn/options"
    >
      <MDXRemote source={source} components={mdxComponents} />
    </ChapterLayout>
  )
}

export function generateStaticParams() {
  return optionsMeta.chapters.map((c) => ({ slug: c.slug }))
}
