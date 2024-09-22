import mainDatabase from "../../../../../database/programs.json";

export async function GET({ params }: { params: { username: string; repoName: string } }) {
  const { username, repoName } = params;

  // Validate that username and repoName are provided and are strings
  if (!username || !repoName) {
    return new Response(JSON.stringify(null), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const fullName = `${username.toLowerCase()}/${repoName.toLowerCase()}`;

  // Search for the repository in the main database
  const searchResults = mainDatabase.filter((item) => item.full_name.toLowerCase() === fullName);

  return new Response(JSON.stringify(searchResults[0] || null), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
