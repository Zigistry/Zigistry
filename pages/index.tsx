import { TextInput } from "flowbite-react";
import { useRouter } from 'next/router';
import Recommendations from "../components/show_recommendations";
import Repo from "@/types/custom_types";
import recommendation_backend from "./api/recommendations_generator";

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

export { recommendation_backend as getServerSideProps };