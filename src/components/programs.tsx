//!===============================================================
//!                  Programs Page "/programs"
//!===============================================================
//!	Author  : Rohan Vashisht
//! License : Please check license file.
//! Details : This is the programs page that will be shown on the
//! "/programs" route. The default view is the top 10 latest and
//! top 20 most used with infinite scroll.
//!===============================================================

// ===================
//       Imports
// ===================

// ------- Components ---------
import {
  Button,
  ButtonGroup,
  Select,
  TextInput,
  Tooltip,
} from "flowbite-react";
import CustomCard from "./CustomCard";
import InfiniteScroll from "react-infinite-scroll-component";

// ------- Functions ----------
import type { Repo } from "../typesAndFunctions/customFunctions";
import { FaStar } from "react-icons/fa";
import { IoMdFastforward } from "react-icons/io";
import { SlGlobe } from "react-icons/sl";
import { useState } from "react";

// =============================
//       Exports "/programs"
// =============================
export default function Programs(props: {
  mostUsed: Repo[];
  top10LatestRepos: Repo[];
}) {
  const [infiniteScrollItems, setInfiniteScrollItems] = useState<Repo[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [infiniteScrollIndex, setIndex] = useState(1);
  const [searchResultsData, setSearchResultsData] = useState<Repo[]>([]);
  const [showDefaultIndexPage, setShowDefaultIndexPage] = useState(true);
  const [searchTextboxInputValue, setSearchTextboxInputValue] = useState("");
  // ------- prevent user ddos --------
  const [dataInTextboxChanged, setDataInTextboxChanged] = useState(false);

  const fetchMoreData = () => {
    fetch(`/api/infiniteScrollPrograms?pageNumber=${infiniteScrollIndex}`)
      .then((res) => res.json())
      .then((data) => {
        setInfiniteScrollItems((prevItems) => [...prevItems, ...data]);

        data.length > 0 ? setHasMore(true) : setHasMore(false);
      })
      .catch((err) => console.log(err));

    setIndex((prevIndex) => prevIndex + 1);
  };

  // ----------- Fetch search results -------------
  const fetchData = async () => {
    const val: HTMLSelectElement = document.getElementById(
      "dropDownID",
    ) as HTMLSelectElement;
    if (searchTextboxInputValue !== "" && dataInTextboxChanged) {
      setDataInTextboxChanged(false);
      let response;
      if (val.value === "No Filter") {
        response = await fetch(
          "/api/searchPrograms?q=" + searchTextboxInputValue,
        );
      } else {
        response = await fetch(
          "/api/searchPrograms?q=" +
            searchTextboxInputValue +
            "&filter=" +
            val.value,
        );
      }
      const result: Repo[] = await response.json();
      setSearchResultsData(result);
    }
  };

  const handleKeyDown = (event: { key: string }) => {
    if (event.key == "Enter") {
      fetchData();
      setShowDefaultIndexPage(false);
    }
  };
  const searchUsingFilter = async () => {
    const val: HTMLSelectElement = document.getElementById(
      "dropDownID",
    ) as HTMLSelectElement;
    if (val.value == "No Filter") {
      setShowDefaultIndexPage(true);
    } else {
      const response = await fetch("/api/searchPrograms?filter=" + val.value);
      const result: Repo[] = await response.json();
      setShowDefaultIndexPage(false);
      setSearchResultsData(result);
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

  const sortIt = (criterion: string) => {
    const sortedData = [...searchResultsData];

    switch (criterion) {
      case "a-z":
        sortedData.sort((a, b) =>
          a.full_name.toLowerCase().localeCompare(b.full_name.toLowerCase()),
        );
        break;
      case "star":
        sortedData.sort((a, b) => b.stargazers_count - a.stargazers_count);
        break;
      case "updates":
        sortedData.sort((a, b) => {
          const dateA = new Date(a.updated_at).getTime();
          const dateB = new Date(b.updated_at).getTime();

          return dateB - dateA; // Sort in descending order
        });
        break;
      case "forks":
        sortedData.sort((a, b) => b.forks_count - a.forks_count);
        break;
      default:
        console.warn("Unknown sorting criterion:", criterion);
        break;
    }
    setSearchResultsData(sortedData);
  };
  return (
    <>
      <div className="flex flex-col items-center">
        <div className="rounded-lg sm:m-5 sm:p-5 sm:shadow-lg sm:shadow-black">
          <h1 className="my-5 text-center text-2xl font-semibold">
            Search Ziglang Programs
          </h1>
          <div className="flex">
            <Tooltip content="Search by filtering github topics">
              <Select
                onChange={searchUsingFilter}
                className="ml-4"
                id="dropDownID"
                required={false}
                color="warning"
              >
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
              id="SearchBox"
              placeholder="Search 1000+ Zig programs"
              className="mx-4 mb-5 w-60 max-w-72"
              autoFocus
            />
          </div>
        </div>
      </div>
      {showDefaultIndexPage ? (
        <>
          <h1 className="my-5 ml-10 flex w-fit items-center rounded border-2 border-slate-400 p-4 text-left text-2xl font-semibold">
            <IoMdFastforward size={25} />
            &nbsp;Recently released:
          </h1>
          <section className="flex w-full flex-wrap justify-evenly">
            {props.top10LatestRepos.map((item: Repo, index: number) => (
              <CustomCard program={true} key={index} item={item} />
            ))}
          </section>
          <h1 className="my-5 ml-10 flex w-fit items-center rounded border-2 border-slate-400 p-4 text-left text-2xl font-semibold">
            <FaStar size={25} />
            &nbsp;Most used:
          </h1>
          <section className="flex w-full flex-wrap justify-evenly">
            {props.mostUsed.map((item: Repo, index: number) => (
              <CustomCard program={true} key={index} item={item} />
            ))}
          </section>
          <h1 className="my-5 ml-10 flex w-fit items-center rounded border-2 border-slate-400 p-4 text-left text-2xl font-semibold">
            <SlGlobe size={25} />
            &nbsp;View more:
          </h1>

          <InfiniteScroll
            dataLength={infiniteScrollItems.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={undefined}
          >
            <section className="flex w-full flex-wrap justify-evenly">
              {infiniteScrollItems ? (
                infiniteScrollItems.map((item: Repo, index: number) => (
                  <CustomCard program={true} key={index} item={item} />
                ))
              ) : (
                <p>Loading...</p>
              )}
            </section>
          </InfiniteScroll>
        </>
      ) : (
        <div>
          <div className="flex justify-center">
            <ButtonGroup>
              <Button onClick={() => sortIt("star")} color="dark">
                Star Count
              </Button>
              <Button onClick={() => sortIt("a-z")} color="dark">
                A-Z
              </Button>
              <Button onClick={() => sortIt("updates")} color="dark">
                Last Updated
              </Button>
              <Button onClick={() => sortIt("forks")} color="dark">
                Forks
              </Button>
            </ButtonGroup>
          </div>
          <section className="flex w-full flex-wrap justify-evenly">
            {searchResultsData.length ? (
              searchResultsData.map((item, index) => (
                <CustomCard program={true} key={index} item={item} />
              ))
            ) : (
              <h1>Can&apos;t find what you are looking for</h1>
            )}
          </section>
        </div>
      )}
    </>
  );
}
