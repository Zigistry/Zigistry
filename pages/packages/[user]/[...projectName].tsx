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
import { GoIssueOpened } from 'react-icons/go';
import { FaCodeFork, FaEye, FaStar } from 'react-icons/fa6';
import { Button, Card, Tooltip, Badge } from 'flowbite-react';
import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';
import { BsInfoSquareFill } from 'react-icons/bs';
import { Clipboard } from "flowbite-react"
import { highlight_bash_code, numberAsLetters } from '@/backend/helperFunctions';
import Script from 'next/script';
import { highlight_zig_code } from '@/backend/helperFunctions';

// =========================================================================
//       Exports show library page "/packages/[user]/[projectName]"
// =========================================================================
export default function Manage({ compressedRepo }: { compressedRepo: Repo }) {
  function highlight() {
    const ZigCodeContainers:any = document.getElementsByClassName('language-zig');
    for (let pre of ZigCodeContainers) {
      const codeContent = pre.innerHTML;
      const highlightedContent = highlight_zig_code(codeContent);
      pre.innerHTML = highlightedContent;
    }
    const ZonCodeContainers:any = document.getElementsByClassName('language-zon');
    for (let pre of ZonCodeContainers) {
      const codeContent = pre.innerHTML;
      const highlightedContent = highlight_zig_code(codeContent);
      pre.innerHTML = highlightedContent;
    }
    const BashCodeContainers:any = document.getElementsByClassName('language-shell');
    for (let pre of BashCodeContainers) {
      const codeContent = pre.innerHTML;
      const highlightedContent = highlight_bash_code(codeContent);
      pre.innerHTML = highlightedContent;
    }
    const ShCodeContainers:any = document.getElementsByClassName('language-sh');
    for (let pre of ShCodeContainers) {
      const codeContent = pre.innerHTML;
      const highlightedContent = highlight_bash_code(codeContent);
      pre.innerHTML = highlightedContent;
    }
  };
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
                <Badge color={""} className="w-fit dark:bg-slate-600 bg-white dark:border-none border-slate-200 border mt-4">{compressedRepo.license}</Badge>
              </p>
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
          <div className="flex mx-5 items-center justify-center font-mono">
            <div className="dark:bg-[#151d28] bg-slate-600 pr-7 py-3 pl-4 rounded w-fit max-w-full flex items-center justify-center mb-4 mx-2">
              <div className='sm:overflow-x-hidden text-sm sm:text-base overflow-x-scroll' style={{ userSelect: "all" }}>
                <span style={{ color: "gold" }}>zig</span>&nbsp;<span style={{ color: "skyblue" }}>fetch</span>&nbsp;<span style={{ color: "lightgray" }}>--save</span>&nbsp;<span style={{ color: "lightgreen" }}>{compressedRepo.specials}</span>
              </div>
              <Clipboard className='ml-3' valueToCopy={"zig fetch --save " + compressedRepo.specials} label="Copy" />
            </div>
          </div>
          <div className='flex items-center justify-center mb-4'>
            <div className="dark:bg-slate-800 bg-white border-2 border-slate-600 sm:w-3/5 w-4/5 rounded-2xl py-10 sm:px-20 px-10">
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

// ==================================
//       Get Server Side Props
// ==================================
export async function getServerSideProps({ params: { user, projectName } }: { params: { user: string; projectName: string; } }) {
  // ------------ Get user's paths ----------------
  const repoPath = `${user}/${projectName}`;

  // ------------ Find the repo ---------------
  const repository: Repo | undefined = repositories.find(repo => repo.full_name === repoPath);

  if (!repository) {
    return { props: { compressedRepo: { contentIsCorrect: false } as Repo } };
  }

  // ------------ Get the correct readme.md ---------------
  const fetchReadmeContent = async (repo: Repo) => {
    const defaultBranch = repo.default_branch || 'master';
    const readmeUrls = [
      `https://raw.githubusercontent.com/${repo.full_name}/${defaultBranch}/README.md`,
      `https://raw.githubusercontent.com/${repo.full_name}/${defaultBranch}/readme.md`
    ];

    for (let url of readmeUrls) {
      const response = await fetch(url);
      if (response.ok) return response.text();
    }

    return "404";
  };

  // ----------- Fetch the readme and tags --------------
  const [readmeContent, tagsResponse] = await Promise.all([
    fetchReadmeContent(repository),
    fetch(repository.tags_url)
  ]);

  // ----------- Get the tag details -------------
  const tagDetails = tagsResponse.ok ? await tagsResponse.json() : [];
  const latestTag = tagDetails[0]?.name;
  const specials = latestTag
    ? `https://github.com/${repository.full_name}/archive/refs/tags/${latestTag}.tar.gz`
    : `git+https://github.com/${repository.full_name}`;
  // ------------ Generate the compressed repository -----------------
  const compressedRepo: Repo = {
    contentIsCorrect: true,
    name: repository.name,
    full_name: repository.full_name,
    readme_content: await marked(readmeContent),
    created_at: repository.created_at,
    description: repository.description,
    tags_url: repository.tags_url,
    open_issues: repository.open_issues,
    specials,
    license: repository.license,
    stargazers_count: repository.stargazers_count,
    forks_count: repository.forks_count,
    watchers_count: repository.watchers_count,
    topics: repository.topics,
    avatar_url: repository.avatar_url,
    size: repository.size,
    updated_at: repository.updated_at,
  };

  return { props: { compressedRepo } };
}

