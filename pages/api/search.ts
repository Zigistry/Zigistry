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
import Repo from "@/types/custom_types";
import type { NextApiRequest, NextApiResponse } from "next";
import mainDatabase from "@/database/main.json";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Repo[]>,
) {
    const { q, filter } = req.query;

    // Check if the query parameter `q` exists and is a string
    if (!q || typeof q !== "string") {
        return res.status(200).json([]);
    }

    const query = q.toLowerCase();

    // Filter the main database based on the query and optional filters
    const searchResults = mainDatabase.filter((item) => {
        const fullNameMatch = item.full_name.toLowerCase().includes(query);
        const descriptionMatch = item.description.toLowerCase().includes(query);

        if (!fullNameMatch && !descriptionMatch) {
            return false;
        }

        if (typeof filter === "string") {
            return item.topics?.includes(filter.toString().toLowerCase());
        }

        return true;
    });

    return res.status(200).json(searchResults);
}
