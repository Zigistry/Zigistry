/*===============================================================================*/
/*                           Custom Card component                               */
/*===============================================================================*/

/*
 | Author:
 | Rohan Vashisht
 |
 | Details:
 | This is the export for custom card component, it is
 | mostly based off of the flowbite-react Card component.
 | Please check license file for copyright details.
 */

// ===================
//       Imports
// ===================

// ---------- Types -----------
import type Repo from "@/types/custom_types";

// -------- Components ---------
import { Badge, Button, Card, Tooltip } from "flowbite-react";
import Image from "next/image";
import { FaStar, FaEye } from "react-icons/fa";
import { FaCodeFork } from "react-icons/fa6";
import { BsInfoSquareFill } from "react-icons/bs";
import { GoIssueOpened } from "react-icons/go";
import Link from "next/link";


// =====================================================
//       Exports function (Component) Custom Card
// =====================================================
export default function CustomCard(props: { item: Repo }) {
  return (
    <Card className="w-72 my-2 hover:scale-110 transition-transform transform-cpu">
      <Image width="50" height="50" className="w-10 rounded-full" src={props.item.avatar_url} alt={props.item.name} />
      <h5 className="text-2xl font-bold text-gray-900 dark:text-white">
        {props.item.name}
      </h5>
      <p className="text-gray-400">{props.item.full_name} <Badge color={"darkblue"}  className="w-fit bg-slate-600 mt-4">{props.item.license}</Badge></p>
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
        &nbsp;&nbsp;&nbsp;&nbsp;
        <BsInfoSquareFill color="darkorange" />
        <Tooltip content={props.item.topics?.join(", ")}>
          &nbsp;{props.item.topics?.length}
        </Tooltip>
      </div>
      <Button as={Link} href={"packages/" + props.item.full_name} color="light" pill>
        View package
      </Button>
    </Card>
  )
}
