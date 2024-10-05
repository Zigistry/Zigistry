//!===============================================================
//!                     Custom Card component
//!===============================================================
//!	Author  : Rohan Vashisht
//! License : Please check license file
//! Details : This is the export for custom card component, it is
//! mostly based off of the flowbite-react Card component. Used
//! by "/" and "/programs".
//!===============================================================

// ===================
//       Imports
// ===================

// ---------- Types ------------
import type { Repo } from "../types/customTypes";
import { SiCodeberg } from "react-icons/si";
import { FaCheck } from "react-icons/fa";

// -------- Functions ----------

// -------- Components ---------
import { Badge, Button, Card, Tooltip } from "flowbite-react";
import { FaStar, FaEye } from "react-icons/fa";
import { FaCodeFork } from "react-icons/fa6";
import { BsInfoSquareFill } from "react-icons/bs";
import { GoIssueOpened } from "react-icons/go";

// =====================================================
//       Exports function (Component) Custom Card
// =====================================================
export default function CustomCard(props: { item: Repo; program: boolean }) {
  function numberAsLetters(i: number): string {
    const numberAsString = i.toString();
    if (numberAsString.length > 3)
      return (i / 1000).toString().slice(0, 3) + "K";
    else return numberAsString;
  }
  return (
    <Card className="z-0 my-2 w-72 transform-cpu transition-transform hover:z-10 hover:scale-110">
      <img
        width="50"
        height="50"
        className="w-10 rounded-full"
        src={props.item.avatar_url}
        alt={props.item.name}
      />
      <a
        href={(props.program ? "/programs/" : "/packages/") + props.item.full_name}
        className="text-2xl font-bold text-gray-900 dark:text-white"
      >
        {props.item.name}
      </a>
      <p className="text-gray-400">{props.item.full_name}</p>
      <div className="flex space-x-3">
        {props.item.archived ? (
          <Badge
            color={"light"}
            className="mt-1 w-fit border border-slate-200 bg-white dark:border-none dark:bg-yellow-400"
          >
            Archived
          </Badge>
        ) : (
          <></>
        )}
        <Badge
          color={"darkblue"}
          className="mt-1 w-fit border border-slate-200 bg-white dark:border-none dark:bg-slate-600"
        >
          {props.item.license}
        </Badge>
      </div>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {props.item.description.length > 200
          ? props.item.description.slice(0, 200) + "..."
          : props.item.description}
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
        {props.item.has_build_zig_zon ? (
          <span className="me-2 flex w-min items-center justify-center space-x-3 rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300">
            build.zig.zon&nbsp;
            <FaCheck size={12} />
          </span>
        ) : (
          ""
        )}
        {props.item.has_build_zig ? (
          <span className="me-2 flex w-min items-center justify-center space-x-3 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300">
            build.zig&nbsp;
            <FaCheck size={12} />
          </span>
        ) : (
          ""
        )}
        {props.item.berg ? (
          <span className="me-2 flex w-min items-center justify-center space-x-3 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-900 dark:text-gray-300">
            <SiCodeberg size={12} />
          </span>
        ) : (
          ""
        )}
        {props.item.fork ? (
          <span className="me-2 flex w-min items-center justify-center space-x-3 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-900 dark:text-gray-300">
            fork&nbsp;
            <FaCheck size={12} />
          </span>
        ) : (
          ""
        )}
      </div>
      <Button
        href={(props.program ? "/programs/" : "/packages/") + props.item.full_name}
        color="light"
        pill
      >
        View programs
      </Button>
    </Card>
  );
}
