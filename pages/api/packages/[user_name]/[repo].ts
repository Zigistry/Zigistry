//!===============================================================
//!         Search Engine Algorithm API "/api/search"
//!===============================================================
//!	Author  : Rohan Vashisht
//! License : Please check license file
//! Details : This api implements algorithm for search.
//! The search query is expected to be received like this:
//! /api/search?q=Search%20Query
//!===============================================================

// ===================
//       Imports
// ===================

// --------- Types -----------
import Repo, { placeHolderRepoType } from "@/types/customTypes";
import type { NextApiRequest, NextApiResponse } from "next";
import mainDatabase from "@/database/main.json";

// =========================================
//       Exports "/api/search"
// =========================================
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Repo | null>,
) {
    const { user_name, repo } = req.query;

    if(!user_name || typeof user_name !== "string" || !repo || typeof repo !== "string"){
        return res.status(200).json(null);
    }
    const full_name = user_name.toLowerCase() + "/" + repo.toLowerCase();

    const searchResults = mainDatabase.filter((item) => {
        return item.full_name.toLowerCase() == full_name;
    });

    return res.status(200).json(searchResults[0]);
}
