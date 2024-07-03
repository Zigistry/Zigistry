/*===============================================================================*/
/*                       Show recommendations component                          */
/*===============================================================================*/

/*
 | Author:
 | Rohan Vashisht
 |
 | Details:
 | This is the default show recommendations component.
 | Please check license file for copyright details.
 */

// ===================
//       Imports
// ===================

// ------- Components ---------
import { FaStar } from "react-icons/fa";
import { IoMdFastforward } from "react-icons/io";
import Repo from "@/types/custom_types";
import CustomCard from "./CustomCard";

// =================================================
//       Exports default Recommendations view
// =================================================
export default function Recommendations(props: {
  most_used: Repo[];
  top10LatestRepos: Repo[];
  gaming_items: Repo[];
  web_items: Repo[];
  gui_items: Repo[];
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
      <h1 className="text-left font-semibold text-2xl my-5 ml-10 w-fit border-2 border-slate-400 flex items-center p-4 rounded">
        <FaStar size={25} />
        &nbsp;Famous Game libs: (This website section is WIP)
      </h1>
      <section className="w-full flex flex-wrap justify-evenly">
        {props.gaming_items ? (
          props.gaming_items.map((item: Repo, index: number) => (
            <CustomCard key={index} item={item} />
          ))
        ) : (
          <p>Loading...</p>
        )}
      </section>
      <h1 className="text-left font-semibold text-2xl my-5 ml-10 w-fit border-2 border-slate-400 flex items-center p-4 rounded">
        <FaStar size={25} />
        &nbsp;Famous GUI libs: (This website section is WIP)
      </h1>
      <section className="w-full flex flex-wrap justify-evenly">
        {props.gui_items ? (
          props.gui_items.map((item: Repo, index: number) => (
            <CustomCard key={index} item={item} />
          ))
        ) : (
          <p>Loading...</p>
        )}
      </section>
      <h1 className="text-left font-semibold text-2xl my-5 ml-10 w-fit border-2 border-slate-400 flex items-center p-4 rounded">
        <FaStar size={25} />
        &nbsp;Famous Web libs: (This website section is WIP)
      </h1>
      <section className="w-full flex flex-wrap justify-evenly">
        {props.web_items ? (
          props.web_items.map((item: Repo, index: number) => (
            <CustomCard key={index} item={item} />
          ))
        ) : (
          <p>Loading...</p>
        )}
      </section>
    </>
  )
}
