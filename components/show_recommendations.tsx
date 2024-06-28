import { FaStar } from "react-icons/fa";
import { IoMdFastforward } from "react-icons/io";
import Repo from "@/types/custom_types";
import CustomCard from "./CustomCard";


export default function Recommendations(props: {
  most_used: Repo[];
  top10LatestRepos: Repo[];
}): JSX.Element {
  return (
    <>
      <h1 className="text-left font-semibold text-2xl my-5 ml-10 w-fit border-2 border-slate-400 flex items-center p-4 rounded">
        <IoMdFastforward size={25} />
        &nbsp;Recently released:
      </h1>
      <section className="w-full flex flex-wrap justify-evenly">
        {props.top10LatestRepos ? (
          props.top10LatestRepos.map((item: Repo, index: number) => (
            <CustomCard key={index} item={item} />
          ))
        ) : (
          <p>Loading...</p>
        )}
      </section>
      <h1 className="text-left font-semibold text-2xl my-5 ml-10 w-fit border-2 border-slate-400 flex items-center p-4 rounded">
        <FaStar size={25} />
        &nbsp;Most used:
      </h1>
      <section className="w-full flex flex-wrap justify-evenly">
        {props.most_used ? (
          props.most_used.map((item: Repo, index: number) => (
            <CustomCard key={index} item={item} />
          ))
        ) : (
          <p>Loading...</p>
        )}
      </section>
    </>
  )
}