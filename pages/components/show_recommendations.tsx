import { Button, Card, TextInput } from "flowbite-react";
import { FaStar, FaEye } from "react-icons/fa";
import { GoIssueOpened } from "react-icons/go";
import { FocusEventHandler, useState } from "react";
import { FaCodeFork } from "react-icons/fa6";
import Image from "next/image";
import { IoMdFastforward } from "react-icons/io";
import Link from "next/link";
import Repo from "@/types/custom_types";
import { useRouter } from 'next/router';


export default function Recommendations(props: {
    most_used: Repo[];
    top10LatestRepos: Repo[];
  }): JSX.Element{
    return(
        <>
          <h1 className="text-left font-semibold text-2xl my-5 ml-10 w-fit border-2 border-slate-400 flex items-center p-4 rounded">
            <IoMdFastforward size={25} />
            &nbsp;Recently released:
          </h1>
          <section className="w-full flex flex-wrap justify-evenly">
            {props.top10LatestRepos ? (
              props.top10LatestRepos.map((item: Repo, index: number) => (
                <Card
                  key={index}
                  className="w-72 my-2 hover:scale-110 transition-transform transform-cpu"
                >
                  <Image
                    width="50"
                    height="50"
                    className="w-10 rounded-full"
                    src={item.owner.avatar_url}
                    alt={item.name}
                  />
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
              <p>Loading...</p>
            )}
          </section>
          <h1 className="text-left font-semibold text-2xl my-5 ml-10 w-fit border-2 border-slate-400 flex items-center p-4 rounded">
            <FaStar size={25} />
            &nbsp;Most used:
          </h1>
          <section className="w-full flex flex-wrap justify-evenly">
            {props.most_used ? (
              props.most_used.map((item: Repo, index: number) => (
                <Card
                  key={index}
                  className="w-72 my-2 hover:scale-110 transition-transform transform-cpu"
                >
                  <Image
                    width="50"
                    height="50"
                    className="w-10 rounded-full"
                    src={item.owner.avatar_url}
                    alt={item.name}
                  />
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
              <p>Loading...</p>
            )}
          </section>
        </>
    )
}

export async function getServerSideProps(): Promise<{
    props: {
      most_used: Repo[];
      top10LatestRepos: Repo[];
    };
  }> {
    try {
      const response = await fetch(
        "https://raw.githubusercontent.com/RohanVashisht1234/zigistry/main/database/main.json",
      );
      if (!response.ok) throw new Error(`Error: ${response.statusText}`);
      const ori = await response.json();
      const items: Repo[] = ori.items;
      const sortedRepos: Repo[] = items
        .slice()
        .sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
        );
  
      const most_used: Repo[] = items
        .slice()
        .slice(0, 20)
        .map(
          ({
            name,
            full_name,
            created_at,
            description,
            owner,
            stargazers_count,
            watchers_count,
            forks_count,
            open_issues,
          }) => ({
            name,
            full_name,
            created_at,
            description,
            owner: { avatar_url: owner.avatar_url },
            stargazers_count,
            watchers_count,
            forks_count,
            open_issues,
          }),
        );
  
      const top10LatestRepos: Repo[] = sortedRepos
        .slice(0, 10)
        .map(
          ({
            name,
            full_name,
            created_at,
            description,
            owner,
            stargazers_count,
            watchers_count,
            forks_count,
            open_issues,
          }) => ({
            name,
            full_name,
            created_at,
            description,
            owner: { avatar_url: owner.avatar_url },
            stargazers_count,
            watchers_count,
            forks_count,
            open_issues,
          }),
        );
  
      return {
        props: {
          most_used,
          top10LatestRepos,
        },
      };
    } catch (error: unknown) {
      console.error("Fetch error:", error);
      return {
        props: {
          most_used: [],
          top10LatestRepos: [],
        },
      };
    }
  }
  