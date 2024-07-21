/*===============================================================================*/
/*          Infinite scrolling Algorithm API "/api/infiniteScroll"               */
/*===============================================================================*/

/*
 | Author:
 | Rohan Vashisht
 |
 | Details:
 | This api implements algorithm for infinite scrolling.
 | The search query is expected to be received like this:
 | /api/search?pageNumber=1
 |
 | License:
 | Please check license file for copyright details.
 */

// ===================
//       Imports
// ===================

// --------- Types -----------
import Repo from '@/types/customTypes';
import type { NextApiRequest, NextApiResponse } from 'next';
import databaseMain from '@/database/main.json';

// =========================================
//       Exports "/api/infiniteScroll"
// =========================================
export default async function infiniteScroll(
    req: NextApiRequest,
    res: NextApiResponse<Repo[]>
) {
    // Extract and parse the page number from the query parameters.
    const pageNumber = parseInt(req.query.pageNumber as string, 10);

    // Check if pageNumber is a valid number.
    if (!isNaN(pageNumber) && pageNumber >= 0) {
        // Calculate the slice indices.
        const lowerLimit = pageNumber * 10;

        // Slice the array to get the results.
        const scrollResults = databaseMain.slice(lowerLimit, lowerLimit + 10);

        return res.status(200).json(scrollResults);
    }
    return res.status(400).json([]);
}
