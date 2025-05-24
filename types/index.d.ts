export type pageItem = {
  title: string
  href: string
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
