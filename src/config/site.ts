const siteName = import.meta.env.PUBLIC_SITE_NAME
const siteUrl = import.meta.env.PUBLIC_SITE_URL
const githubUrl = import.meta.env.PUBLIC_GITHUB_USER_URL || "https://github.com"
const xUrl = import.meta.env.PUBLIC_X_USER_URL || "https://x.com"
const zennUrl = import.meta.env.PUBLIC_ZENN_USER__URL || "https://zenn.dev"

export const siteConfig = {
  name: siteName,
  description: "Sharing what I've built and learned along the way.",
  url: siteUrl,
  links: {
    github: githubUrl,
    x: xUrl,
    zenn: zennUrl,
  },
}
