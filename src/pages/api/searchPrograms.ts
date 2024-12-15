import db from "../../../database/programs.json";
import berg from "../../../database/codebergPrograms.json";
import type { Repo } from "../../typesAndFunctions/customFunctions";

// Merge both databases
const mainDatabase: Repo[] = [...db, ...berg];

export async function GET({ url }: { url: string | URL }) {
  const parsedUrl = new URL(url);
  const q = parsedUrl.searchParams.get("q");
  const filter = parsedUrl.searchParams.get("filter");

  // Check if the query parameter `q` exists and is a string
  if (!q || typeof q !== "string") {
    const searchResults = mainDatabase.filter((item) => {
      if (typeof filter === "string") {
        return item.topics?.some(
          (topic) => topic.toLowerCase() === filter.toLowerCase(),
        );
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

  // Separate search results into two categories
  const fullNameMatches: Repo[] = [];
  const descriptionMatches: Repo[] = [];

  mainDatabase.forEach((item) => {
    const fullName = item.full_name?.toLowerCase();
    const description = item.description?.toLowerCase();

    if (fullName && fullName.includes(query)) {
      fullNameMatches.push(item);
    } else if (description && description.includes(query)) {
      descriptionMatches.push(item);
    }
  });

  // Apply filtering to each category
  const applyFilter = (items: Repo[]) => {
    if (typeof filter === "string") {
      return items.filter((item) =>
        item.topics?.some(
          (topic) => topic.toLowerCase() === filter.toLowerCase(),
        ),
      );
    }
    return items;
  };

  const filteredFullNameMatches = applyFilter(fullNameMatches);
  const filteredDescriptionMatches = applyFilter(descriptionMatches);

  // Combine results in prioritized order
  const searchResults = [
    ...filteredFullNameMatches,
    ...filteredDescriptionMatches,
  ];

  return new Response(JSON.stringify(searchResults), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
