import { defineConfig } from "vite";
import marko from "@marko/run/vite";
import staticAdapter from "@marko/run-adapter-static";
import packages_data from "@database/main.json";
import programs_data from "@database/programs.json";
import type { Repo } from "@types";

function arrayOfPaths() {
  let my_array: string[] = [];
  packages_data.forEach((element: Repo) => {
    my_array.push("/packages/" + element.full_name);
  });
  programs_data.forEach((element: Repo) => {
    my_array.push("/programs/" + element.full_name);
  });
  return my_array;
}

export default defineConfig({
  plugins: [
    marko({
      adapter: staticAdapter({
        urls: () => arrayOfPaths(),
      }),
    }),
  ],
});
