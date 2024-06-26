import { Button, Card } from "flowbite-react";
import Image from "next/image";
import Repo from "@/types/custom_types";
import { FaStar, FaEye } from "react-icons/fa";
import { FaCodeFork } from "react-icons/fa6";
import { GoIssueOpened } from "react-icons/go";
import Link from "next/link";

export default function CustomCard(props: { item: Repo }) {
  return (
    <Card className="w-72 my-2 hover:scale-110 transition-transform transform-cpu">
      <Image width="50" height="50" className="w-10 rounded-full" src={props.item.owner.avatar_url} alt={props.item.name} />
      <h5 className="text-2xl font-bold text-gray-900 dark:text-white">
        {props.item.name}
      </h5>
      <p className="text-gray-400">{props.item.full_name}</p>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {props.item.description}
      </p>
      <div className="flex items-center">
        <FaStar size={20} color="#cfbc0e" />
        &nbsp;{props.item.stargazers_count}
        &nbsp;&nbsp;&nbsp;&nbsp;
        <FaEye color="skyblue" />
        &nbsp;{props.item.watchers_count}
        &nbsp;&nbsp;&nbsp;&nbsp;
        <FaCodeFork color="lightpink" />
        &nbsp;{props.item.forks_count}
        &nbsp;&nbsp;&nbsp;&nbsp;
        <GoIssueOpened color="lightgreen" />
        &nbsp;{props.item.open_issues}
      </div>
      <Button as={Link} href={props.item.full_name} color="dark" pill>
        View package
      </Button>
    </Card>
  )
}
