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
import guiItems from "../../database/gui.json";
import InfiniteScroll from "react-infinite-scroll-component";
import type { Repo } from "../typesAndFunctions/customFunctions";

export default function IndexComponent(props: {
  top10LatestRepos: Repo[];
  mostUsed: Repo[];
}) {
  const [infiniteScrollItems, setInfiniteScrollItems] = useState<Repo[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [infiniteScrollIndex, setIndex] = useState(1);
  const [searchResultsData, setSearchResultsData] = useState<Repo[]>([]);
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

  return (
    <>
      <div className="flex flex-col items-center">
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
            placeholder="Search 400+ Zig libraries"
            className="mx-4 mb-5 w-60 max-w-72"
            autoFocus
          />
        </div>
      </div>

      {showDefaultIndexPage ? (
        <>
          <h1 className="my-5 ml-10 flex w-fit items-center rounded border-2 border-slate-400 p-4 text-left text-2xl font-semibold">
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
        <section className="flex w-full flex-wrap justify-evenly">
          {searchResultsData.length ? (
            searchResultsData.map((item, key) => (
              <CustomCard key={key} program={false} item={item} />
            ))
          ) : (
            <h1>Can&apos;t find what you are looking for</h1>
          )}
        </section>
      )}
    </>
  );
}
