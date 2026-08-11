import { fileURLToPath } from "node:url";

import node from "@astrojs/node";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

const site = "https://getfriction.dev";

export default defineConfig({
  site,
  session: false,
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
  integrations: [
    react(),
    sitemap({
      customPages: [`${site}/`],
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  },
});
