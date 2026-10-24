import {
  baseUI,
  defaultLang,
  languages,
  ui,
  type Lang,
  type UIKey,
} from "./ui";

/** Astro.currentLocale(未設定なら既定言語)を Lang に丸める */
export function toLang(locale: string | undefined): Lang {
  return locale && locale in languages ? (locale as Lang) : defaultLang;
}

/**
 * 辞書を引く関数を返す。訳がなければ日本語を使う。
 * `{name}` の形の差し込みは params で埋める。
 */
export function useTranslations(lang: Lang) {
  return (key: UIKey, params?: Record<string, string>): string => {
    const text = ui[lang][key] ?? baseUI[key];
    if (!params) return text;
    return text.replace(/\{(\w+)\}/g, (m, name: string) => params[name] ?? m);
  };
}

/** 既定言語はそのまま、それ以外は `/en/blog` のように言語の接頭辞を付ける */
export function localizePath(path: string, lang: Lang): string {
  if (lang === defaultLang) return path;
  return path === "/" ? `/${lang}` : `/${lang}${path}`;
}

/**
 * 英語版があるページ(既定言語側のパス)。src/pages/en/ にページを足したらここにも足す。
 * ブログ記事は日本語だけなので含めない
 */
const translatedPaths = ["/", "/blog", "/articles"];

/** `/en/blog/` → `/blog` のように、言語の接頭辞と末尾のスラッシュを外す */
export function stripLang(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments[0] !== defaultLang && segments[0] in languages) {
    segments.shift();
  }
  return `/${segments.join("/")}`;
}

export function hasTranslation(pathname: string): boolean {
  return translatedPaths.includes(stripLang(pathname));
}

/** 表示中のページを別の言語で開くときのパス。訳がなければその言語のトップへ */
export function switchLangPath(pathname: string, target: Lang): string {
  const path = stripLang(pathname);
  if (target === defaultLang || translatedPaths.includes(path)) {
    return localizePath(path, target);
  }
  return localizePath("/", target);
}

/** 日付を言語に合わせて表示する(日本時間) */
export function formatDate(date: Date | string, lang: Lang): string {
  return new Intl.DateTimeFormat(lang === "ja" ? "ja-JP" : "en-US", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: lang === "ja" ? "long" : "short",
    day: "numeric",
  }).format(new Date(date));
}
