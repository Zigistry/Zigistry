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
import { Button, Dropdown, DropdownItem, Select, TextInput, Tooltip } from "flowbite-react";
import CustomCard from "@/components/CustomCard";
import Recommendations from "@/components/show_recommendations";

// ------- Functions ----------
import Repo from "@/types/custom_types";
import recommendation_backend from "../backend/recommendations_generator";
import { useState } from "react";
import Link from "next/link";

// =============================
//       Exports "/search"
// =============================
export default function AI() {

    // The data is going to be manipulated so setting it to top10LatestRepos
    // just to prevent errors.
    const [data, setData] = useState("");
    const [inputValue, setInputValue] = useState("");
    // ------- prevent user ddos --------
    const [data_in_the_textbox_changed, set_data_in_the_textbox_changed] = useState(false);

    // ----------- Fetch search results -------------
    const fetchData = async () => {
        if (inputValue !== "" && data_in_the_textbox_changed) {
            set_data_in_the_textbox_changed(false);
            var response = await fetch("/api/ai_chatbot_api?q=" + inputValue);
            const result = await response.json();
            setData(result.answer);
        }
    };

    const handleKeyDown = (event: any) => {
        if (event.key == "Enter") {
            fetchData();
        }
    }
    function handleOnChage(z: string) {
        set_data_in_the_textbox_changed(true);
        setInputValue(z);
    }
    return (
            <div className="flex flex-col items-center" style={{ height: "calc(100vh - 122px)" }}>
                <h1 className="text-center font-semibold text-2xl my-5">Ask AI</h1>
                <TextInput
                    onChange={(e) => handleOnChage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask me..."
                    className="w-72 mb-5 mr-2"
                    autoFocus
                />
                <div className="">
                {data}
                </div>
            </div>
    );
}