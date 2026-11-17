import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import { resolveSiteUrl, siteConfig } from "@/config/site";
import { baseUI } from "@/i18n/ui";
import { getPublishedPosts, postPath } from "@/utils/getCollectionPosts";

// ブログ記事の RSS フィード(BaseLayout の <link rel="alternate"> から参照する)
export const GET: APIRoute = async ({ url }) => {
  const posts = await getPublishedPosts();
  return rss({
    title: siteConfig.name,
    description: baseUI["page.blog.description"],
    site: resolveSiteUrl(url.origin),
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishDate,
      link: postPath(post),
    })),
  });
};
