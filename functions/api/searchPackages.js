import mainDatabase from "../../database/jsonsForAPICompressed/main.json";

export async function onRequest(context) {
  const { searchParams } = new URL(context.request.url);
  const q = searchParams.get("q")?.trim()?.toLowerCase();
  const filter = searchParams.get("filter")?.trim()?.toLowerCase();

  const matches = mainDatabase.filter(({ name, full_name, description, topics }) => {
    if (filter && !topics?.some((t) => t.toLowerCase() === filter)) return false;
    if (!q) return true;
    return [name, full_name, description, ...(topics || [])].some(
      (field) => field?.toLowerCase().includes(q)
    );
  });

  return new Response(JSON.stringify(matches.slice(0, 25)), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
