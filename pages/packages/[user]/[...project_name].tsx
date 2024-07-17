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
import { number_as_letters } from '@/backend/helper_functions';

// =========================================================================
//       Exports show library page "/packages/[user]/[project_name]"
// =========================================================================
export default function Manage({ compressed_repo }: { compressed_repo: Repo }) {
  return (
    <>
      {compressed_repo.contentIsCorrect ? (
        <>
          <div className='flex justify-center items-center'>
            <Card className="w-72 my-5 transition-transform transform-cpu">
              <Image width="50" height="50" className="w-10 rounded-full" src={compressed_repo.avatar_url} alt={compressed_repo.name} />
              <h5 className="text-2xl font-bold text-gray-900 dark:text-white">
                {compressed_repo.name}
              </h5>
              <p className="text-gray-400">{compressed_repo.full_name}
                <Badge color={""} className="w-fit dark:bg-slate-600 bg-white dark:border-none border-slate-200 border mt-4">{compressed_repo.license}</Badge>
              </p>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                  {compressed_repo.description}
              </p>
              <div className="flex items-center">
                <FaStar size={20} color="#cfbc0e" className="mr-2" />
                    {number_as_letters(compressed_repo.stargazers_count)}
                <FaEye className="ml-2 mr-1" color="skyblue" />
                    {number_as_letters(compressed_repo.watchers_count)}
                <FaCodeFork className="ml-2 mr-1" color="lightpink" />
                	{number_as_letters(compressed_repo.forks_count)}
                <GoIssueOpened className="ml-2 mr-1" color="lightgreen" />
                	{number_as_letters(compressed_repo.open_issues)}
                <BsInfoSquareFill className="ml-2 mr-1" color="darkorange" />
                <Tooltip className="ml-2 mr-1" content={compressed_repo.topics?.join(", ")}>
                    {compressed_repo.topics?.length}
                </Tooltip>
              </div>
              <Button as={Link} target='_blank' rel="noreferrer" href={"https://github.com/" + compressed_repo.full_name} color="light" pill>
                View on Github &nbsp;<FaGithub size={20} />
              </Button>
            </Card>
          </div>
          <div className="flex mx-5 items-center justify-center font-mono">
            <div
              className="dark:bg-[#151d28] bg-slate-600 pr-7 py-3 pl-4 rounded w-fit flex items-center justify-center mb-4"
              
            >
              <div style={{userSelect:"all"}}>
              <span style={{ color: "gold" }}>zig</span>&nbsp;<span style={{ color: "skyblue" }}>fetch</span>&nbsp;<span style={{ color: "lightgray" }}>--save</span>&nbsp;<span style={{ color: "lightgreen" }}>{compressed_repo.specials}</span>
              </div>
              <Clipboard className='ml-3' valueToCopy={"zig fetch --save " + compressed_repo.specials} label="Copy" />
            </div>
          </div>
          <div className='flex items-center justify-center mb-4'>
            <div className="dark:bg-slate-800 bg-white border-2 border-slate-600 sm:w-3/5 w-4/5 rounded-2xl py-10 sm:px-20 px-10">
              <div className="readmeDiv" dangerouslySetInnerHTML={{ __html: compressed_repo.readme_content ? DOMPurify.sanitize(compressed_repo.readme_content) : "" }}>
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
export async function getServerSideProps({ params: { user, project_name } }: { params: { user: string; project_name: string; } }) {
  const repoPath = `${user}/${project_name}`;

  const fetchJsonData = async (url: string) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch data: ${response.statusText}`);
    return response.json();
  };

  const urls = [
    "https://raw.githubusercontent.com/RohanVashisht1234/zigistry/main/database/main.json",
    "https://raw.githubusercontent.com/RohanVashisht1234/zigistry/main/database/games.json",
    "https://raw.githubusercontent.com/RohanVashisht1234/zigistry/main/database/gui.json",
    "https://raw.githubusercontent.com/RohanVashisht1234/zigistry/main/database/web.json"
  ];

  const [data, data_game, data_gui, data_web] = await Promise.all(urls.map(fetchJsonData));

  const repositories = [...data, ...data_game, ...data_gui, ...data_web];
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

  const compressed_repo: Repo = {
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

  return { props: { compressed_repo } };
}

