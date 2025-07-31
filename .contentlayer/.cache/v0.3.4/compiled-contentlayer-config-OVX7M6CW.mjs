// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer/source-files";
var baseUrl = "https://ossa-ma.github.io";
var Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    publishedAt: { type: "date", required: true },
    summary: { type: "string" },
    image: { type: "string" }
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath
    },
    structuredData: {
      type: "json",
      resolve: (doc) => ({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: doc.title,
        datePublished: doc.publishedAt,
        dateModified: doc.publishedAt,
        description: doc.summary,
        image: doc.image ? `${baseUrl}${doc.image}` : `${baseUrl}/og.png`,
        url: `${baseUrl}/blog/${doc._raw.flattenedPath}`,
        author: {
          "@type": "Person",
          name: "Ossama Chaib"
        }
      })
    }
  }
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "app/blog/posts",
  documentTypes: [Post]
});
export {
  Post,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-OVX7M6CW.mjs.map
