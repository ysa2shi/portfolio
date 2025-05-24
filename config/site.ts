const siteUrl = import.meta.env.PUBLIC_SITE_URL
const githubUrl = import.meta.env.PUBLIC_GITHUB_USER_URL
const zennUrl = import.meta.env.PUBLIC_ZENN_USER__URL

export const siteConfig = {
  name: "satoshi devlog",
  description: "開発の記録と学びをまとめた、エンジニアのポートフォリオ",
  url: siteUrl,
  links: {
    github: githubUrl,
    zenn: zennUrl,
  },
}
