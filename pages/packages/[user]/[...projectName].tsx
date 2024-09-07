//!===============================================================
//!       Show Library "/packages/[user]/[...projectName]"
//!===============================================================
//!	Author  : Rohan Vashisht
//! License : Please check license file
//! Details : This page is used to display the details of a
//! single library.
//!===============================================================

// ===================
//       Imports
// ===================

// ----------- Types -----------
import Repo from '@/types/customTypes';
import { marked } from 'marked';

// --------- Functions ---------
import DOMPurify from 'isomorphic-dompurify';

// --------- Database ---------
import data from "@/database/main.json";
import data_game from "@/database/games.json";
import data_web from "@/database/web.json";
import data_gui from "@/database/gui.json";

// -------- Components ---------
import Image from 'next/image';
import { FaCheck } from "react-icons/fa";
import { GoIssueOpened } from 'react-icons/go';
import { FaCodeFork, FaEye, FaStar } from 'react-icons/fa6';
import { Button, Card, Tooltip, Badge } from 'flowbite-react';
import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';
import { BsInfoSquareFill } from 'react-icons/bs';
import { Clipboard } from "flowbite-react"
import { highlight, numberAsLetters, zon2json } from '@/backend/helperFunctions';

// =========================================================================
//       Exports show library page "/packages/[user]/[projectName]"
// =========================================================================
export default function Manage({ compressedRepo }: { compressedRepo: Repo }) {
  return (
    <>
      {compressedRepo.contentIsCorrect ? (
        <>
          <div className='flex justify-center items-center' onLoad={highlight}>
            <Card className="w-72 my-5 transition-transform transform-cpu">
              <Image width="50" height="50" className="w-10 rounded-full" src={compressedRepo.avatar_url} alt={compressedRepo.name} />
              <h5 className="text-2xl font-bold text-gray-900 dark:text-white">
                {compressedRepo.name}
              </h5>
              <p className="text-gray-400">{compressedRepo.full_name}
              </p>
              <div className="flex space-x-3">
                {compressedRepo.archived ? <Badge color={"light"} className="w-fit dark:bg-yellow-400 bg-white dark:border-none border-slate-200 border mt-1">Archived</Badge> : <></>}
                <Badge color={"darkblue"} className="w-fit dark:bg-slate-600 bg-white dark:border-none border-slate-200 border mt-1">{compressedRepo.license}</Badge>
              </div>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                {compressedRepo.description}
              </p>
              <div className="flex items-center">
                <FaStar size={20} color="#cfbc0e" className="mr-2" />
                {numberAsLetters(compressedRepo.stargazers_count)}
                <FaEye className="ml-2 mr-1" color="skyblue" />
                {numberAsLetters(compressedRepo.watchers_count)}
                <FaCodeFork className="ml-2 mr-1" color="lightpink" />
                {numberAsLetters(compressedRepo.forks_count)}
                <GoIssueOpened className="ml-2 mr-1" color="lightgreen" />
                {numberAsLetters(compressedRepo.open_issues)}
                <BsInfoSquareFill className="ml-2 mr-1" color="darkorange" />
                <Tooltip className="ml-2 mr-1" content={compressedRepo.topics?.join(", ")}>
                  {compressedRepo.topics?.length}
                </Tooltip>
              </div>
              <div className="flex">
                {compressedRepo.has_build_zig_zon ? <span className="bg-indigo-100 text-indigo-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-indigo-900 dark:text-indigo-300 flex justify-center items-center space-x-3 w-min">build.zig.zon&nbsp;<FaCheck size={12} /></span> : ""}
                {compressedRepo.has_build_zig ? <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300 flex justify-center items-center space-x-3 w-min">build.zig&nbsp;<FaCheck size={12} /></span> : ""}
                {compressedRepo.fork ? <span className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-900 dark:text-gray-300 flex justify-center items-center space-x-3 w-min">fork&nbsp;<FaCheck size={12} /></span> : ""}
              </div>
              <Button as={Link} target='_blank' rel="noreferrer" href={"https://github.com/" + compressedRepo.full_name} color="light" pill>
                View on Github &nbsp;<FaGithub size={20} />
              </Button>
            </Card>
          </div>
          <div className='flex flex-wrap gap-2 mb-4 justify-center'>
            <Badge color="info">Updated: {new Date(compressedRepo.updated_at).toLocaleTimeString() + " " + new Date(compressedRepo.updated_at).toDateString()}</Badge>
            <Badge color="warning">Size: {compressedRepo.size}KB</Badge>
            <Badge color="purple">Created: {new Date(compressedRepo.created_at).toLocaleTimeString() + " " + new Date(compressedRepo.created_at).toDateString()}</Badge>
          </div>
          <div className='w-full mb-4 flex justify-center items-center'>
            <Badge className='w-fit' color="blue">Dependencies:</Badge>
          </div>
          <div className='w-full flex justify-center items-center'>
            <div className='w-3/5 flex flex-wrap gap-2 mb-4 justify-center'>
              {compressedRepo.dependencies ? (
                compressedRepo.dependencies.map((element, index) => (
                  <Badge key={index} color="dark">{element}</Badge>
                ))
              ) : (
                <Badge color="dark">No known dependencies</Badge>
              )}
            </div>
          </div>
          <div className="flex mx-5 items-center justify-center font-mono">
            <div className="dark:bg-[#151d28] bg-slate-600 pr-7 py-3 pl-4 rounded w-fit max-w-full flex items-center justify-center mb-4 mx-2">
              <div className='sm:overflow-x-hidden text-sm sm:text-base overflow-x-scroll' style={{ userSelect: "all" }}>
                <span style={{ color: "gold" }}>zig</span>&nbsp;<span style={{ color: "skyblue" }}>fetch</span>&nbsp;<span style={{ color: "lightgray" }}>--save</span>&nbsp;<span style={{ color: "lightgreen" }}>{compressedRepo.specials}</span>
              </div>
              <Clipboard className='ml-3' valueToCopy={"zig fetch --save " + compressedRepo.specials} label="Copy" />
            </div>
          </div>
          <div className='flex items-center justify-center m-4'>
            <div className="dark:bg-slate-800 bg-white border-2 border-slate-600 sm:w-3/5 w-full rounded-2xl py-10 sm:px-20 px-4">
              <div className="readmeDiv" dangerouslySetInnerHTML={{ __html: compressedRepo.readme_content ? DOMPurify.sanitize(compressedRepo.readme_content) : "" }}>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>404</>
      )}
    </>
  );
}

// ---------- Concatenate the database into a single list -------------
const repositories: Repo[] = [...data, ...data_game, ...data_gui, ...data_web];

export async function getStaticPaths() {
  const paths = repositories.map((repo) => {
    const [user, ...projectNameParts] = repo.full_name.split('/');
    return {
      params: { user, projectName: projectNameParts },
    };
  });

  return {
    paths,
    fallback: 'blocking',
  };
}


// ==================================
//       Get Server Side Props
// ==================================
export async function getStaticProps({ params: { user, projectName } }: { params: { user: string; projectName: string[]; } }) {
  const repoPath = `${user}/${projectName.join('/')}`;
  const repository: Repo | undefined = repositories.find(repo => repo.full_name === repoPath);

  if (!repository) {
    return { props: { compressedRepo: { contentIsCorrect: false } as Repo } };
  }

  const fetchReadmeContent = async (repo: Repo) => {
    const extensions = ["", "txt", "md"] as const;
    const defaultBranch = repo.default_branch || 'master';
    const readmeCasing = ["readme", "README"];

    for (let ext of extensions) {
      for (let readmeCase of readmeCasing) {
        const url = `https://raw.githubusercontent.com/${repo.full_name}/${defaultBranch}/${readmeCase}${ext && `.${ext}`}`;
        let response = await fetch(url, { method: "HEAD" });

        if (response.ok) {
          response = await fetch(url);
          return { content: await response.text(), ext: ext };
        }
      }
    }

    return { content: "404", ext: "" };
  };

  const [readmeContent, tagsResponse] = await Promise.all([
    fetchReadmeContent(repository),
    fetch(repository.tags_url)
  ]);

  const tagDetails = tagsResponse.ok ? await tagsResponse.json() : [];
  const latestTag = tagDetails[0]?.name;
  const specials = latestTag
    ? `https://github.com/${repository.full_name}/archive/refs/tags/${latestTag}.tar.gz`
    : `git+https://github.com/${repository.full_name}`;

  var dependencies: string[] = [];
  if (repository.has_build_zig_zon == 1) {
    const url = `https://raw.githubusercontent.com/${repository.full_name}/${repository.default_branch || "master"}/build.zig.zon`;
    const res = await fetch(url);
    var zonData = await res.text();
    var zonAsJsonData = zon2json(zonData);

    try {
      const json_parsed = await JSON.parse(zonAsJsonData);
      const results = Object.keys(json_parsed.dependencies);
      for (let key of results) {
        dependencies.push(key);
      }
    } catch { }
  }
  if (dependencies.length === 0) {
    dependencies = ["No dependencies were found"];
  }
  async function convert2markdown(x:string) : Promise<string> {
    var content = await marked(x);
    content = content.replaceAll("[!IMPORTANT]", `<span class="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">IMPORTANT</span>`);
    content = content.replaceAll("[!NOTE]", `<span class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">NOTE</span>`);
    content = content.replaceAll("[!WARNING]", `<span class="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300">WARNING</span>`);
    content = content.replaceAll("[!CAUTION]", `<span class="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">CAUTION</span>`);
    return content;
  }

  const compressedRepo: Repo = {
    contentIsCorrect: true,
    name: repository.name,
    full_name: repository.full_name,
    readme_content: readmeContent.ext === "md" ? await convert2markdown(readmeContent.content) : `<pre style="padding: 0 !important; border: 0 !important;">${readmeContent.content}</pre>`,
    created_at: repository.created_at,
    description: repository.description,
    tags_url: repository.tags_url,
    open_issues: repository.open_issues,
    specials,
    archived: repository.archived ? true : false,
    license: repository.license,
    stargazers_count: repository.stargazers_count,
    forks_count: repository.forks_count,
    watchers_count: repository.watchers_count,
    topics: repository.topics,
    avatar_url: repository.avatar_url,
    dependencies: dependencies,
    size: repository.size,
    fork: repository.fork,
    has_build_zig: repository.has_build_zig,
    has_build_zig_zon: repository.has_build_zig_zon,
    updated_at: repository.updated_at,
  };

  return { props: { compressedRepo } };
}
