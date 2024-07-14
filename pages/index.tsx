/*===============================================================================*/
/*                                Index Page "/"                                 */
/*===============================================================================*/

/*
 | Author:
 | Rohan Vashisht
 |
 | Details:
 | This is the index page that will be shown on the "/" route.
 | The default view is the top 10 latest and the top 20 most used repositories.
 | Please check license file for copyright details.
 */

// ===================
//       Imports
// ===================

// ------- Components ---------
import {
    Button,
    Dropdown,
    DropdownItem,
    Select,
    TextInput,
    Tooltip,
} from "flowbite-react";
import CustomCard from "@/components/CustomCard";

// ------- Functions ----------
import Repo from "@/types/custom_types";
import { FaStar } from "react-icons/fa";
import { IoMdFastforward } from "react-icons/io";
import { IoLogoGameControllerB } from "react-icons/io";
import { SlGlobe } from "react-icons/sl";
import { IoIosApps } from "react-icons/io";
import { useState } from "react";
import Link from "next/link";

// =============================
//       Exports "/search"
// =============================
export default function Home(
    props: {
        most_used: any;
        top10LatestRepos: any;
        gui_items: any;
        gaming_items: any;
        web_items: any;
    },
) {
    // The data is going to be manipulated so setting it to top10LatestRepos
    // just to prevent errors.
    const [data, setData] = useState(props.top10LatestRepos);
    const [showDefault, setShowDefault] = useState(true);
    const [inputValue, setInputValue] = useState("");
    // ------- prevent user ddos --------
    const [data_in_the_textbox_changed, set_data_in_the_textbox_changed] =
        useState(false);

    // ----------- Fetch search results -------------
    const fetchData = async () => {
        const val: HTMLSelectElement = document.getElementById(
            "get",
        ) as HTMLSelectElement;
        if (inputValue !== "" && data_in_the_textbox_changed) {
            set_data_in_the_textbox_changed(false);
            var response;
            if (val.value === "No Filter") {
                response = await fetch("/api/search?q=" + inputValue);
            } else {
                response = await fetch(
                    "/api/search?q=" + inputValue + "&mine=" + val.value,
                );
            }
            const result: Repo[] = await response.json();
            setData(result);
        }
    };

    const handleKeyDown = (event: any) => {
        if (event.key == "Enter") {
            fetchData();
            setShowDefault(false);
        }
    };
    function handleOnChage(z: string) {
        set_data_in_the_textbox_changed(true);
        if (z == "") {
            setShowDefault(true);
        } else {
            setInputValue(z);
        }
    }
    return (
        <>
            <div className="flex flex-col items-center">
                <h1 className="text-center font-semibold text-2xl my-5">
                    Search Ziglang Packages
                </h1>
                <div className="flex">
                <Tooltip content="Search by filtering github topics">
                        <Select id="get" required={false}>
                            <option>No Filter</option>
                            <option>api</option>
                            <option>http</option>
                            <option>rest</option>
                            <option>gamedev</option>
                            <option>gui</option>
                            <option>cross-platform</option>
                        </Select>
                    </Tooltip>
                    <TextInput
                        onChange={(e) => handleOnChage(e.target.value)}
                        onKeyUp={handleKeyDown}
                        onSubmit={handleKeyDown}
                        placeholder="Search libraries"
                        className="w-72 mb-5 ml-2"
                        autoFocus
                    />
                    
                </div>
            </div>
            {showDefault
                ? (
                    <>
                        <h1 className="text-left font-semibold text-2xl my-5 ml-10 w-fit border-2 border-slate-400 flex items-center p-4 rounded">
                            <IoMdFastforward size={25} />
                            &nbsp;Recently released:
                        </h1>
                        <section className="w-full flex flex-wrap justify-evenly">
                            {props.top10LatestRepos
                                ? (
                                    props.top10LatestRepos.map((
                                        item: Repo,
                                        index: number,
                                    ) => <CustomCard key={index} item={item} />)
                                )
                                : <p>Loading...</p>}
                        </section>
                        <h1 className="text-left font-semibold text-2xl my-5 ml-10 w-fit border-2 border-slate-400 flex items-center p-4 rounded">
                            <FaStar size={25} />
                            &nbsp;Most used:
                        </h1>
                        <section className="w-full flex flex-wrap justify-evenly">
                            {props.most_used
                                ? (
                                    props.most_used.map((
                                        item: Repo,
                                        index: number,
                                    ) => <CustomCard key={index} item={item} />)
                                )
                                : <p>Loading...</p>}
                        </section>
                        <h1 className="text-left font-semibold text-2xl my-5 ml-10 w-fit border-2 border-slate-400 flex items-center p-4 rounded">
                            <IoLogoGameControllerB size={25} />
                            &nbsp;Famous Game libs:
                        </h1>
                        <section className="w-full flex flex-wrap justify-evenly">
                            {props.gaming_items
                                ? (
                                    props.gaming_items.map((
                                        item: Repo,
                                        index: number,
                                    ) => <CustomCard key={index} item={item} />)
                                )
                                : <p>Loading...</p>}
                        </section>
                        <h1 className="text-left font-semibold text-2xl my-5 ml-10 w-fit border-2 border-slate-400 flex items-center p-4 rounded">
                            <IoIosApps size={25} />
                            &nbsp;Famous GUI libs:
                        </h1>
                        <section className="w-full flex flex-wrap justify-evenly">
                            {props.gui_items
                                ? (
                                    props.gui_items.map((
                                        item: Repo,
                                        index: number,
                                    ) => <CustomCard key={index} item={item} />)
                                )
                                : <p>Loading...</p>}
                        </section>
                        <h1 className="text-left font-semibold text-2xl my-5 ml-10 w-fit border-2 border-slate-400 flex items-center p-4 rounded">
                            <SlGlobe size={25} />
                            &nbsp;Famous Web libs:
                        </h1>
                        <section className="w-full flex flex-wrap justify-evenly">
                            {props.web_items
                                ? (
                                    props.web_items.map((
                                        item: Repo,
                                        index: number,
                                    ) => <CustomCard key={index} item={item} />)
                                )
                                : <p>Loading...</p>}
                        </section>
                    </>
                )
                : (
                    <section className="w-full flex flex-wrap justify-evenly">
                        {data.length
                            ? (
                                data.map((item: any, index: any) => (
                                    <CustomCard key={index} item={item} />
                                ))
                            )
                            : <h1>Can&apos;t find what you are looking for</h1>}
                    </section>
                )}
        </>
    );
}

