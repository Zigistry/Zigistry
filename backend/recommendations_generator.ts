/*===============================================================================*/
/*                      Recommendations Generator Algorithm                      */
/*===============================================================================*/

/*
 | Author:
 | Rohan Vashisht
 |
 | Details:
 | This page is used as the getStaticProps for Index page.
 | Please check license file for copyright details.
 */

// ===================
//       Imports
// ===================

// --------- Types -----------
import Repo from "@/types/custom_types";

// =======================================================
//       Exports getStaticProps for the Index page.
// =======================================================
export default async function recommendation_backend() {
  
  // -------------- Fetch ----------------
  const response = await fetch("https://raw.githubusercontent.com/RohanVashisht1234/zigistry/main/database/main.json");
  if (!response.ok) throw new Error(`Error: ${response.statusText}`);
  const items: Repo[] = await response.json();

  const gaming_response = await fetch("https://raw.githubusercontent.com/RohanVashisht1234/zigistry/main/database/games.json");
  if (!gaming_response.ok) throw new Error(`Error: ${gaming_response.statusText}`);
  const gaming_items: Repo[] = await gaming_response.json();

  const web_response = await fetch("https://raw.githubusercontent.com/RohanVashisht1234/zigistry/main/database/web.json");
  if (!web_response.ok) throw new Error(`Error: ${web_response.statusText}`);
  const web_items: Repo[] = await web_response.json();

  const gui_response = await fetch("https://raw.githubusercontent.com/RohanVashisht1234/zigistry/main/database/gui.json");
  if (!gui_response.ok) throw new Error(`Error: ${gui_response.statusText}`);
  const gui_items: Repo[] = await gui_response.json();


  // -------- Sort latest repos ----------
  const sortedRepos = items.slice().sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  // --------- Most used Repos -----------
  const most_used = items.slice(0, 10);

  // ----------- Latest Repos ------------
  const top10LatestRepos = sortedRepos.slice(0, 10);


  // ------- Return Repos as Props -------
  return { props: { most_used, top10LatestRepos, gaming_items, web_items, gui_items } };
}
