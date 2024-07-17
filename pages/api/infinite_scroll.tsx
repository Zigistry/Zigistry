/*===============================================================================*/
/*          Infinite scrolling Algorithm API "/api/infinite_scroll"              */
/*===============================================================================*/

/*
 | Author:
 | Rohan Vashisht
 |
 | Details:
 | This api implements algorithm for infinite scrolling.
 | The search query is expected to be received like this:
 | /api/search?page_number=1
 | Please check license file for copyright details.
 */

// ===================
//       Imports
// ===================

// --------- Types -----------
import Repo from '@/types/custom_types';
import type { NextApiRequest, NextApiResponse } from 'next';


// ============================================
//       Exports infiniteScroll as api
// ============================================
export default async function infiniteScroll(
    req: NextApiRequest,
    res: NextApiResponse<Repo[]>
) {

    // The query from the url parameters is extracted here.
    const { page_number } = req.query;

    // ----- Check q's existence -----
    if (typeof page_number == 'string') {

        // -------------- Fetch -------------------
        const response = await fetch("https://raw.githubusercontent.com/RohanVashisht1234/zigistry/main/database/main.json");
        if (!response.ok) throw new Error(`Error: ${response.statusText}`);
        const items: Repo[] = await response.json();

        // -------------- Filter ------------------
        let lower_limit = parseInt(page_number) * 10;
        let upper_limit = parseInt(page_number) * 10 + 11;
        const search_results = items.slice(lower_limit, upper_limit);

        // -------- Return search results ---------
        return res.status(200).json(search_results);
    }

    // -------- Return no results ---------
    return res.status(200).json([]);
}
