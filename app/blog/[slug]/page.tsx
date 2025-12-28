import { notFound } from 'next/navigation'
import { allPosts } from 'contentlayer/generated'
import { formatDate } from '../utils'
import { Mdx } from '@/app/components/mdx-client'
import { HNBadge } from '@/app/components/hn-badge'

const baseUrl = 'https://ossa-ma.github.io'

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = allPosts.find((post) => post.slug === slug)
  if (!post) {
    return
  }

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post
  let ogImage = image ? `${baseUrl}${image}` : `${baseUrl}/og.png`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      publishedTime,
      url: `${baseUrl}/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

export default async function Blog({ params }) {
  const { slug } = await params
  const post = allPosts.find((post) => post.slug === slug)

  if (!post) {
    notFound()
  }

  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(post.structuredData),
        }}
      />
      <h1 className="title font-semibold text-2xl tracking-tighter">
        {post.title}
      </h1>

      {/* Tags and HN Badge */}
      {((post.tags && post.tags.length > 0) || post.hnNumber1) && (
        <div className="flex flex-wrap gap-2 mt-3">
          {post.hnNumber1 && <HNBadge />}
          {post.tags && post.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs font-medium rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Date and Reading Time */}
      <div className="flex items-center gap-3 mt-2 mb-8 text-sm text-neutral-600 dark:text-neutral-400">
        <p>{formatDate(post.publishedAt)}</p>
        <span>•</span>
        <p>{post.readingTime} min read</p>
      </div>

      <article className="prose">
        <Mdx code={post.body.code} />
      </article>
    </section>
  )
}
