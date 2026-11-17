const env = import.meta.env;

export const siteConfig = {
  name: env.PUBLIC_SITE_NAME,
  url: env.PUBLIC_SITE_URL || "http://localhost:4321",
  links: {
    github: env.PUBLIC_GITHUB_USER_URL || "https://github.com",
    x: env.PUBLIC_X_USER_URL || "https://x.com",
    // PUBLIC_ZENN_USER__URL は以前の誤った名前。設定済みの環境が動き続けるように残している
    zenn:
      env.PUBLIC_ZENN_USER_URL ||
      env.PUBLIC_ZENN_USER__URL ||
      "https://zenn.dev",
    // 未設定なら Talks は空になる(ユーザー名は環境変数でだけ渡す)
    speakerdeck: env.PUBLIC_SPEAKERDECK_USER_URL || "",
  },
};

/**
 * canonical や RSS に使うサイトの URL。
 * PUBLIC_SITE_URL が未設定・不正(http(s):// がないなど)のときは、表示中のオリジンを使う
 */
export function resolveSiteUrl(fallbackOrigin: string): string {
  return /^https?:\/\//.test(siteConfig.url) ? siteConfig.url : fallbackOrigin;
}
