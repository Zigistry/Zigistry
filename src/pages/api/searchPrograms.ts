import db from "../../../database/programs.json";
import berg from "../../../database/codebergPrograms.json";

// Merge both databases
const mainDatabase = [...db, ...berg];

export async function GET({ url }: { url: string }) {
  const parsedUrl = new URL(url);
  const q = parsedUrl.searchParams.get("q");
  const filter = parsedUrl.searchParams.get("filter");

  // Check if the query parameter `q` exists and is a string
  if (!q || typeof q !== "string") {
    const searchResults = mainDatabase.filter((item) => {
      if (typeof filter === "string") {
        return item.topics?.includes(filter.toLowerCase());
      }
      return true; // Return all items if no filter is applied
    });

    return new Response(JSON.stringify(searchResults), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const query = q.toLowerCase();

  // Filter the main database based on the query and optional filters
  const searchResults = mainDatabase.filter((item) => {
    const fullNameMatch =
      item.full_name?.toLowerCase().includes(query) || false;
    const descriptionMatch =
      item.description?.toLowerCase().includes(query) || false;

    // Skip the item if neither the full name nor description matches
    if (!fullNameMatch && !descriptionMatch) {
      return false;
    }

    // Apply the filter if provided
    if (typeof filter === "string") {
      return item.topics?.includes(filter.toLowerCase());
    }

    return true; // If the item matches the query, return it
  });

  return new Response(JSON.stringify(searchResults), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
