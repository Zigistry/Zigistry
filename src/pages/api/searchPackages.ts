import mainDatabase from "../../../database/main.json";
import data from "../../../database/deepSearchData.json";

function searchRepositories(data: any, inputString: any) {
  const results = [];
  const lowerCaseInput = inputString.toLowerCase(); // Case-insensitive search

  for (const [repoFullName, readmeData] of Object.entries(data)) {
    if ((readmeData as string).toLowerCase().includes(lowerCaseInput)) {
      results.push(repoFullName.toLowerCase()); // Normalize to lowercase
    }
    if(results.length > 25) break;
  }

  return results;
}

// Search Engine Algorithm API for "/api/searchPackages"
export async function GET({ url }: { url: string }) {
  const parsedUrl = new URL(url);
  const q = parsedUrl.searchParams.get("q");
  const filter = parsedUrl.searchParams.get("filter");

  if (!q || typeof q !== "string") {
    const searchResults = mainDatabase.filter((item) => {
      if (typeof filter === "string") {
        return item.topics?.some((topic) => topic.toLowerCase() === filter.toLowerCase());
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

  const matchingRepos = new Set(searchRepositories(data, query));


  const searchResults = mainDatabase.filter((item) => {
    const fullName = item.full_name?.toLowerCase();
    const description = item.description?.toLowerCase();

    const matchesQuery =
      (fullName && fullName.includes(query)) ||
      (description && description.includes(query)) ||
      (fullName && matchingRepos.has(fullName)); // Include deep search results

    if (!matchesQuery) {
      return false;
    }

    if (typeof filter === "string") {
      return item.topics?.some((topic) => topic.toLowerCase() === filter.toLowerCase());
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
