import { marked } from 'marked';
import Image from 'next/image';
import Repo from '@/types/custom_types';

export default function Manage({ compressed_repo }: { compressed_repo: Repo }) {
  return (
    <>
      {compressed_repo.contentIsCorrect ? (
        <>
          <div className="w-full flex items-center justify-center mt-9">
            <Image height={20} width={20} className="w-20 rounded-full mr-2 border-2" src={compressed_repo.owner.avatar_url} alt="" />
            <h1 className="text-center font-bold text-7xl">{compressed_repo.name[0].toUpperCase() + compressed_repo.name.slice(1)}</h1>
          </div>
          <div className="flex mx-5 items-center justify-center mt-8 font-mono">
            <div
              dangerouslySetInnerHTML={{
                __html: compressed_repo.specials || "Loading..."
              }}
              className="bg-slate-800 p-2 rounded w-fit flex items-center justify-center"
            ></div>
          </div>
          <iframe src={`https://render.githubusercontent.com/view/${compressed_repo.full_name}/main/README.md`}></iframe>
          <div className="bg-slate-900 sm:mx-40 mx-10 rounded-2xl p-20" dangerouslySetInnerHTML={{ __html: compressed_repo.readme_content || "" }}></div>
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
    const readmeResponse = await fetch(`https://raw.githubusercontent.com/${repository.full_name}/${repository.default_branch}/README.md`);
    const readmeContent = readmeResponse.ok ? await readmeResponse.text() : '404';
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
