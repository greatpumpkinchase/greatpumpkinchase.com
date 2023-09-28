import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import alpinejs from "@astrojs/alpinejs";

// https://astro.build/config
export default defineConfig({
    site: "https://greatpumpkinchase.com",
    integrations: [tailwind({
        config: {
            applyBaseStyles: false
        }
    }), sitemap(), alpinejs()],
    redirects: {
        '/register': {
            status: 302,
            destination: 'https://greatpumpkinchase.ticketbud.com/gpc'
        },
        '/volunteer/register': {
            status: 302,
            destination: 'https://docs.google.com/spreadsheets/d/1nCgrv27HLnYFlpsd1Qx9ZD0LcB86OyztRiAsmxept9w'
        }
    }
});
