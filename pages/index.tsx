import { TextInput } from "flowbite-react";
import { useRouter } from 'next/router';
import Recommendations from "./components/show_recommendations";
import Repo from "@/types/custom_types";

export default function Home({ most_used, top10LatestRepos }: { most_used: Repo[], top10LatestRepos: Repo[] }) {
  const router = useRouter();
  const changeRoute = () => router.push("/search");

  return (
    <>
      <div className="flex flex-col items-center">
        <h1 className="text-center font-semibold text-2xl my-5">
          Search Ziglang Packages
        </h1>
        <TextInput onFocus={changeRoute} placeholder="Search libraries" className="w-72 mb-5" />
      </div>
      <Recommendations most_used={most_used} top10LatestRepos={top10LatestRepos} />
    </>
  );
}

export async function getServerSideProps() {
  try {
    const response = await fetch("https://raw.githubusercontent.com/RohanVashisht1234/zigistry/main/database/main.json");
    if (!response.ok) throw new Error(`Error: ${response.statusText}`);

    const { items }: { items: Repo[] } = await response.json();
    const sortedRepos = items.slice().sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    const transformRepo = ({ name, full_name, created_at, description, owner, stargazers_count, watchers_count, forks_count, open_issues }: Repo) => ({
      name, full_name, created_at, description, owner: { avatar_url: owner.avatar_url },
      stargazers_count, watchers_count, forks_count, open_issues
    });

    const most_used = items.slice(0, 20).map(transformRepo);
    const top10LatestRepos = sortedRepos.slice(0, 10).map(transformRepo);

    return { props: { most_used, top10LatestRepos } };
  } catch (error) {
    console.error("Fetch error:", error);
    return { props: { most_used: [], top10LatestRepos: [] } };
  }
}