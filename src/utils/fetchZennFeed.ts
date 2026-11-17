import Parser from "rss-parser";
import { siteConfig } from "@/config/site";
import { handleFeedError } from "@/utils/feedError";
import { httpUrl } from "@/utils/url";

export interface ZennArticle {
  title: string;
  description: string;
  link: string;
  pubDate: string;
  /** Zenn が記事ごとに生成する OGP 画像(RSS の enclosure) */
  thumbnail?: string;
}

let cache: ZennArticle[] | null = null;

export async function fetchZennArticles(): Promise<ZennArticle[]> {
  if (cache) return cache;

  try {
    const parser = new Parser();
    const feed = await parser.parseURL(`${siteConfig.links.zenn}/feed?all=1`);

    const articles = feed.items.flatMap((item) => {
      const link = httpUrl(item.link);
      // リンク先や日付が読めない項目は載せない
      if (!link || Number.isNaN(Date.parse(item.pubDate ?? ""))) return [];
      return {
        title: item.title ?? "",
        description: item.contentSnippet ?? "",
        link,
        pubDate: item.pubDate ?? "",
        thumbnail: httpUrl(item.enclosure?.url),
      };
    });

    cache = articles;
    return articles;
  } catch (error) {
    return handleFeedError("Zenn", error);
  }
}
