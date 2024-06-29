import { marked } from 'marked';
import Image from 'next/image';
import Repo from '@/types/custom_types';
import DOMPurify from 'isomorphic-dompurify';
import { ALL } from 'dns';
import CustomCard from '@/components/CustomCard';
import { GoIssueOpened } from 'react-icons/go';
import { FaCodeFork, FaEye, FaStar } from 'react-icons/fa6';
import { Button, Card } from 'flowbite-react';
import Link from 'next/link';
import { FaGithub } from 'react-icons/fa';

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
            <p className="text-gray-400">{compressed_repo.full_name}</p>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              {compressed_repo.description}
            </p>
            <div className="flex items-center">
              <FaStar size={20} color="#cfbc0e" />
              &nbsp;{compressed_repo.stargazers_count}
              &nbsp;&nbsp;&nbsp;&nbsp;
              <FaEye color="skyblue" />
              &nbsp;{compressed_repo.watchers_count}
              &nbsp;&nbsp;&nbsp;&nbsp;
              <FaCodeFork color="lightpink" />
              &nbsp;{compressed_repo.forks_count}
              &nbsp;&nbsp;&nbsp;&nbsp;
              <GoIssueOpened color="lightgreen" />
              &nbsp;{compressed_repo.open_issues}
            </div>
            <Button as={Link} href={"https://github.com/" + compressed_repo.full_name} color="dark" pill>
              View on Github &nbsp;<FaGithub size={20}/>
            </Button>
          </Card>
          </div>
          <div className="flex mx-5 items-center justify-center font-mono">
            <div
              dangerouslySetInnerHTML={{
                __html: compressed_repo.specials ? DOMPurify.sanitize(compressed_repo.specials) : "Loading..."
              }}
              className="bg-[#151d28] p-4 rounded w-fit flex items-center justify-center mb-4"
            ></div>
          </div>
          <div className='flex items-center justify-center mb-4'>
            <div className="bg-slate-800 border-2 border-slate-600 sm:w-3/5 w-4/5 rounded-2xl py-10 sm:px-20 px-10">
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

export async function getServerSideProps({ params: { user, project_name } }: { params: { user: string; project_name: string; } }) {
  const github_url = "https://raw.githubusercontent.com/RohanVashisht1234/zigistry/main/database/main.json";
  const repoPath = `${user}/${project_name}`;
  const response = await fetch(github_url);
  if (!response.ok) throw new Error(`Failed to fetch data: ${response.statusText}`);
  const data: Repo[] = await response.json();

  const repository = data.find(repo => repo.full_name === repoPath);
  if (repository) {
    const masdf = repository.default_branch ? `https://raw.githubusercontent.com/${repository.full_name}/${repository.default_branch}/README.md` : `https://raw.githubusercontent.com/${repository.full_name}/master/README.md`;
    console.log(masdf);
    const readmeResponse = await fetch(masdf);
    const readmeContent = await readmeResponse.text();
    const tagsResponse = await fetch(repository.tags_url);
    const tagDetails = tagsResponse.ok ? await tagsResponse.json() : [];

    const specials = tagDetails[0]
      ? `<span style='color:gold'>zig</span>&nbsp;<span style='color:skyblue'>fetch</span>&nbsp;<span style='color:gray'>--save</span>&nbsp;<span style='color:lightgreen'>${"https://github.com/" + repository.full_name + "/archive/refs/tags/" + tagDetails[0].name + ".tar.gz"}</span>`
      : `<span style='color:gold'>zig</span>&nbsp;<span style='color:skyblue'>fetch</span>&nbsp;<span style='color:gray'>--save</span>&nbsp;<span style='color:lightgreen'>${"git+https://github.com/" + repository.full_name}</span>`;

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
      stargazers_count: repository.stargazers_count,
      forks_count: repository.forks_count,
      watchers_count: repository.watchers_count,
      avatar_url: repository.avatar_url
    };
    return { props: { compressed_repo } };
  } else {
    return { props: { compressed_repo: { contentIsCorrect: false } as Repo } };
  }
}
