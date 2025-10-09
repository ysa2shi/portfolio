// @ts-check
import tailwind from "@astrojs/tailwind"
import icon from "astro-icon"
import { defineConfig } from "astro/config"
import remarkLinkCard from "remark-link-card-plus"

// https://astro.build/config
export default defineConfig({
  site:
    process.env.PUBLIC_SITE_URL ||
    process.env.CF_PAGES_URL ||
    "https://localhost:4321",
  integrations: [tailwind(), icon()],
  markdown: {
    remarkPlugins: [
      [
        remarkLinkCard,
        {
          cache: true,
          shortenUrl: true,
          thumbnailPosition: "right",
          lazyLoading: true,
          imageLoading: "lazy",
          imagePriority: false,
        },
      ],
    ],
  },
})
