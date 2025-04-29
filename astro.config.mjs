import { defineConfig } from 'astro/config';
import sitemap from "@astrojs/sitemap";
import footnote from 'markdown-it-footnote';

// https://astro.build/config
export default defineConfig({
  site: "https://lovergne.dev",
  integrations: [sitemap()],
  markdown: {
    extendMarkdownConfig(md) {
      md.use(footnote);
    },
  },
});
