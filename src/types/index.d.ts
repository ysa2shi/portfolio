import type { UIKey } from "@/i18n/ui";

export interface pageItem {
  title: UIKey;
  href: string;
  description?: UIKey;
  disabled?: boolean;
}

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    x: string;
    github: string;
  };
}

export interface MarketingConfig {
  pageInfo: {
    [key: string]: pageItem;
  };
}

export interface SimpleIcon {
  title: string;
  slug: string;
  hex: string;
  source: string;
  svg: string;
  path: string;
  guidelines?: string;
  license?: {
    type: string;
    url: string;
  };
}

export interface Post {
  id: string;
  data: {
    title: string;
    description?: string;
    image?: {
      url: string;
      alt: string;
    };
    tags: string[];
    publishDate: Date;
    published: boolean;
  };
}
