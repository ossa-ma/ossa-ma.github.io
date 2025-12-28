import Link from 'next/link'
import { allPosts } from 'contentlayer/generated'
import { formatDate } from '../blog/utils'
import { HNBadge } from './hn-badge'

export function BlogPosts() {
  return (
    <div>
      {allPosts
        .sort((a, b) => {
          if (new Date(a.publishedAt) > new Date(b.publishedAt)) {
            return -1
          }
          return 1
        })
        .map((post) => (
          <Link
            key={post.slug}
            className="flex flex-col space-y-1 mb-4"
            href={`/blog/${post.slug}`}
          >
            <div className="w-full flex flex-col">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="font-medium">{post.title}</p>
                {post.hnNumber1 && <HNBadge />}
              </div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {post.summary}
              </p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                {formatDate(post.publishedAt)}
              </p>
            </div>
          </Link>
        ))}
    </div>
  )
}
