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
import database_main from '@/database/main.json';

// ============================================
//       Exports infiniteScroll as api
// ============================================
export default async function infiniteScroll(
    req: NextApiRequest,
    res: NextApiResponse<Repo[]>
) {

    // The query from the url parameters is extracted here.
    const { page_number: pageNumber } = req.query;

    // ----- Check q's existence -----
    if (typeof pageNumber == 'string') {
        // -------------- Filter ------------------
        let lowerLimit = parseInt(pageNumber) * 10;
        let upperLimit = parseInt(pageNumber) * 10 + 10;
        const scrollResults = database_main.slice(lowerLimit, upperLimit);

        // -------- Return search results ---------
        return res.status(200).json(scrollResults);
    }

    // -------- Return no results ---------
    return res.status(200).json([]);
}
