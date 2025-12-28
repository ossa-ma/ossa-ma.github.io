import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import remarkGfm from 'remark-gfm'

const baseUrl = 'https://ossa-ma.github.io'

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    publishedAt: { type: 'date', required: true },
    summary: { type: 'string' },
    image: { type: 'string' },
    tags: { type: 'list', of: { type: 'string' }, required: false },
    hnNumber1: { type: 'boolean', required: false },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath,
    },
    readingTime: {
      type: 'number',
      resolve: (doc) => {
        const wordsPerMinute = 200
        const wordCount = doc.body.raw.split(/\s+/g).length
        return Math.ceil(wordCount / wordsPerMinute)
      },
    },
    structuredData: {
      type: 'json',
      resolve: (doc) => ({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: doc.title,
        datePublished: doc.publishedAt,
        dateModified: doc.publishedAt,
        description: doc.summary,
        image: doc.image ? `${baseUrl}${doc.image}` : `${baseUrl}/og.png`,
        url: `${baseUrl}/blog/${doc._raw.flattenedPath}`,
        author: {
          '@type': 'Person',
          name: 'Ossama Chaib',
        },
      }),
    },
  },
}))

export default makeSource({
  contentDirPath: 'app/blog/posts',
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [remarkGfm],
  },
})