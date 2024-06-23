// pages/[...slug].js

import { Button } from 'flowbite-react';
import { FaRegClipboard } from "react-icons/fa";
import { marked } from 'marked';

export default function Manage({ repository, readme, tags, contentIsCorrect }) {
  return (
    <>
      {contentIsCorrect && repository ? (
        <>
          <div className="w-full flex items-center justify-center mt-9">
            <img className="w-20 rounded-full mr-2 border-2" src={repository.owner.avatar_url} alt={`${repository.owner.login}'s avatar`} />
            <h1 className="text-center font-bold text-7xl">{repository.name[0].toUpperCase() + repository.name.slice(1)}</h1>
          </div>
          <div className="flex mx-5 items-center justify-center mt-8 font-mono">
            <div
              dangerouslySetInnerHTML={{
                __html: `<span style='color:gold'>zig</span>&nbsp;<span style='color:skyblue'>fetch</span>&nbsp;<span style='color:gray'>--save</span>&nbsp;<span style='color:lightgreen'>${tags?.[0]?.tarball_url ? "https://github.com/" + repository.full_name + "/archive/refs/tags/" + tags[0].name + ".tar.gz" : "This project doesn't have any releases"}</span>&nbsp;<button class="btn btn-dark"><FaRegClipboard /></button>`,
              }}
              className="bg-slate-800 p-2 rounded w-fit flex items-center justify-center"
            ></div>
          </div>
          <div id="" className="bg-slate-900 sm:mx-40 mx-10 rounded-2xl p-20" dangerouslySetInnerHTML={{ __html: readme ? readme : "" }}></div>
        </>
      ) : (
        <>404</>
      )}
    </>
  );
}

export async function getServerSideProps(context) {
  const { params, req } = context;
  const url_on_user_side = params.user + "/" + params.project_name;
  const github_url = "https://raw.githubusercontent.com/RohanVashisht1234/zigistry/main/database/main.json";

  let repository = null;
  let readme = null;
  let tags = null;
  let contentIsCorrect = false;

  try {
    const response = await fetch(github_url);
    if (!response.ok) throw new Error(`Error: ${response.statusText}`);
    const data = await response.json();
    repository = data.items.find((item) => item.full_name === url_on_user_side) || null;
    if (repository) {
      contentIsCorrect = true;
      const tagsResponse = await fetch(repository.tags_url);
      if (!tagsResponse.ok) throw new Error(`Error: ${tagsResponse.statusText}`);
      tags = await tagsResponse.json();

      const readmeContent = await fetch(`https://raw.githubusercontent.com/${repository.full_name}/${repository.default_branch}/README.md`);
      if (readmeContent.ok) {
        const rdata = await readmeContent.text();
        readme = marked(rdata);
      } else {
        readme = "No readme was provided.";
      }
    }
  } catch (error) {
    console.error('Fetch error:', error);
  }

  return {
    props: {
      repository: repository || null,
      readme: readme || null,
      tags: tags || null,
      contentIsCorrect: contentIsCorrect || false,
    },
  };
}
