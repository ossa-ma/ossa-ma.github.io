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
        Imperial College London, and I am passionate about transitioning into a
        career in secondary Computer Science education. My professional
        experience at companies like Fitch Group and Shell has given me a deep,
        practical understanding of software engineering, data science, and
        machine learning, which I am eager to share with the next generation of
        innovators.
      </p>
      <p className="mb-4">
        Beyond my professional life, I am deeply committed to martial arts. I
        train and spar regularly in MMA, wrestling, BJJ, and Muay Thai, which has
        instilled in me a strong sense of discipline and resilience. I am also
        an avid tennis player, and I find that the strategic thinking required on
        the court complements my problem-solving skills as an engineer.
      </p>
      <p className="mb-4">
        This website is a place for me to share my thoughts on technology,
        education, and personal development. You'll find my blog posts below,
        where I explore topics that I'm passionate about, from the intricacies
        of software development to the lessons I've learned from my time on the
        mats and the court.
      </p>
      <div className="my-8">
        <h2 className="mb-4 text-xl font-semibold tracking-tighter">
          My Blog
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
