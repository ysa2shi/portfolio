import Parser from "rss-parser";
import { siteConfig } from "@/config/site";

export interface Talk {
  title: string;
  /** Speaker Deck のスライド URL */
  url: string;
  /** 登壇日(YYYY-MM-DD)。説明文に「登壇日: YYYY-MM-DD」があればそれ、なければ公開日 */
  date: string;
  /** イベント名(説明文の1行目) */
  event?: string;
  /** 説明文のうち、イベント名・URL・登壇日の行を除いた残り */
  description?: string;
  thumbnail?: string;
}

type TalkItem = { media?: { $?: { url?: string } } };

let cache: Talk[] | null = null;

/**
 * 説明文の書き方(Speaker Deck 側で書く):
 *   1行目: イベント名
 *   登壇日: 2026-10-22   ← 省略すると公開日になる
 *   そのほかの行は概要として表示する(URL だけの行は除く)
 */
function parseDescription(text: string, pubDate: string) {
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  let date = new Date(pubDate).toISOString().slice(0, 10);
  const rest: string[] = [];
  for (const line of lines) {
    const m = line.match(
      /^登壇日\s*[:：]\s*(\d{4})[-/年](\d{1,2})[-/月](\d{1,2})/,
    );
    if (m) {
      date = `${m[1]}-${m[2].padStart(2, "0")}-${m[3].padStart(2, "0")}`;
    } else if (!/^https?:\/\/\S+$/.test(line)) {
      rest.push(line);
    }
  }

  const [event, ...description] = rest;
  return {
    date,
    event,
    description: description.join("\n") || undefined,
  };
}

export async function fetchTalks(): Promise<Talk[]> {
  if (cache) return cache;

  try {
    const parser = new Parser<object, TalkItem>({
      customFields: { item: [["media:content", "media"]] },
    });
    const feed = await parser.parseURL(`${siteConfig.links.speakerdeck}.rss`);

    const talks = feed.items
      .map((item) => ({
        title: item.title ?? "",
        url: item.link ?? "",
        // RSS の画像は 640px 幅の preview。大きく表示するので 1920px 版にする
        thumbnail: item.media?.$?.url?.replace("/preview_slide_0", "/slide_0"),
        ...parseDescription(item.contentSnippet ?? "", item.pubDate ?? ""),
      }))
      .sort((a, b) => b.date.localeCompare(a.date));

    cache = talks;
    return talks;
  } catch (error) {
    console.error("Speaker Deck RSS取得失敗:", error);
    return [];
  }
}
