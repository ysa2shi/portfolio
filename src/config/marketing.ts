import type { UIKey } from "@/i18n/ui";

interface PageInfo {
  title: UIKey;
  href: string;
  description: UIKey;
}

// 表示名と説明は辞書(src/i18n/ui.ts)のキーで持つ
export const marketingConfig = {
  pageInfo: {
    home: {
      title: "page.home.title",
      href: "/",
      description: "site.description",
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
} satisfies { pageInfo: Record<string, PageInfo> };
