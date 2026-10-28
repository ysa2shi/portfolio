/**
 * 複数の場所で使う文言の辞書。日本語(ja)が基準で、ほかの言語は ja のキーに合わせて書く。
 * 1つのコンポーネントでしか使わない文言は、そのファイルのフロントマターに localized() で書く(utils.ts)。
 *
 * - 見出し・ナビ・ボタンなど、英語のほうが見た目として自然なものは ja でも英語のままにしている
 * - en は未対応のキーがあってもよい(足りない分は ja で表示される)
 * - 英語ページを足すときは src/pages/en/ 以下にページを作るだけでよい(言語切替・hreflang も自動で対応する)。
 *   各コンポーネントは Astro.currentLocale から言語を判定する(astro.config.mjs の i18n)
 */
export const languages = {
  ja: "日本語",
  en: "English",
} as const;

export type Lang = keyof typeof languages;
export const defaultLang: Lang = "ja";

const ja = {
  "site.description": "作ったものと、学んだことの記録。",

  "nav.openMenu": "メニューを開く",
  "nav.closeMenu": "メニューを閉じる",

  "lang.switch": "言語の切り替え",
  "common.sep": "、",

  "theme.toDark": "ダークモードに切り替える",
  "theme.toLight": "ライトモードに切り替える",

  "page.home.title": "Home",
  "page.blog.title": "Blog",
  "page.blog.description": "開発で調べたことや、個人開発の記録を書いています。",
  "page.articles.title": "Articles",
  "page.articles.description": "Zenn に投稿した技術記事です。",
  "page.talks.title": "Talks",
  "page.talks.description": "LTや勉強会で発表したスライドです。",
  "talks.empty": "登壇資料は準備中です。",

  "error.backHome": "Back to Home",
  "error.404.title": "Not Found",
  "error.500.title": "Server Error",
  "error.offline.title": "Offline",

  "rss.title": "RSSフィード",
} as const;

export type UIKey = keyof typeof ja;

const en: Partial<Record<UIKey, string>> = {
  "site.description": "Sharing what I've built and learned along the way.",

  "nav.openMenu": "Open menu",
  "nav.closeMenu": "Close menu",

  "lang.switch": "Language",
  "common.sep": ", ",

  "theme.toDark": "Switch to dark mode",
  "theme.toLight": "Switch to light mode",

  "page.blog.description": "I run a small, personal blog.",
  "page.articles.description":
    "An overview of my recent thoughts and developments within the technology field.",
  "page.talks.description": "Slides from my lightning talks and meetups.",
  "talks.empty": "Talk slides are coming soon.",

  "rss.title": "RSS Feed",
};

export const ui: Record<Lang, Partial<Record<UIKey, string>>> = { ja, en };
export const baseUI: Record<UIKey, string> = ja;
