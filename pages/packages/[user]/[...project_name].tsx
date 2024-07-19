/*===============================================================================*/
/*                Show Library "/packages/[user]/[...project_name]"              */
/*===============================================================================*/

/*
 | Author:
 | Rohan Vashisht
 |
 | Details:
 | This page is used to display the details of a single library.
 | Please check license file for copyright details.
 */

// ===================
//       Imports
// ===================

// ----------- Types -----------
import Repo from '@/types/custom_types';

// --------- Functions ---------
import { marked } from 'marked';
import DOMPurify from 'isomorphic-dompurify';

// -------- Components ---------
import Image from 'next/image';
import { GoIssueOpened } from 'react-icons/go';
import { FaCodeFork, FaEye, FaStar } from 'react-icons/fa6';
import { Button, Card, Tooltip, Badge } from 'flowbite-react';
import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';
import { BsInfoSquareFill } from 'react-icons/bs';
import { Clipboard } from "flowbite-react"
import { numberAsLetters } from '@/backend/helper_functions';

// =========================================================================
//       Exports show library page "/packages/[user]/[project_name]"
// =========================================================================
export default function Manage({ compressedRepo }: { compressedRepo: Repo }) {
  return (
    <>
      {compressedRepo.contentIsCorrect ? (
        <>
          <div className='flex justify-center items-center'>
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
          <div className="flex mx-5 items-center justify-center font-mono">
            <div className="dark:bg-[#151d28] bg-slate-600 pr-7 py-3 pl-4 rounded w-fit flex items-center justify-center mb-4">
              <div style={{ userSelect: "all" }}>
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

// ==================================
//       Get Server Side Props
// ==================================
import data from "@/database/main.json";
import data_game from "@/database/games.json";
import data_web from "@/database/web.json";
import data_gui from "@/database/gui.json";

const repositories = [...data, ...data_game, ...data_gui, ...data_web];

export async function getServerSideProps({ params: { user, project_name } }: { params: { user: string; project_name: string; } }) {
  const repoPath = `${user}/${project_name}`;
  const repository = repositories.find(repo => repo.full_name === repoPath);

  if (!repository) {
    return { props: { compressed_repo: { contentIsCorrect: false } as Repo } };
  }

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

  const [readmeContent, tagsResponse] = await Promise.all([
    fetchReadmeContent(repository),
    fetch(repository.tags_url)
  ]);

  const tagDetails = tagsResponse.ok ? await tagsResponse.json() : [];
  const latestTag = tagDetails[0]?.name;
  const specials = latestTag
    ? `https://github.com/${repository.full_name}/archive/refs/tags/${latestTag}.tar.gz`
    : `git+https://github.com/${repository.full_name}`;

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
    avatar_url: repository.avatar_url
  };

  return { props: { compressedRepo } };
}

