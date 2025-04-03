import db from "../../../../database/jsonsForAPICompressed/packages.json";

export const GET = async ({ url }) => {
  const q = new URL(url).searchParams.get("q")?.trim()?.toLowerCase();
  const filter = new URL(url).searchParams.get("filter")?.trim()?.toLowerCase();

  const matches = db.filter(({ name, full_name, description, topics }) => {
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
};
