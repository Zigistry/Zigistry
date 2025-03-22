import mainDatabase from "../../database/jsons/main.json";

function searchRepositories(inputString) {
  const results = [];
  const tokens = inputString.toLowerCase().split(" ");
  for (const token of tokens) {
    for (const entry of mainDatabase) {
      if (entry["readme_content"].toLowerCase().includes(token)) {
        results.push(repoFullName.toLowerCase()); // Normalize to lowercase
      }
      if (results.length > 25) break;
    }
  }

  return results;
}

// Search Engine Algorithm API for "/api/searchPackages"
export async function onRequest(context) {
  const parsedUrl = new URL(context.request.url);
  const q = parsedUrl.searchParams.get("q");
  const filter = parsedUrl.searchParams.get("filter");

  if (!q || typeof q !== "string") {
    const searchResults = mainDatabase.filter((item) => {
      if (typeof filter === "string") {
        return item.topics?.some(
          (topic) => topic.toLowerCase() === filter.toLowerCase(),
        );
      }
      return true;
    });

    return new Response(JSON.stringify(searchResults), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const query = q.toLowerCase();
  const matchingRepos = new Set(searchRepositories(query));

  // Separate search results into three categories
  const fullNameMatches = [];
  const descriptionMatches = [];
  const deepSearchMatches = [];

  mainDatabase.forEach((item) => {
    const fullName = item.full_name?.toLowerCase();
    const description = item.description?.toLowerCase();

    if (fullName && fullName.includes(query)) {
      fullNameMatches.push(item);
    } else if (description && description.includes(query)) {
      descriptionMatches.push(item);
    } else if (fullName && matchingRepos.has(fullName)) {
      deepSearchMatches.push(item);
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
  const filteredDeepSearchMatches = applyFilter(deepSearchMatches);

  // Combine results in prioritized order
  const searchResults = [
    ...filteredFullNameMatches,
    ...filteredDescriptionMatches,
    ...filteredDeepSearchMatches,
  ];

  return new Response(JSON.stringify(searchResults), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
