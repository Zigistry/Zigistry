import databaseMain from "../../../database/programs.json";

export async function GET({ url }: { url: string }) {
  const parsedUrl = new URL(url);
  const pageNumberParam = parsedUrl.searchParams.get('pageNumber');

  // Log the incoming pageNumber
  // console.log("Received pageNumber from query:", pageNumberParam);

  // Ensure pageNumber is provided and is a valid number
  const pageNumber = parseInt(pageNumberParam || '0', 10);

  // Log the parsed page number
  console.log("Parsed page number:", pageNumber);

  if (isNaN(pageNumber) || pageNumber < 0) {
    console.log("Invalid page number:", pageNumber);
    return new Response(JSON.stringify({ error: "Invalid page number" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  // Calculate the slice indices
  const lowerLimit = pageNumber * 10;
  console.log("Lower limit:", lowerLimit);

  // Slice the array to get the results
  const scrollResults = databaseMain.slice(lowerLimit, lowerLimit + 10);

  // Log the results being returned
  console.log("Scroll results:", scrollResults);

  return new Response(JSON.stringify(scrollResults), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
