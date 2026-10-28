const siteName = import.meta.env.PUBLIC_SITE_NAME;
const siteUrl = import.meta.env.PUBLIC_SITE_URL || "https://localhost:4321";
const githubUrl =
  import.meta.env.PUBLIC_GITHUB_USER_URL || "https://github.com";
const xUrl = import.meta.env.PUBLIC_X_USER_URL || "https://x.com";
const zennUrl = import.meta.env.PUBLIC_ZENN_USER__URL || "https://zenn.dev";
// 未設定なら Talks は空になる(ユーザー名は環境変数でだけ渡す)
const speakerDeckUrl = import.meta.env.PUBLIC_SPEAKERDECK_USER_URL || "";

export const siteConfig = {
  name: siteName,
  url: siteUrl,
  links: {
    github: githubUrl,
    x: xUrl,
    zenn: zennUrl,
    speakerdeck: speakerDeckUrl,
  },
};
