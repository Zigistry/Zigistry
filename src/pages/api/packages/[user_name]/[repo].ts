import mainDatabase from "../../../../../database/main.json";

export async function GET({
  params,
}: {
  params: { username: string; reponame: string };
}) {
  const { username, reponame } = params;

  // Validate that username and reponame are provided and are strings
  if (!username || !reponame) {
    return new Response(JSON.stringify(null), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const fullName = `${username.toLowerCase()}/${reponame.toLowerCase()}`;

  // Search for the repository in the main database
  const searchResults = mainDatabase.filter(
    (item) => item.full_name.toLowerCase() === fullName,
  );

  return new Response(JSON.stringify(searchResults[0] || null), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
