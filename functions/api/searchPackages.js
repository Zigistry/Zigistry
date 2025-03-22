import mainDatabase from "../../database/jsons/main.json";

function searchRepositories(inputString) {
  const results = new Set();
  const tokens = inputString.toLowerCase().split(/\s+/);

  for (const entry of mainDatabase) {
    const readmeContent = entry.readme_content?.toLowerCase();
    if (!readmeContent) continue;

    for (const token of tokens) {
      if (readmeContent.includes(token)) {
        results.add(entry.full_name.toLowerCase());
        if (results.size > 25) return Array.from(results);
      }
    }
  }

  return Array.from(results);
}

export async function onRequest(context) {
  const parsedUrl = new URL(context.request.url);
  const q = parsedUrl.searchParams.get("q")?.trim();
  const filter = parsedUrl.searchParams.get("filter")?.trim();

  if (!q) {
    const searchResults = mainDatabase.filter((item) =>
      filter
        ? item.topics?.some((topic) => topic.toLowerCase() === filter.toLowerCase())
        : true
    );

    return new Response(JSON.stringify(searchResults), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  const query = q.toLowerCase();
  const matchingRepos = new Set(searchRepositories(query));

  const fullNameMatches = [];
  const descriptionMatches = [];
  const deepSearchMatches = [];

  for (const item of mainDatabase) {
    const fullName = item.full_name?.toLowerCase();
    const description = item.description?.toLowerCase();

    if (fullName?.includes(query)) {
      fullNameMatches.push(item);
    } else if (description?.includes(query)) {
      descriptionMatches.push(item);
    } else if (matchingRepos.has(fullName)) {
      deepSearchMatches.push(item);
    }
  }

  const applyFilter = (items) =>
    filter
      ? items.filter((item) =>
          item.topics?.some((topic) => topic.toLowerCase() === filter.toLowerCase())
        )
      : items;

  const searchResults = [
    ...applyFilter(fullNameMatches),
    ...applyFilter(descriptionMatches),
    ...applyFilter(deepSearchMatches),
  ];

  return new Response(JSON.stringify(searchResults), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}