import { defineConfig } from "vite";
import marko from "@marko/run/vite";
import staticAdapter from "@marko/run-adapter-static";
import packagesData from "./database/main.json";
import programsData from "./database/programs.json";
import path from "path";

function generatePaths() {
  const paths = [
    ...packagesData.map((pkg) => `/packages/${pkg.full_name}`),
    ...programsData.map((program) => `/programs/${program.full_name}`),
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
    }),
  ],
});
