import Repo from "@/types/custom_types";

export default async function recommendation_backend() {
  const response = await fetch("https://raw.githubusercontent.com/RohanVashisht1234/zigistry/main/database/main.json");
  if (!response.ok) throw new Error(`Error: ${response.statusText}`);
  const items: Repo[] = await response.json();
  const sortedRepos = items.slice().sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  const most_used = items.slice(0, 20);
  const top10LatestRepos = sortedRepos.slice(0, 10);
  return { props: { most_used, top10LatestRepos } };
}
