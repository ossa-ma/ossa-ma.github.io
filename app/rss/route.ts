import { allPosts } from 'contentlayer/generated'

export const dynamic = 'force-static'

const baseUrl = 'https://ossa-ma.github.io'

export async function GET() {
  const itemsXml = allPosts
    .sort((a, b) => {
      if (new Date(a.publishedAt) > new Date(b.publishedAt)) {
        return -1
      }
      return 1
    })
    .map(
      (post) =>
        `<item>
          <title>${post.title}</title>
          <link>${baseUrl}/blog/${post.slug}</link>
          <description>${post.summary || ''}</description>
          <pubDate>${new Date(
            post.publishedAt
          ).toUTCString()}</pubDate>
        </item>`
    )
    .join('\n')

  const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
        <title>Ossama Chaib</title>
        <link>${baseUrl}</link>
        <description>This is my portfolio RSS feed</description>
        ${itemsXml}
    </channel>
  </rss>`

  return new Response(rssFeed, {
    headers: {
      'Content-Type': 'text/xml',
    },
  })
}
