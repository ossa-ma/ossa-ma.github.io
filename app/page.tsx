import { allPosts } from 'contentlayer/generated'
import Link from 'next/link'

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
      <div className="my-8">
        <h2 className="mb-4 text-xl font-semibold tracking-tighter">
          Posts
        </h2>
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
                <p className="text-neutral-900 dark:text-neutral-100 tracking-tight">
                  {post.title}
                </p>
                <p className="text-neutral-600 dark:text-neutral-400">
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </Link>
          ))}
      </div>
    </section>
  )
}
