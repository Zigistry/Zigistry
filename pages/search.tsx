import { Button, Card, TextInput } from "flowbite-react";
import { useState } from "react";
import Image from "next/image";
import Repo from "@/types/custom_types";
import Recommendations from "./components/show_recommendations";
import { FaStar, FaEye } from "react-icons/fa";
import { FaCodeFork } from "react-icons/fa6";
import { GoIssueOpened } from "react-icons/go";
import Link from "next/link";

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
              <Card key={index} className="w-72 my-2 hover:scale-110 transition-transform transform-cpu">
                <Image width="50" height="50" className="w-10 rounded-full" src={item.owner.avatar_url} alt={item.name}/>
                <h5 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {item.name}
                </h5>
                <p className="text-gray-400">{item.full_name}</p>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  {item.description}
                </p>
                <div className="flex items-center">
                  <FaStar size={20} color="#cfbc0e" />
                  &nbsp;{item.stargazers_count}
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <FaEye color="skyblue" />
                  &nbsp;{item.watchers_count}
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <FaCodeFork color="lightpink" />
                  &nbsp;{item.forks_count}
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <GoIssueOpened color="lightgreen" />
                  &nbsp;{item.open_issues}
                </div>
                <Button as={Link} href={item.full_name} color="dark" pill>
                  View package
                </Button>
              </Card>
            ))
          ) : (
            <h1>Can&apos;t find what you are looking for</h1>
          )}
        </section>
      )}
    </>
  );
}

export async function getServerSideProps() {
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
}