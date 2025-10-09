// @ts-check
import tailwind from "@astrojs/tailwind"
import icon from "astro-icon"
import { defineConfig } from "astro/config"
import remarkLinkCard from "remark-link-card-plus"
import { siteConfig } from "./src/config/site"

// https://astro.build/config
export default defineConfig({
  site: siteConfig.url,
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
