import programsMain from "../../../database/programs.json";
import codebergMain from "../../../database/codebergPrograms.json";

const databaseMain = [...programsMain, ...codebergMain];

export async function GET({ url }: { url: string }) {
  const parsedUrl = new URL(url);
  const section = parsedUrl.searchParams.get("section");
  const [ll, ul] = (parsedUrl.searchParams.get("range") || "")
    .split("..")
    .map(Number);

  if (!section || isNaN(ll) || isNaN(ul)) {
    return new Response(JSON.stringify([]), { status: 400, headers: { "Content-Type": "application/json" } });
  }

  const getSortedResponse = (sortFn: (a: any, b: any) => number) =>
    new Response(
      JSON.stringify([...databaseMain].sort(sortFn).slice(ll, ul)),
      { status: 200, headers: { "Content-Type": "application/json" } },
    );

  if (section === "mostUsed") {
    return getSortedResponse((a, b) => b.stargazers_count - a.stargazers_count);
  }

  if (section === "latestRepos") {
    return getSortedResponse(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    );
  }

  return new Response(JSON.stringify([]), { status: 400, headers: { "Content-Type": "application/json" } });
}
