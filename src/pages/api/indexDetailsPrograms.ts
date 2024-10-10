import databaseMain from "../../../database/main.json";

export async function GET({ url }: { url: string }) {
  const parsedUrl = new URL(url);
  const section = parsedUrl.searchParams.get("section");
  const range = parsedUrl.searchParams.get("range");

  // Validate that both section and range are provided and are strings
  if (!section || !range) {
    return new Response(JSON.stringify([]), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const ranger = range.split("..");
  const ll = parseInt(ranger[0]);
  const ul = parseInt(ranger[1]);

  if (isNaN(ll) || isNaN(ul)) {
    return new Response(JSON.stringify([]), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  // Handle "mostUsed" section
  if (section === "mostUsed") {
    const sortedByStars = databaseMain
      .slice()
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(ll, ul);

    return new Response(JSON.stringify(sortedByStars), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  // Handle "latestRepos" section
  if (section === "latestRepos") {
    const sortedByDate = databaseMain
      .slice()
      .sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      )
      .slice(ll, ul);

    return new Response(JSON.stringify(sortedByDate), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  // If the section is unrecognized, return an empty array
  return new Response(JSON.stringify([]), {
    status: 400,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
