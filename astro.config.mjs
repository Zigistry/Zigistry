import { defineConfig } from "astro/config";
import react from "@astrojs/react";

import tailwind from "@astrojs/tailwind";

import netlify from "@astrojs/netlify";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  output:'server',
  integrations: [react(), tailwind()],
  adapter: cloudflare(),
});