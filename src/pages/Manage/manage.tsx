import { Button } from 'flowbite-react';
import render from 'preact-render-to-string/jsx';
import { useLocation } from 'preact-iso';
import { useEffect, useState } from 'preact/hooks';
import { FaRegClipboard } from "react-icons/fa";
import { marked } from 'marked';
import ReactMarkdown from 'react-markdown'

export function Manage() {
  const { url } = useLocation();
  const url_on_user_side = url.slice(1);
  const [repository, setRepository] = useState(null);
  const [readme, set_readme] = useState(null);
  const [content_is_correct, setContentCorrect] = useState(false);
  const [tags, setTags] = useState(null);
  const github_url = "https://raw.githubusercontent.com/RohanVashisht1234/zigistry/main/database/main.json";

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(github_url);
        if (!response.ok) throw new Error(`Error: ${response.statusText}`);
        const data = await response.json();
        const repo = data.items.find((item) => item.full_name === url_on_user_side);
        if (repo) {
          setContentCorrect(true);
          setRepository(repo);
          const tagsResponse = await fetch(repo.tags_url);
          if (!tagsResponse.ok) throw new Error(`Error: ${tagsResponse.statusText}`);
          const tagsData = await tagsResponse.json();
          setTags(tagsData);
         
          const readme_content = await fetch("https://raw.githubusercontent.com/" + repo.full_name + "/" + repo.default_branch + "/README.md");
          if (tagsResponse.ok) {
            const rdata = await readme_content.text();
            set_readme(await marked(rdata));
           } else {
            set_readme("No readme was provided.")
          }

        }
      } catch (error) {
        console.error('Fetch error:', error);
      }
    })();
  }, []);

  return (
    <>
      {content_is_correct && repository ? (
        <>
          <div className="w-full flex items-center justify-center mt-9">
            <img className="w-20 rounded-full mr-2 border-2" src={repository.owner.avatar_url} />
            <h1 className="text-center font-bold text-7xl">{repository.name[0].toUpperCase() + repository.name.slice(1)}</h1>
          </div>
          <div className="flex mx-5 items-center justify-center mt-8 font-mono">
            <div
              dangerouslySetInnerHTML={{
                __html: `<span style='color:gold'>zig</span>&nbsp;<span style='color:skyblue'>fetch</span>&nbsp;<span style='color:gray'>--save</span>&nbsp;<span style='color:lightgreen'>${tags?.[0]?.tarball_url ? "https://github.com/" + repository.full_name + "/archive/refs/tags/" + tags[0].name + ".tar.gz" : "This project doesn't have any releases"}</span>&nbsp;${render(<Button color="dark"><FaRegClipboard /></Button>)}`,
              }}
              className="bg-slate-800 p-2 rounded w-fit flex items-center justify-center"
            ></div>
            
          </div>
          <div id="" className="bg-slate-900 sm:mx-40 mx-10 rounded-2xl p-20" dangerouslySetInnerHTML={{__html:readme? readme:""}}></div>
        </>
      ) : (
        <>404</>
      )}
    </>
  );
}
