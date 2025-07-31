import { defineDocumentType, makeSource } from 'contentlayer/source-files'

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
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath,
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
}) 