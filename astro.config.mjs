// @ts-check
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import { defineConfig } from "astro/config";
import remarkLinkCard from "remark-link-card-plus";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), icon()],
  // 日本語が基準(URL に接頭辞なし)。英語ページは src/pages/en/ に置くと /en/... になる
  i18n: {
    locales: ["ja", "en"],
    defaultLocale: "ja",
    routing: { prefixDefaultLocale: false },
  },
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
});
