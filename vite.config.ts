import { defineConfig, Plugin } from "vite";
import marko from "@marko/run/vite";
import staticAdapter from "@marko/run-adapter-static";
import pkgdata from "./database/database/packages.json";
import programsData from "./database/database/programs.json";
import games from "./database/database/games.json";
import web from "./database/database/web.json";
import gui from "./database/database/gui.json";
import path from "path";

const packagesData = [...pkgdata, ...games, ...web, ...gui];

function generatePaths() {
  const paths = [
    ...packagesData.map((pkg) => {
      if (pkg.repo_from === "github") {
        return `/packages/github/${pkg.full_name}`
      } else if (pkg.repo_from === "gitlab") {
        return `/packages/gitlab/${pkg.full_name}`
      } else {
        return `/packages/codeberg/${pkg.full_name}`
      }
    }),
    ...programsData.map((program) => {
      if (program.repo_from === "github") {
        return `/programs/github/${program.full_name}`
      } else if (program.repo_from === "gitlab") {
        return `/programs/gitlab/${program.full_name}`
      } else {
        return `/programs/codeberg/${program.full_name}`
      }
    }),
  ];
  return paths;
}

export default defineConfig({
  resolve: {
    alias: {
      "@functions": path.resolve(__dirname, "./src/libs/functions_important"),
      "@types": path.resolve(__dirname, "./src/libs/types_important"),
      "@database": path.resolve(__dirname, "./database/ts_export"),
    },
  },
  plugins: [
    marko({
      adapter: staticAdapter({
        urls: generatePaths,
      }),
    }) as Plugin[],
  ],
});
