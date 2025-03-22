import programsMain from "../../../database/jsons/programs.json";
// import codebergMain from "../../../../../database/jsons/codebergPrograms.json";
// import gitlabMain from "../../../../../database/jsons/gitlabPrograms.json";

const mainDatabase = programsMain;

export async function onRequest(context) {
  const parsedUrl = new URL(context.request.url);
  const user_name = parsedUrl.searchParams.get("user_name")?.trim();
  const reponame = parsedUrl.searchParams.get("reponame")?.trim();

  if (!user_name || !reponame) {
    return new Response(JSON.stringify(null), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const fullName = `${user_name.toLowerCase()}/${reponame.toLowerCase()}`;

  const searchResults = mainDatabase.filter(
    (item) => item.full_name.toLowerCase() === fullName
  );

  return new Response(JSON.stringify(searchResults[0] || null), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
