import programsMain from "../../database/jsons/programs.json";
// import codebergMain from "../../database/codebergPrograms.json";
// import gitlabMain from "../../database/gitlabPrograms.json";

const databaseMain = [...programsMain];

export async function onRequest(context) {
  const parsedUrl = new URL(context.request.url);
  const section = parsedUrl.searchParams.get("section");
  const [ll, ul] = (parsedUrl.searchParams.get("range") || "")
    .split("..")
    .map(Number);

  if (!section || isNaN(ll) || isNaN(ul)) {
    return new Response(JSON.stringify([]), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const getSortedResponse = (sortFn) =>
    new Response(JSON.stringify([...databaseMain].sort(sortFn).slice(ll, ul)), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  if (section === "mostUsed") {
    return getSortedResponse((a, b) => b.stargazers_count - a.stargazers_count);
  }

  if (section === "latestRepos") {
    return getSortedResponse(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    );
  }

  return new Response(JSON.stringify([]), {
    status: 400,
    headers: { "Content-Type": "application/json" },
  });
}
