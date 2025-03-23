import db from "../../../../database/jsonsForAPICompressed/programs.json";
// import berg from "../../../../database/jsons/codebergPrograms.json";
// import lab from "../../../../database/jsons/gitlabPrograms.json";

// Merge both databases
const mainDatabase = [...db];

export async function onRequest(context) {
  const parsedUrl = new URL(context.request.url);
  const q = parsedUrl.searchParams.get("q")?.trim();
  const filter = parsedUrl.searchParams.get("filter")?.trim();

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
  const fullNameMatches = [];
  const descriptionMatches = [];

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
  const applyFilter = (items) => {
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
