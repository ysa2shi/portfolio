/**
 * 画面の文言の辞書。日本語(ja)が基準で、ほかの言語は ja のキーに合わせて書く。
 *
 * - 見出し・ナビ・ボタンなど、英語のほうが見た目として自然なものは ja でも英語のままにしている
 * - en は未対応のキーがあってもよい(足りない分は ja で表示される)
 * - 英語ページを足すときは src/pages/en/ 以下にページを作るだけでよい。
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

  "nav.home": "Home",
  "nav.blog": "Blog",
  "nav.articles": "Articles",
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

  "hero.lead": "シンプルで信頼できる Web サービスをつくっています。",
  "hero.blog": "View Blog",
  "hero.articles": "Read Articles",

  "about.title": "About Me",
  "about.avatarAlt": "プロフィール写真",
  "about.body":
    "Web アプリケーション開発を主に担当しているバックエンドエンジニアです。Java × Spring Boot と AWS を使った決済機能の開発・運用に携わってきました。最近は個人開発で Web サービスづくりにも取り組んでいます。読みやすく、きちんと動くコードを書くことを大切にしながら、学んだことは個人開発や技術ブログで発信しています。",
  "about.github": "GitHub",
  "about.contact": "Contact",

  "timeline.title": "Timeline",
  "timeline.202604.title": "AI 開発を勉強中",
  "timeline.202504.title": "フロントエンドの勉強を始める",
  "timeline.202504.description":
    "学んだことを試す場として、このサイトを作りました。",
  "timeline.202404.title": "決済機能の開発・運用を担当",
  "timeline.202404.description":
    "AWS 上で動く Java × Spring Boot のアプリケーションを開発しています。",
  "timeline.202304.title": "新卒で現職に入社",
  "timeline.202304.description": "Web アプリケーションの開発に配属。",
  "timeline.202303.title": "大学院 修士課程修了(工学専攻)",
  "timeline.202303.description": "深層学習を使った音声合成を研究していました。",

  "skills.title": "Skills",
  "skills.viewToggle": "表示の切り替え",
  "skills.viewMap": "Map",
  "skills.viewList": "List",
  "skills.mapLabel": "スキルの関係図",
  "skills.replay": "アニメーションをもう一度再生",
  "skills.tier1": "主戦力",
  "skills.tier2": "実務で使用",
  "skills.tier3": "個人開発でよく使う",
  "skills.tier4": "試している",
  "skills.related": "関連",

  "posts.title": "Personal Blog",
  "posts.viewAll": "View All Posts",
  "posts.thumbnailAlt": "{title} のサムネイル",

  "articles.title": "Latest Articles",
  "articles.viewAll": "View All Articles",

  "footer.title": "Let's Work Together",
  "footer.lead": "お仕事のご相談など、Xでお気軽にご連絡ください。",

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

  "hero.lead": "Building simple and reliable web services.",
  "hero.blog": "View Blog",
  "hero.articles": "Read Articles",

  "about.avatarAlt": "Profile",
  "about.body":
    "Hi, I am a backend engineer specializing in web application development. I have experience developing and operating payment features using Java × Spring Boot and AWS. Recently, I have been working on personal projects and building web services. I strive to write clear and functional code and continuously improve my skills. Additionally, I share what I learn through personal projects and technical blogs.",
  "about.github": "GitHub Profile",
  "about.contact": "Get in Touch",

  "timeline.202604.title": "Currently learning AI development",
  "timeline.202504.title": "Currently learning frontend development",
  "timeline.202504.description":
    "Created this portfolio site as a project to apply what I've learned.",
  "timeline.202404.title": "Developing and operating payment features",
  "timeline.202404.description":
    "Working on Java × Spring Boot applications running on AWS.",
  "timeline.202304.title": "Joined current company as a new graduate engineer",
  "timeline.202304.description": "Mainly working as a web developer.",
  "timeline.202303.title": "Master of Engineering (M.Eng.)",
  "timeline.202303.description":
    "Researched speech synthesis with deep learning.",

  "skills.viewToggle": "Switch view",
  "skills.viewMap": "Map",
  "skills.viewList": "List",
  "skills.mapLabel": "Skill map",
  "skills.replay": "Replay animation",
  "skills.tier1": "Core",
  "skills.tier2": "Used at work",
  "skills.tier3": "Side projects",
  "skills.tier4": "Exploring",
  "skills.related": "Related",

  "posts.viewAll": "View All Posts",
  "posts.thumbnailAlt": "Thumbnail for {title}",

  "articles.viewAll": "View All Articles",

  "footer.lead": "Got a project in mind? Feel free to reach out on X.",

  "rss.title": "RSS Feed",
};

export const ui: Record<Lang, Partial<Record<UIKey, string>>> = { ja, en };
export const baseUI: Record<UIKey, string> = ja;
