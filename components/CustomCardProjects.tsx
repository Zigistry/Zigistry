//!===============================================================
//!                     Custom Card component
//!===============================================================
//!	Author  : Rohan Vashisht
//! License : Please check license file
//! Details : This is the export for custom card component, it is
//! mostly based off of the flowbite-react Card component.
//!===============================================================

// ===================
//       Imports
// ===================

// ---------- Types ------------
import type Repo from "@/types/customTypes";
import { SiCodeberg } from "react-icons/si";
import { FaCheck } from "react-icons/fa";

// -------- Functions ----------
import { numberAsLetters } from "@/backend/helperFunctions";

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
export default function CustomCardProjects(props: { item: Repo }) {
  return (
    <Card className="w-72 my-2 hover:scale-110 hover:z-10 z-0 transition-transform transform-cpu">
      <Image width="50" height="50" className="w-10 rounded-full" src={props.item.avatar_url} alt={props.item.name} />
      <h5 className="text-2xl font-bold text-gray-900 dark:text-white overflow-x-scroll">
        {props.item.name}
      </h5>
      <p className="text-gray-400 overflow-x-scroll">{props.item.full_name}</p>
      <div className="flex space-x-3">
        {props.item.archived ? <Badge color={"light"} className="w-fit dark:bg-yellow-400 bg-white dark:border-none border-slate-200 border mt-1">Archived</Badge> : <></>}
        <Badge color={"darkblue"} className="w-fit dark:bg-slate-600 bg-white dark:border-none border-slate-200 border mt-1">{props.item.license}</Badge>
      </div>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {props.item.description.length > 200 ? props.item.description.slice(0, 200) + "..." : props.item.description}
      </p>
      <div className="flex items-center">
        <FaStar size={20} color="#cfbc0e" className="mr-2" />
        {numberAsLetters(props.item.stargazers_count)}
        <FaEye className="ml-2 mr-1" color="skyblue" />
        {numberAsLetters(props.item.watchers_count)}
        <FaCodeFork className="ml-2 mr-1" color="lightpink" />
        {numberAsLetters(props.item.forks_count)}
        <GoIssueOpened className="ml-2 mr-1" color="lightgreen" />
        {numberAsLetters(props.item.open_issues)}
        <BsInfoSquareFill className="ml-2 mr-1" color="darkorange" />
        <Tooltip className="ml-2 mr-1" content={props.item.topics?.join(", ")}>
          {props.item.topics?.length}
        </Tooltip>
      </div>
      <div className="flex">
        {props.item.has_build_zig_zon ? <span className="bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-indigo-900 dark:text-indigo-300 flex justify-center items-center space-x-3 w-min">build.zig.zon&nbsp;<FaCheck size={12} /></span> : ""}
        {props.item.has_build_zig ? <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300 flex justify-center items-center space-x-3 w-min">build.zig&nbsp;<FaCheck size={12} /></span> : ""}
        {props.item.berg ? <span className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-900 dark:text-gray-300 flex justify-center items-center space-x-3 w-min"><SiCodeberg size={12} /></span> : ""}
        {props.item.fork ? <span className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-900 dark:text-gray-300 flex justify-center items-center space-x-3 w-min">fork&nbsp;<FaCheck size={12} /></span> : ""}
      </div>
      <Button as={Link} href={"programs/" + props.item.full_name} color="light" pill>
        View programs
      </Button>
    </Card >
  )
}
