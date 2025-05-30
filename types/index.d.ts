export type pageItem = {
  title: string
  href: string
  description: string
  disabled?: boolean
}

export type SiteConfig = {
  name: string
  description: string
  url: string
  ogImage: string
  links: {
    x: string
    github: string
  }
}

export type MarketingConfig = {
  pageInfo: {
    [key: string]: pageItem
  }
}

export type SimpleIcon = {
  title: string
  slug: string
  hex: string
  source: string
  svg: string
  path: string
  guidelines?: string
  license?: {
    type: string
    url: string
  }
}