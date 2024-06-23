import { useLocation } from 'preact-iso';
import { useEffect, useState } from 'preact/hooks';

export function Manage() {
  const { url } = useLocation();
  const url_on_user_side = url.slice(1);
  const [repository, setRepository] = useState(null);
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
          <div className="flex items-center justify-center mt-8 font-mono">
            <div
              dangerouslySetInnerHTML={{
                __html: `<span style='color:gold'>zig</span> <span style='color:skyblue'>fetch</span> <span style='color:gray'>--save</span> <span style='color:lightgreen'>${tags?.[0]?.tarball_url ? "https://github.com/" + repository.full_name + "/archive/refs/tags/" + tags[0].name + ".tar.gz" : "This project doesn't have any releases"}</span>`,
              }}
              className="bg-slate-800 p-2 rounded"
            />
          </div>
        </>
      ) : (
        <>404</>
      )}
    </>
  );
}
