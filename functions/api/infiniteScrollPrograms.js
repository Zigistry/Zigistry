import programsMain from "../../database/programs.json";
import codebergMain from "../../database/codebergPrograms.json";

const databaseMain = [...programsMain, ...codebergMain];

export async function onRequest(context) {
  const parsedUrl = new URL(context.request.url);
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
