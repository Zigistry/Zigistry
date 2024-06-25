import { marked } from 'marked';
import Image from 'next/image';
import Repo from '@/types/custom_types';

export default function Manage(props: { compressed_repo: Repo }) {
  return (
    <>
      {props.compressed_repo.contentIsCorrect ? (
        <>
          <div className="w-full flex items-center justify-center mt-9">
            <Image height={20} width={20} className="w-20 rounded-full mr-2 border-2" src={props.compressed_repo.owner.avatar_url} alt='' />
            <h1 className="text-center font-bold text-7xl">{props.compressed_repo.name[0].toUpperCase() + props.compressed_repo.name.slice(1)}</h1>
          </div>
          <div className="flex mx-5 items-center justify-center mt-8 font-mono">
            <div
              dangerouslySetInnerHTML={{
                __html: props.compressed_repo.specials ? props.compressed_repo.specials : "Loading..."
              }}
              className="bg-slate-800 p-2 rounded w-fit flex items-center justify-center"
            ></div>
          </div>
          <div id="" className="bg-slate-900 sm:mx-40 mx-10 rounded-2xl p-20" dangerouslySetInnerHTML={{ __html: props.compressed_repo.readme_content ? props.compressed_repo.readme_content : "" }}></div>
        </>
      ) : (
        <>404</>
      )}
    </>
  );
}
export async function getServerSideProps(props: { params: { user: string; project_name: string; } }): Promise<{
  props: {
    compressed_repo: Repo;
  };
} | {
  props: null;
}> {
  const { user, project_name } = props.params;
  const github_url: string = "https://raw.githubusercontent.com/RohanVashisht1234/zigistry/main/database/main.json";
  const repoPath: string = `${user}/${project_name}`;
  const data: any = await (await fetch(github_url)).json();
  const repository: Repo = data.items.find((item: { full_name: string; }) => item.full_name === repoPath);
  if (repository && repository.tags_url) {
    const readme = await fetch(`https://raw.githubusercontent.com/${repository.full_name}/${repository.default_branch}/README.md`);
    const tag_details = await (await fetch(repository.tags_url)).json();
    let specials = ""
    if (tag_details[0]){
      specials = `<span style='color:gold'>zig</span>&nbsp;<span style='color:skyblue'>fetch</span>&nbsp;<span style='color:gray'>--save</span>&nbsp;<span style='color:lightgreen'>${"https://github.com/" + repository.full_name + "/archive/refs/tags/" + tag_details[0].name + ".tar.gz"}</span>`;
    } else {
      specials = `<span style='color:gold'>zig</span>&nbsp;<span style='color:skyblue'>fetch</span>&nbsp;<span style='color:gray'>--save</span>&nbsp;<span style='color:lightgreen'>${"git+https://github.com/" + repository.full_name}</span>`;
    }
    const compressed_repo: Repo = {
      contentIsCorrect: true,
      name: repository.name,
      full_name: repository.full_name,
      readme_content: await marked(await readme.text()),
      created_at: repository.created_at,
      description: repository.description,
      open_issues: repository.open_issues,
      specials,
      stargazers_count: repository.stargazers_count,
      forks_count: repository.forks_count,
      tags_url: await (await fetch(repository.tags_url)).json(),
      watchers_count: repository.watchers_count,
      owner: {
        avatar_url: repository.owner.avatar_url
      }
    };
    return { props: { compressed_repo } };
  } else {
    const compressed_repo: Repo = {
      contentIsCorrect: false,
      name: '',
      full_name: '',
      created_at: '',
      description: '',
      open_issues: '',
      stargazers_count: '',
      forks_count: '',
      watchers_count: '',
      owner: {
        avatar_url: ''
      }
    };
    return { props: { compressed_repo } };
  }
}
