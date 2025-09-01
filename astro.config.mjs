import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import alpinejs from "@astrojs/alpinejs";
import netlify from '@astrojs/netlify';

import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
    site: "https://greatpumpkinchase.com",
    output: 'server',
    adapter: netlify(),
    redirects: {
        '/volunteer/register': 'https://wlda547t.nocodb.com/#/nc/form/5f629525-e753-41b9-afa3-c61b8a9d5dd2',
    },
    integrations: [
        tailwind({
            config: {
                applyBaseStyles: false
            }
        }),
        sitemap(),
        alpinejs(),
        vue()
    ]
});
