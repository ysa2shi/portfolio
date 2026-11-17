import { getCollection, type CollectionEntry } from "astro:content";

export type Post = CollectionEntry<"posts">;

/** 公開済みの記事を新しい順で返す。ブログ記事の取得はここに閉じる */
export async function getPublishedPosts(): Promise<Post[]> {
  const posts = await getCollection("posts", ({ data }) => data.published);
  return posts.sort(
    (a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf(),
  );
}

/** 記事ページのパス。記事は日本語だけなので、言語の接頭辞は付けない */
export function postPath(post: Pick<Post, "id">): string {
  return `/blog/${post.id}`;
}
