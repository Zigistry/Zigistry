import fs from "node:fs";

async function main() {
  const content = await fetch("https://github.com/Zigistry/database/releases/download/database/database.json");
  const content_as_json = await content.json();
  fs.writeFile("./src/database.json", JSON.stringify(content_as_json), (e) => {
    if (e) {
      console.error("Massive problem");
    } else {
      console.log("Ok!");
    }
  });
}


await main();
