import databaseMain from "../../../../database/main.json";

export async function GET({ url }) {
  const parsedUrl = new URL(url);
  const pageNumberParam = parsedUrl.searchParams.get("pageNumber");

  // Ensure pageNumber is provided and is a valid number
  const pageNumber = parseInt(pageNumberParam || "0", 10);

  if (isNaN(pageNumber) || pageNumber < 0) {
    return new Response(JSON.stringify({ error: "Invalid page number" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  // Calculate the slice indices
  const lowerLimit = pageNumber * 10;

  // Slice the array to get the results
  const scrollResults = databaseMain.slice(lowerLimit, lowerLimit + 10);

  return new Response(JSON.stringify(scrollResults), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
