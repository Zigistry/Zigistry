/*===============================================================================*/
/*                      Recommendations Generator Algorithm                      */
/*===============================================================================*/

/*
 | Author:
 | Rohan Vashisht
 |
 | Details:
 | This page is used as the getServerSideProps for Index and Search pages.
 | Please check license file for copyright details.
 */

// ===================
//       Imports
// ===================

// --------- Types -----------
import Repo from "@/types/custom_types";

// ==================================================================
//       Exports getServerSideProps for Index and Search pages.
// ==================================================================
export default async function recommendation_backend() {
  
  // -------------- Fetch ----------------
  const response = await fetch("https://raw.githubusercontent.com/RohanVashisht1234/zigistry/main/database/main.json");
  if (!response.ok) throw new Error(`Error: ${response.statusText}`);
  const items: Repo[] = await response.json();

  // -------- Sort latest repos ----------
  const sortedRepos = items.slice().sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  // --------- Most used Repos -----------
  const most_used = items.slice(0, 20);

  // ----------- Latest Repos ------------
  const top10LatestRepos = sortedRepos.slice(0, 10);

  // ------- Return Repos as Props -------
  return { props: { most_used, top10LatestRepos } };
}
