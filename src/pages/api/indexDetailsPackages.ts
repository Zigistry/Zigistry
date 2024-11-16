import databaseMain from "../../../database/main.json";

export async function GET({ url }: { url: string }) {
  const parsedUrl = new URL(url);
  const section = parsedUrl.searchParams.get("section");
  const range = parsedUrl.searchParams.get("range");

  if (
    !section ||
    typeof section !== "string" ||
    !range ||
    typeof range !== "string"
  ) {
    return new Response(null, {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const ranger = range.split("..");
  const lowerLimit = parseInt(ranger[0]);
  const upperLimit = parseInt(ranger[1]);

  if (section == "mostUsed") {
    return new Response(
      JSON.stringify(databaseMain.slice(lowerLimit, upperLimit)),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } else if (section == "latestRepos") {
    const sortedRepos = databaseMain
      .slice()
      .sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      );
    return new Response(
      JSON.stringify(sortedRepos.slice(lowerLimit, upperLimit)),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }

  return new Response(null, {
    status: 400,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
