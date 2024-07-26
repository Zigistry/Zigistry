//!===============================================================
//!                       Index Page "/" 
//!===============================================================
//!	Author  : Rohan Vashisht
//! License : Please check license file
//! Details : This is the index page that will be shown on the "/"
//! route. The default view is the top 10 latest and the top 20 
//! most used repositories.
//!===============================================================

// ===================
//       Imports
// ===================

// ------- Components ---------
import {
  Select,
  TextInput,
  Tooltip,
} from "flowbite-react";
import CustomCard from "@/components/CustomCard";
import InfiniteScroll from "react-infinite-scroll-component";

// ------- Functions ----------
import Repo, { placeHolderRepoType } from "@/types/customTypes";
import { FaStar } from "react-icons/fa";
import { IoMdFastforward } from "react-icons/io";
import { IoLogoGameControllerB } from "react-icons/io";
import { SlGlobe } from "react-icons/sl";
import { IoIosApps } from "react-icons/io";
import { useEffect, useState } from "react";

// -------- Json ---------
import items from "@/database/main.json";
import gamingItems from "@/database/games.json";
import webItems from "@/database/games.json";
import guiItems from "@/database/games.json";

// =============================
//       Exports "/search"
// =============================
export default function Home(
  props: {
    mostUsed: Repo[];
    top10LatestRepos: Repo[];
  },
) {
  // The data is going to be manipulated so setting it to top10LatestRepos
  // just to prevent errors.

  const [infiniteScrollItems, setInfiniteScrollItems] = useState([placeHolderRepoType]);
  const [hasMore, setHasMore] = useState(true);
  const [infiniteScrollIndex, setIndex] = useState(3);

  useEffect(() => {
    fetch("/api/infiniteScroll?pageNumber=2")
      .then((res) => res.json())
      .then((data) => setInfiniteScrollItems(data))
      .catch((err) => console.log(err));
  }, []);

  const fetchMoreData = () => {
    fetch(`/api/infiniteScroll?pageNumber=${infiniteScrollIndex}`)
      .then((res) => res.json())
      .then((data) => {
        setInfiniteScrollItems((prevItems) => [...prevItems, ...data]);

        data.length > 0 ? setHasMore(true) : setHasMore(false);
      })
      .catch((err) => console.log(err));

    setIndex((prevIndex) => prevIndex + 1);
  };
  const [searchResultsData, setSearchResultsData] = useState([placeHolderRepoType]);
  const [showDefaultIndexPage, setShowDefaultIndexPage] = useState(true);
  const [searchTextboxInputValue, setSearchTextboxInputValue] = useState("");
  // ------- prevent user ddos --------
  const [dataInTextboxChanged, setDataInTextboxChanged] = useState(false);

  // ----------- Fetch search results -------------
  const fetchData = async () => {
    const val: HTMLSelectElement = document.getElementById(
      "dropDownID",
    ) as HTMLSelectElement;
    if (searchTextboxInputValue !== "" && dataInTextboxChanged) {
      setDataInTextboxChanged(false);
      var response;
      if (val.value === "No Filter") {
        response = await fetch("/api/search?q=" + searchTextboxInputValue);
      } else {
        response = await fetch(
          "/api/search?q=" + searchTextboxInputValue + "&filter=" + val.value,
        );
      }
      const result: Repo[] = await response.json();
      setSearchResultsData(result);
    }
  };

  const handleKeyDown = (event: any) => {
    if (event.key == "Enter") {
      fetchData();
      setShowDefaultIndexPage(false);
    }
  };
  function handleOnChage(z: string) {
    setDataInTextboxChanged(true);
    if (z == "") {
      setShowDefaultIndexPage(true);
    } else {
      setSearchTextboxInputValue(z);
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
            <Select id="dropDownID" required={false}>
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
            placeholder="Search 400+ Zig libraries"
            className="w-72 mb-5 ml-2"
            autoFocus
          />

        </div>
      </div>
      {showDefaultIndexPage
        ? (
          <>
            <h1 className="text-left font-semibold text-2xl my-5 ml-10 w-fit border-2 border-slate-400 flex items-center p-4 rounded">
              <IoMdFastforward size={25} />
              &nbsp;Recently released:
            </h1>
            <section className="w-full flex flex-wrap justify-evenly">
              {props.top10LatestRepos.map((
                item: Repo,
                index: number,
              ) => <CustomCard key={index} item={item} />)}
            </section>
            <h1 className="text-left font-semibold text-2xl my-5 ml-10 w-fit border-2 border-slate-400 flex items-center p-4 rounded">
              <FaStar size={25} />
              &nbsp;Most used:
            </h1>
            <section className="w-full flex flex-wrap justify-evenly">
              {props.mostUsed.map((
                item: Repo,
                index: number,
              ) => <CustomCard key={index} item={item} />)}
            </section>
            <h1 className="text-left font-semibold text-2xl my-5 ml-10 w-fit border-2 border-slate-400 flex items-center p-4 rounded">
              <IoLogoGameControllerB size={25} />
              &nbsp;Famous Game libs:
            </h1>
            <section className="w-full flex flex-wrap justify-evenly">
              {gamingItems.map((
                item: Repo,
                index: number,
              ) => <CustomCard key={index} item={item} />)}
            </section>
            <h1 className="text-left font-semibold text-2xl my-5 ml-10 w-fit border-2 border-slate-400 flex items-center p-4 rounded">
              <IoIosApps size={25} />
              &nbsp;Famous GUI libs:
            </h1>
            <section className="w-full flex flex-wrap justify-evenly">
              {guiItems.map((
                item: Repo,
                index: number,
              ) => <CustomCard key={index} item={item} />)}
            </section>
            <h1 className="text-left font-semibold text-2xl my-5 ml-10 w-fit border-2 border-slate-400 flex items-center p-4 rounded">
              <SlGlobe size={25} />
              &nbsp;Famous Web libs:
            </h1>
            <section className="w-full flex flex-wrap justify-evenly">
              {webItems.map((
                item: Repo,
                index: number,
              ) => <CustomCard key={index} item={item} />)}
            </section>
            <h1 className="text-left font-semibold text-2xl my-5 ml-10 w-fit border-2 border-slate-400 flex items-center p-4 rounded">
              <SlGlobe size={25} />
              &nbsp;View more:
            </h1>

            <InfiniteScroll
              dataLength={infiniteScrollItems.length}
              next={fetchMoreData}
              hasMore={hasMore}
              loader={undefined}
            >
              <section className="w-full flex flex-wrap justify-evenly">
                {infiniteScrollItems
                  ? (
                    infiniteScrollItems.map((
                      item: Repo,
                      index: number,
                    ) => <CustomCard key={index} item={item} />)
                  )
                  : <p>Loading...</p>}
              </section>
            </InfiniteScroll>

          </>
        )
        : (
          <section className="w-full flex flex-wrap justify-evenly">
            {searchResultsData.length
              ? (
                searchResultsData.map((item: any, index: any) => (
                  <CustomCard key={index} item={item} />
                ))
              )
              : <h1>Can&apos;t find what you are looking for</h1>}
          </section>
        )
      }
    </>
  );
}



// =======================================================
//       Exports getStaticProps for the Index page.
// =======================================================
export async function getStaticProps() {
  // -------- Sort latest repos ----------
  const sortedRepos = items.slice().sort((a, b) =>
    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  // --------- Most used Repos -----------
  const mostUsed = items.slice(0, 10);

  // ----------- Latest Repos ------------
  const top10LatestRepos = sortedRepos.slice(0, 10);

  // ------- Return Repos as Props -------
  return {
    props: {
      mostUsed,
      top10LatestRepos,
    },
  };
}
