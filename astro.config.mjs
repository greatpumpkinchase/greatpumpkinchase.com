import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import alpinejs from "@astrojs/alpinejs";
import cloudflare from '@astrojs/cloudflare';

import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
    site: "https://greatpumpkinchase.com",
    output: 'static',
    adapter: cloudflare({
        // Pre-optimize images at build time (Wasm compiler) and serve them as
        // static files. No runtime image processing endpoint is needed, so
        // images cannot fail at runtime on Cloudflare Pages.
        imageService: {
            build: 'compile',
            runtime: 'passthrough',
        },
    }),
    // No session storage used; prevents auto-provisioning a KV namespace.
    session: false,
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
