import { defineConfig } from "astro/config";
import react from "@astrojs/react";

import tailwind from "@astrojs/tailwind";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  output: "server",
  integrations: [react(), tailwind()],
  adapter: cloudflare(),
  server: {
    headers: {
      "Content-Security-Policy": "frame-ancestors 'none'; object-src 'none'; img-src 'self' https://avatars.githubusercontent.com https://raw.githubusercontent.com",
      "X-Frame-Options": "DENY",
    },
  },
});
