import { marked } from "marked";
import sanitizeHtml from "sanitize-html";
import type { Repo } from "@types";

export async function fetchReadmeContent(repo: Repo): Promise<string> {
  const defaultBranch = "master";
  const combinations = ["readme.md", "README.md", "readme.txt", "README.txt"];

  try {
    for (let i = 0; i < combinations.length; i++) {
      const url = `https://raw.githubusercontent.com/${repo.full_name}/${defaultBranch}/${combinations[i]}`;
      const response = await fetch(url);
      if (response.ok) {
        const ext = combinations[i].includes(".")
          ? combinations[i].split(".").pop()!
          : "";
        if (ext == "md") {
          return await convert2markdown(await response.text());
        } else {
          return await response.text();
        }
      }
    }
  } catch (_) { }
  return "404";
}

export function numberAsLetters(i: number): string {
  const numberAsString = i.toString();
  if (numberAsString.length > 3) return (i / 1000).toString().slice(0, 3) + "K";
  else return numberAsString;
}
export function formatNumber(num: number) {
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "m";
  } else if (num >= 1_000) {
    return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "k";
  }
  return num.toString();
}

export async function convert2markdown(x: string): Promise<string> {
  let content = await marked(
    x.replace(/- \[x\]/g, "±§±§±§±").replace(/- \[ \]/g, "±§±§±§§±"),
  );

  content = sanitizeHtml(content, {
    allowedAttributes: {
      a: ["name", "target"],
      code: ["class"],
      img: ["src", "srcset", "alt", "title", "width", "height", "loading"],
    },
  });

  content = content.replace(/±§±§±§§±/g,
    "<br/><input type='checkbox' class='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' disabled></input>"
  );

  content = content.replace(/±§±§±§±/g,
    "<br/><input type='checkbox' class='w-4 h-4 text-green-500 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' checked disabled></input>"
  );

  content = content.replace(/\[!IMPORTANT\]/g,
    `<span class="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">IMPORTANT</span>`
  );

  content = content.replace(/\[!NOTE\]/g,
    `<span class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">NOTE</span>`
  );

  content = content.replace(/\[!WARNING\]/g,
    `<span class="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">WARNING</span>`
  );

  content = content.replace(/\[!CAUTION\]/g,
    `<span class="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">CAUTION</span>`
  );

  return content;
}
