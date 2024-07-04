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
import type { NextApiRequest, NextApiResponse } from 'next';
import analyze from "@/chatbot/chatbot_compiled"


// ============================================
//       Exports Search handler as api
// ============================================
interface resp {
    answer: string
}
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<resp>
) {

    // The query from the url parameters is extracted here.
    const { q } = req.query;

    // ----- Check q's existence -----
    if (typeof q == "string") {
        return res.status(200).json({ answer: analyze(q) });
    }

    // -------- Return no results ---------
    return res.status(200).json({ answer: "" });
}
