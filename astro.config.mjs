import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import alpinejs from "@astrojs/alpinejs";
import netlify from '@astrojs/netlify';

import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
    site: "https://greatpumpkinchase.com",
    output: 'server',
    adapter: netlify(),
    vite: {
        plugins: [tailwindcss()],
        server: {
            allowedHosts: ["gpc-website.exe.xyz"]
        }
    },
    integrations: [
        sitemap(),
        alpinejs(),
        vue()
    ]
});
