import { useLocation } from 'preact-iso';
import { useEffect, useState } from 'preact/hooks';



export function Manage() {
    const { url } = useLocation();
    const url_on_user_side = url.slice(1, url.length);
    const [repository, setRepository] = useState(null);
    const [content_is_correct, set_content_correct] = useState(false);
    const [release, set_release] = useState(null);
    const github_url = "https://raw.githubusercontent.com/RohanVashisht1234/zigistry/main/database/main.json";

    useEffect(() => {
        fetch(github_url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                if (data.items.some((obj) => obj.full_name === url_on_user_side)) {
                    set_content_correct(true);
                    for (var i = 0; i < data.items.length; i++) {
                        if (data.items[i].full_name == url_on_user_side) {
                            const d = data.items[i];
                            setRepository(d);
                            break;
                        }
                    }
                }
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });
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
                        <div dangerouslySetInnerHTML={{ __html: `.<span style="color:gold">dependencies</span> = .{<br>&nbsp;&nbsp;&nbsp;&nbsp;.<span style="color:gold">${repository.name.toLowerCase().replaceAll("-", "_").replaceAll(" ", "_").replaceAll(".", "_")}</span> = .{<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.<span style="color:gold">url</span> = <span style="color:lightgreen">""</span>,<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.<span style="color:gold">hash</span> = <span style="color:lightgreen">""</span><br>&nbsp;&nbsp;&nbsp;&nbsp;}<br>}` }} className="bg-slate-800 p-2 rounded">
                        </div>
                    </div>

                </>
            ) : <>404</>}
        </>
    );
}
