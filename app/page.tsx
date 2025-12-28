import { allPosts } from 'contentlayer/generated'
import Link from 'next/link'
import { formatDate } from 'app/blog/utils'
import { HNBadge } from './components/hn-badge'

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Ossama Chaib
      </h1>
      <p className="mb-4">
        I am a software engineer with a First Class MEng in Computing from
        Imperial College London and a few years of experience in industry.
      </p>
      <p className="mb-4">
        My main motivation is to automate everything so I can spend time doing things that
        computers and AI can't do: MMA, wrestling, BJJ, Muay Thai, TENNIS, cycling, watching Seinfeld,
        and playing Fortnite.
      </p>
      <p className="mb-4">
        This website is a place for me to share my thoughts on technology,
        education, and personal development. You'll find my blog posts below,
        where I explore topics that I'm passionate about or random things that won't leave my mind
        until they are written down.
      </p>
      <p className="mb-4">
        I'm currently open to opportunities in AI infrastructure, backend systems, deep tech research, forward deployed engineering-
        <a
          href="/cv"
          className="ml-1 font-medium text-neutral-900 underline decoration-neutral-400 underline-offset-2 transition-colors hover:text-neutral-600 dark:text-neutral-100 dark:decoration-neutral-600 dark:hover:text-neutral-300"
        >
          view my full background and work
        </a>.
      </p>
      <div className="my-8 flex flex-col space-y-4">
        <h2 className="text-sm font-medium tracking-wider text-neutral-500 dark:text-neutral-400">
          Posts
        </h2>
        <div className="flex flex-col space-y-4">
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
                className="flex flex-col space-y-1"
                href={`/blog/${post.slug}`}
              >
                <div className="flex w-full justify-between items-baseline gap-4">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-neutral-900 dark:text-neutral-100 tracking-tight font-medium">
                      {post.title}
                    </p>
                    {post.hnNumber1 && <HNBadge />}
                  </div>
                  <p className="text-neutral-500 dark:text-neutral-400 text-sm font-mono tabular-nums shrink-0 text-right">
                    {formatDate(post.publishedAt)}
                  </p>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </section>
  )
}
