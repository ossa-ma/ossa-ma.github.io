import { allPosts } from 'contentlayer/generated'
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const posts = allPosts.map((post) => ({
        url: `https://ossa-ma.github.io/blog/${post.slug}`,
        lastModified: post.publishedAt,
    }))

    const routes = ['', '/blog'].map((route) => ({
        url: `https://ossa-ma.github.io${route}`,
        lastModified: new Date().toISOString().split('T')[0],
    }))

    return [...routes, ...posts]
}
