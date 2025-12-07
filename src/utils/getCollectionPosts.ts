import { getCollection } from "astro:content";
import type { Post } from "../../types";

export async function getPosts(): Promise<Post[]> {
  return await getCollection("posts");
}

export function sortPosts(posts: Post[]): Post[] {
  return [...posts]
    .filter((post) => post.data.published === true)
    .sort(
      (
        oldPost: { data: { publishDate: Date } },
        latestPost: { data: { publishDate: Date } },
      ) => {
        return (
          latestPost.data.publishDate.valueOf() -
          oldPost.data.publishDate.valueOf()
        );
      },
    );
}
