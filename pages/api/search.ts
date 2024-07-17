/*===============================================================================*/
/*                    Search Engine Algorithm API "/api/search"                  */
/*===============================================================================*/

/*
 | Author:
 | Rohan Vashisht
 |
 | Details:
 | This api implements algorithm for search.
 | The search query is expected to be received like this:
 | /api/search?q=Search%20Query
 | Please check license file for copyright details.
 */

// ===================
//       Imports
// ===================

// --------- Types -----------
import Repo from '@/types/custom_types';
import type { NextApiRequest, NextApiResponse } from 'next';


// ============================================
//       Exports Search handler as api
// ============================================
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Repo[]>
) {

  // The query from the url parameters is extracted here.
  const { q, mine: filters } = req.query;

  // ----- Check q's existence -----
  if (q && typeof (q) === typeof ("")) {

    // -------------- Fetch -------------------
    const response = await fetch("https://raw.githubusercontent.com/RohanVashisht1234/zigistry/main/database/main.json");
    if (!response.ok) throw new Error(`Error: ${response.statusText}`);
    const items: Repo[] = await response.json();

    // -------------- Filter ------------------
    var search_results: Repo[] = [];
    if (typeof filters === "string") {
      search_results = items.filter(item =>
        (item.full_name.toLowerCase().includes(q.toString().toLowerCase()) ||
          item.description.toLowerCase().includes(q.toString().toLowerCase())) &&
        item.topics?.includes(filters.toString().toLowerCase())
      )
    } else if (filters) {
      search_results = items.filter(item =>
        (item.full_name.toLowerCase().includes(q.toString().toLowerCase()) ||
          item.description.toLowerCase().includes(q.toString().toLowerCase())) &&
        item.topics?.every(item => q.toString().toLowerCase())
      );
    } else {
      search_results = items.filter(item =>
        item.full_name.toLowerCase().includes(q.toString().toLowerCase()) ||
        item.description.toLowerCase().includes(q.toString().toLowerCase())
      );
    }

    // -------- Return search results ---------
    return res.status(200).json(search_results);
  }

  // -------- Return no results ---------
  return res.status(200).json([]);
}
