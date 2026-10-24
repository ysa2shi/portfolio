import type { MarketingConfig } from "@/types";

// 表示名と説明は辞書(src/i18n/ui.ts)のキーで持つ
export const marketingConfig: MarketingConfig = {
  pageInfo: {
    home: {
      title: "page.home.title",
      href: "/",
    },
    blog: {
      title: "page.blog.title",
      href: "/blog",
      description: "page.blog.description",
    },
    articles: {
      title: "page.articles.title",
      href: "/articles",
      description: "page.articles.description",
    },
  },
};
