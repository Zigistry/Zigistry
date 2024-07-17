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
import fs from 'fs';

const items: Repo[] = JSON.parse(fs.readFileSync("./database/main.json").toString());


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
