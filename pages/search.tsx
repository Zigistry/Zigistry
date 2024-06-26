import { TextInput } from "flowbite-react";
import { useState } from "react";
import Repo from "@/types/custom_types";
import Recommendations from "./components/show_recommendations";
import recommendation_backend from "./api/recommendations_generator";
import CustomCard from "./components/CustomCard";

export default function Home({ most_used, top10LatestRepos }: { most_used: Repo[], top10LatestRepos: Repo[] }) {
  const [data, setData] = useState(top10LatestRepos);
  const [showDefault, setShowDefault] = useState(true);
  const [inputValue, setInputValue] = useState("");

  const fetchData = async () => {
    const response = await fetch("/api/search?q=" + inputValue);
    const result: Repo[] = await response.json();
    setData(result);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      fetchData();
      setShowDefault(false);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <h1 className="text-center font-semibold text-2xl my-5">Search Ziglang Packages</h1>
        <TextInput
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search libraries"
          className="w-72 mb-5"
          autoFocus
        />
      </div>
      {showDefault ? (
        <Recommendations most_used={most_used} top10LatestRepos={top10LatestRepos} />
      ) : (
        <section className="w-full flex flex-wrap justify-evenly">
          {data.length ? (
            data.map((item, index) => (
              <CustomCard key={index} item={item} />
            ))
          ) : (
            <h1>Can&apos;t find what you are looking for</h1>
          )}
        </section>
      )}
    </>
  );
}

export { recommendation_backend as getServerSideProps };
