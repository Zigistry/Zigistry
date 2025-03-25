import db from "../../database/jsonsForAPICompressed/programs.json";

export async function onRequest(context) {
  const { searchParams } = new URL(context.request.url);
  const q = searchParams.get("q")?.trim()?.toLowerCase();
  const filter = searchParams.get("filter")?.trim()?.toLowerCase();

  const matches = db.filter(({ full_name, description, topics }) => {
    if (filter && !topics?.some((t) => t.toLowerCase() === filter)) return false;
    if (!q) return true;
    return [full_name, description, ...(topics || [])].some(
      (field) => field?.toLowerCase().includes(q)
    );
  });

  return new Response(JSON.stringify(matches.slice(0, 25)), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
