import { defineCollection, z } from "astro:content"

const posts = defineCollection({
  type: "content",
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
})

export const collections = {
  posts: posts,
}
