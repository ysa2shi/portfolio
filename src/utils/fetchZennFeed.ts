import Parser from "rss-parser";
import { siteConfig } from "@/config/site";

export interface ZennArticle {
  title: string;
  description: string;
  link: string;
  pubDate: string;
  contentSnippet?: string;
  /** Zenn が記事ごとに生成する OGP 画像(RSS の enclosure) */
  thumbnail?: string;
}

let cache: ZennArticle[] | null = null;

export async function fetchZennArticles(): Promise<ZennArticle[]> {
  if (cache) return cache;

  try {
    const parser = new Parser();
    const feedUrl = `${siteConfig.links.zenn}/feed?all=1`;
    const feed = await parser.parseURL(feedUrl);

    const articles = feed.items.map((item) => ({
      title: item.title ?? "",
      description: item.content ?? "",
      link: item.link ?? "",
      pubDate: item.pubDate ?? "",
      contentSnippet: item.contentSnippet ?? "",
      thumbnail: item.enclosure?.url,
    }));

    cache = articles;
    return articles;
  } catch (error) {
    console.error("RSS取得失敗:", error);
    return [];
  }
}
