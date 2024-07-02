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
import { TextInput } from "flowbite-react";
import CustomCard from "@/components/CustomCard";
import Recommendations from "@/components/show_recommendations";

// ------- Functions ----------
import Repo from "@/types/custom_types";
import recommendation_backend from "../backend/recommendations_generator";
import { useState } from "react";

// =============================
//       Exports "/search"
// =============================
export default function Home({ most_used, top10LatestRepos, gui_items, gaming_items, web_items }: { most_used: Repo[], top10LatestRepos: Repo[] }) {

  // The data is going to be manipulated so setting it to top10LatestRepos
  // just to prevent errors.
  const [data, setData] = useState(top10LatestRepos);
  const [showDefault, setShowDefault] = useState(true);
  const [inputValue, setInputValue] = useState("");

  // ----------- Fetch search results -------------
  const fetchData = async () => {
    const response = await fetch("/api/search?q=" + inputValue);
    const result: Repo[] = await response.json();
    setData(result);
  };

  const handleKeyDown = (event:any) => {
	  if (event.key == "Enter") {
		  fetchData();
		  setShowDefault(false);
	  }
	  if(event.key == "Backspace" && inputValue.length < 2) {
		  setShowDefault(true);
	  }
  }

  return (
    <>
      <div className="flex flex-col items-center">
        <h1 className="text-center font-semibold text-2xl my-5">Search Ziglang Packages</h1>
        <TextInput
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search libraries"
          className="w-72 mb-5"
          autoFocus
        />
      </div>
      {showDefault ? (
        <Recommendations gaming_items={gaming_items} gui_items={gui_items} web_items={web_items} most_used={most_used} top10LatestRepos={top10LatestRepos} />
      ) : (
        <section className="w-full flex flex-wrap justify-evenly">
          {data.length ? (
            data.map((item, index) => (
              <CustomCard key={index} item={item} />
            ))
          ) : (
            <h1>Can&apos;t find what you are looking for</h1>
          )}
        </section>
      )}
    </>
  );
}

// ==================================
//       Get Static Props
// ==================================
export { recommendation_backend as getStaticProps };
