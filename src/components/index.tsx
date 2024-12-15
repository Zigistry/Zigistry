import CustomCard from "./CustomCard";
import { Select, TextInput, Tooltip } from "flowbite-react";
import { FaStar } from "react-icons/fa";
import {
  IoMdFastforward,
  IoLogoGameControllerB,
  IoIosApps,
} from "react-icons/io";
import { SlGlobe } from "react-icons/sl";
import { useState } from "react";
import gamingItems from "../../database/games.json";
import webItems from "../../database/web.json";
import { FaCodeFork } from "react-icons/fa6";
import guiItems from "../../database/gui.json";
import InfiniteScroll from "react-infinite-scroll-component";
import { MdBrowserUpdated } from "react-icons/md";
import type { Repo } from "../typesAndFunctions/customFunctions";
import { GiBrain } from "react-icons/gi";
import { Button } from "flowbite-react";

export default function IndexComponent(props: {
  top10LatestRepos: Repo[];
  mostUsed: Repo[];
}) {
  const [infiniteScrollItems, setInfiniteScrollItems] = useState<Repo[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [infiniteScrollIndex, setIndex] = useState(1);
  const [searchResultsData, setSearchResultsData] = useState<Repo[]>([]);
  const [intelSearchResults, setIntelSearchResults] = useState<Repo[]>([]);
  const [showDefaultIndexPage, setShowDefaultIndexPage] = useState(true);
  const [searchTextboxInputValue, setSearchTextboxInputValue] = useState("");
  const [dataInTextboxChanged, setDataInTextboxChanged] = useState(false);

  const fetchMoreData = () => {
    fetch(`/api/infiniteScrollPackages?pageNumber=${infiniteScrollIndex}`)
      .then((res) => res.json())
      .then((data) => {
        setInfiniteScrollItems((prevItems) => [...prevItems, ...data]);
        setHasMore(data.length > 0);
      })
      .catch((err) => console.log(err));
    setIndex((prevIndex) => prevIndex + 1);
  };

  const fetchData = async () => {
    const val = document.getElementById("dropDownID") as HTMLSelectElement;
    if (searchTextboxInputValue !== "" && dataInTextboxChanged) {
      setDataInTextboxChanged(false);
      const response = await fetch(
        `/api/searchPackages?q=${searchTextboxInputValue}${val.value !== "No Filter" ? `&filter=${val.value}` : ""}`,
      );
      const result: Repo[] = await response.json();
      setSearchResultsData(result);
      setIntelSearchResults(result);
    }
  };

  const handleKeyDown = (event: { key: string }) => {
    if (event.key === "Enter") {
      fetchData();
      setShowDefaultIndexPage(false);
    }
  };

  const searchfetchWhenDropDownChanged = async () => {
    const val = document.getElementById("dropDownID") as HTMLSelectElement;
    if (val.value === "No Filter") {
      setShowDefaultIndexPage(true);
    } else {
      const response = await fetch(`/api/searchPackages?filter=${val.value}`);
      const result: Repo[] = await response.json();
      setShowDefaultIndexPage(false);
      setSearchResultsData(result);
      setIntelSearchResults(result);
    }
  };

  const handleOnChange = (z: string) => {
    setDataInTextboxChanged(true);
    if (z == "") {
      setShowDefaultIndexPage(true);
    } else {
      setSearchTextboxInputValue(z);
    }
  };
  const sortIt = (criterion: string) => {
    let sortedData = [...searchResultsData];

    switch (criterion) {
      case "intels":
        sortedData = intelSearchResults;
        break;
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
            Search Ziglang Packages
          </h1>
          <div className="flex">
            <Tooltip content="Search by filtering GitHub topics">
              <Select
                onChange={searchfetchWhenDropDownChanged}
                id="dropDownID"
                className="ml-4"
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
              onChange={(e) => handleOnChange(e.target.value)}
              onKeyUp={handleKeyDown}
              id="SearchBox"
              placeholder="Search 500+ Zig libraries"
              className="mx-4 mb-5 w-60 max-w-72"
              color="gray"
              autoFocus
            />
          </div>
        </div>
      </div>

      {showDefaultIndexPage ? (
        <>
          <h1 className="my-5 ml-10 flex w-fit items-center rounded border-2 border-slate-400 p-4 text-left text-2xl font-semibold shadow-lg shadow-black">
            <IoMdFastforward size={25} />
            &nbsp;Recently released:
          </h1>
          <section className="flex w-full flex-wrap justify-evenly">
            {props.top10LatestRepos.map((item: Repo, key) => (
              <CustomCard key={key} program={false} item={item} />
            ))}
          </section>

          <h1 className="my-5 ml-10 flex w-fit items-center rounded border-2 border-slate-400 p-4 text-left text-2xl font-semibold">
            <FaStar size={25} />
            Most used:
          </h1>

          <section className="flex w-full flex-wrap justify-evenly">
            {props.mostUsed.map((item: Repo, key) => (
              <CustomCard key={key} program={false} item={item} />
            ))}
          </section>

          <h1 className="my-5 ml-10 flex w-fit items-center rounded border-2 border-slate-400 p-4 text-left text-2xl font-semibold">
            <IoLogoGameControllerB size={25} />
            &nbsp;Famous Game libs:
          </h1>
          <section className="flex w-full flex-wrap justify-evenly">
            {gamingItems.map((item: Repo, key) => (
              <CustomCard key={key} program={false} item={item} />
            ))}
          </section>

          <h1 className="my-5 ml-10 flex w-fit items-center rounded border-2 border-slate-400 p-4 text-left text-2xl font-semibold">
            <IoIosApps size={25} />
            &nbsp;Famous GUI libs:
          </h1>
          <section className="flex w-full flex-wrap justify-evenly">
            {guiItems.map((item: Repo, key) => (
              <CustomCard key={key} program={false} item={item} />
            ))}
          </section>

          <h1 className="my-5 ml-10 flex w-fit items-center rounded border-2 border-slate-400 p-4 text-left text-2xl font-semibold">
            <SlGlobe size={25} />
            &nbsp;Famous Web libs:
          </h1>
          <section className="flex w-full flex-wrap justify-evenly">
            {webItems.map((item: Repo, key) => (
              <CustomCard key={key} program={false} item={item} />
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
            loader={<p>Loading</p>}
          >
            <section className="flex w-full flex-wrap justify-evenly">
              {infiniteScrollItems.map((item, key) => (
                <CustomCard key={key} program={false} item={item} />
              ))}
            </section>
          </InfiniteScroll>
        </>
      ) : (
        <div>
          <h1 className="mb-3 text-center text-2xl">Sort:</h1>
          <div className="flex justify-center">
            <div className="flex space-x-4">
              <Tooltip content="Intelligent Sort">
                <Button onClick={() => sortIt("intels")} color="dark">
                  <GiBrain size={22} />
                </Button>
              </Tooltip>
              <Tooltip content="Star Count">
                <Button onClick={() => sortIt("star")} color="dark">
                  <FaStar size={22} />
                </Button>
              </Tooltip>
              <Tooltip content="Alphabetical Sort">
                <Button onClick={() => sortIt("a-z")} color="dark">
                  A-Z
                </Button>
              </Tooltip>
              <Tooltip content="Last Updated">
                <Button onClick={() => sortIt("updates")} color="dark">
                  <MdBrowserUpdated size={22} />
                </Button>
              </Tooltip>
              <Tooltip content="Fork Count">
                <Button onClick={() => sortIt("forks")} color="dark">
                  <FaCodeFork size={22} />
                </Button>
              </Tooltip>
            </div>
          </div>
          <section className="flex w-full flex-wrap justify-evenly">
            {searchResultsData.length ? (
              searchResultsData.map((item, key) => (
                <CustomCard key={key} program={false} item={item} />
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
