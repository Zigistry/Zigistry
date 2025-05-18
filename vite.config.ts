import { defineConfig, Plugin } from "vite";
import marko from "@marko/run/vite";
import staticAdapter from "@marko/run-adapter-static";
import packagesData from "./database/database/packages.json";
import programsData from "./database/database/programs.json";
import path from "path";
import fs from "fs";

const SITE_URL = "https://zigistry.dev";

const staticPaths = [
  "/",
  "/API-docs",
  "/about",
  "/advancedSearch",
  "/apps",
  "/apps/Zon-2-json",
  "/help",
  "/programs",
  "/statistics",
];

const generatedPaths = (() => {
  const paths = [
    ...packagesData.map((pkg: { repo_from: string; full_name: string }) => {
      if (pkg.repo_from === "github") {
        return `/packages/github/${pkg.full_name}`;
      } else if (pkg.repo_from === "gitlab") {
        return `/packages/gitlab/${pkg.full_name}`;
      } else {
        return `/packages/codeberg/${pkg.full_name}`;
      }
    }),
    ...programsData.map((program: { repo_from: string; full_name: string }) => {
      if (program.repo_from === "github") {
        return `/programs/github/${program.full_name}`;
      } else if (program.repo_from === "gitlab") {
        return `/programs/gitlab/${program.full_name}`;
      } else {
        return `/programs/codeberg/${program.full_name}`;
      }
    }),
    ...staticPaths
  ];
  return paths;
})();

const createSiteMap = () => {
  const urls = generatedPaths
    .slice()
    .sort((a, b) => (a === "/" ? -1 : b === "/" ? 1 : 0))
    .map((route) => {
      const priority = route === "/" ? "1.0" : "0.5";
      return `  <url>\n    <loc>${SITE_URL}${route}</loc>\n    <priority>${priority}</priority>\n  </url>`;
    });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>`;

  const outputDir = path.resolve(__dirname, "public");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  fs.writeFileSync(path.join(outputDir, "sitemap.xml"), sitemap.trim());
};


export default defineConfig({
  resolve: {
    alias: {
      "@functions": path.resolve(__dirname, "./src/libs/functions_important"),
      "@types": path.resolve(__dirname, "./src/libs/types_important"),
    },
  },
  plugins: [
    marko({
      adapter: staticAdapter({
        urls: generatedPaths,
      }),
    }) as Plugin[],

    {
      name: "generate-sitemap",
      apply: "build",
      closeBundle: createSiteMap,
    } as Plugin,
  ],
});