// =======================================================
//       Exports getStaticProps for the Index page.
// =======================================================
export async function getStaticProps() {
    // -------------- Fetch ----------------
    const response = await fetch(
        "https://raw.githubusercontent.com/RohanVashisht1234/zigistry/main/database/main.json",
    );
    if (!response.ok) throw new Error(`Error: ${response.statusText}`);
    const items: Repo[] = await response.json();

    const gaming_response = await fetch(
        "https://raw.githubusercontent.com/RohanVashisht1234/zigistry/main/database/games.json",
    );
    if (!gaming_response.ok) {
        throw new Error(`Error: ${gaming_response.statusText}`);
    }
    const gaming_items: Repo[] = await gaming_response.json();

    const web_response = await fetch(
        "https://raw.githubusercontent.com/RohanVashisht1234/zigistry/main/database/web.json",
    );
    if (!web_response.ok) throw new Error(`Error: ${web_response.statusText}`);
    const web_items: Repo[] = await web_response.json();

    const gui_response = await fetch(
        "https://raw.githubusercontent.com/RohanVashisht1234/zigistry/main/database/gui.json",
    );
    if (!gui_response.ok) throw new Error(`Error: ${gui_response.statusText}`);
    const gui_items: Repo[] = await gui_response.json();

    // -------- Sort latest repos ----------
    const sortedRepos = items.slice().sort((a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    // --------- Most used Repos -----------
    const most_used = items.slice(0, 10);

    // ----------- Latest Repos ------------
    const top10LatestRepos = sortedRepos.slice(0, 10);

    // ------- Return Repos as Props -------
    return {
        props: {
            most_used,
            top10LatestRepos,
            gaming_items,
            web_items,
            gui_items,
        },
    };
}
