// @ts-check
import { defineConfig } from "astro/config";
import { loadEnv } from "vite";

import { storyblok } from "@storyblok/astro";
import basicSsl from "@vitejs/plugin-basic-ssl";
import tailwindcss from "@tailwindcss/vite";
import netlify from "@astrojs/netlify";
import node from "@astrojs/node";
import sitemap from "@astrojs/sitemap";

const env = loadEnv("", process.cwd(), ["STORYBLOK", "NETLIFY"]);

const isPreview = env.STORYBLOK_PREVIEW === "true";

const adapter =
    env.NETLIFY === "true"
        ? netlify({ imageCDN: false })
        : node({ mode: "standalone" });

// https://astro.build/config
export default defineConfig({
    output: isPreview ? "server" : "static",
    site: "https://www.icibandit.com/",
    integrations: [
        storyblok({
            accessToken: env.STORYBLOK_TOKEN,
            livePreview: isPreview,
            bridge: isPreview
                ? {
                      resolveRelations: [],
                  }
                : false,
            components: {},
        }),
        sitemap(),
    ],
    vite: {
        plugins: [basicSsl(), tailwindcss()],
        server: {
            https: true,
        },
    },
    adapter: isPreview ? adapter : undefined,
});
