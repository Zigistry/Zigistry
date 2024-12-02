import databaseMain from "../../../database/main.json";

export async function GET({ url }: { url: string }) {
  const parsedUrl = new URL(url);
  const section = parsedUrl.searchParams.get("section");
  const [lowerLimit, upperLimit] = (parsedUrl.searchParams.get("range") || "")
    .split("..")
    .map(Number);

  if (!section || isNaN(lowerLimit) || isNaN(upperLimit)) {
    return new Response(null, {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const getResponse = (data: any[]) =>
    new Response(JSON.stringify(data.slice(lowerLimit, upperLimit)), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  if (section === "mostUsed") {
    return getResponse(databaseMain);
  }

  if (section === "latestRepos") {
    return getResponse(
      [...databaseMain].sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      ),
    );
  }

  return new Response(null, {
    status: 400,
    headers: { "Content-Type": "application/json" },
  });
}
