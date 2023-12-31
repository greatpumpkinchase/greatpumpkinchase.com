import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import alpinejs from "@astrojs/alpinejs";

import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
  site: "https://greatpumpkinchase.com",
  integrations: [tailwind({
    config: {
      applyBaseStyles: false
    }
  }), sitemap(), alpinejs(), vue()]
});