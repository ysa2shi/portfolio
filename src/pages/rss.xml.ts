import rss from "@astrojs/rss"
import { getCollection } from "astro:content"
import { siteConfig } from "../config/site"

interface PostData {
  [key: string]: any
}

interface Post {
  data: PostData
  slug: string
}

interface RSSContext {
  site: string
}

export async function GET() {
  const posts: Post[] = await getCollection("posts")
  return rss({
    title: siteConfig.name,
    description: siteConfig.description,
    site: siteConfig.url,
    items: posts.map((post) => ({
      ...post.data,
      link: `/blog/${post.slug}/`,
    })),
  })
}
