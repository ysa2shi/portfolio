import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const posts = defineCollection({
  loader: glob({ base: "./src/content/posts", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    publishDate: z.date(),
    updateDate: z.date().optional(),
    published: z.boolean().default(false),
    tags: z.array(z.string()).optional(),
    image: z
      .object({
        url: z.string(),
        alt: z.string(),
      })
      .optional(),
  }),
});

export const collections = {
  posts: posts,
};
