/*===============================================================================*/
/*                                Index Page "/"                                 */
/*===============================================================================*/

/*
 | Author:
 | Rohan Vashisht
 |
 | Details:
 | This has the same view as the search page.
 | When the search box is clicked, the user is redirected to "/search".
 | Please check license file for copyright details.
 */

// ===================
//       Imports
// ===================

// ------- Components ---------
import { TextInput } from "flowbite-react";
import Recommendations from "@/components/show_recommendations";

// ------- Functions ----------
import { useRouter } from 'next/router';
import Repo from "@/types/custom_types";
import recommendation_backend from "../backend/recommendations_generator";

// =======================
//       Exports "/"
// =======================
export default function Home({ most_used, top10LatestRepos }: { most_used: Repo[], top10LatestRepos: Repo[] }) {
  const router = useRouter();

  // Change the route to /search when person clicks on the search box.
  const changeRoute = () => router.push("/search");

  return (
    <>
      <div className="flex flex-col items-center">
        <h1 className="text-center font-semibold text-2xl my-5">
          Search Ziglang Packages
        </h1>
        <TextInput onFocus={changeRoute} placeholder="Search libraries" className="w-72 mb-5" />
      </div>
      <Recommendations most_used={most_used} top10LatestRepos={top10LatestRepos} />
    </>
  );
}

// ==================================
//       Get Static Props
// ==================================
export { recommendation_backend as getStaticProps };