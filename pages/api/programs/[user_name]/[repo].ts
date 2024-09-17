//!===============================================================
//!  Package repo details API "/api/programs/:username/:repoName"
//!===============================================================
//!	Author  : Rohan Vashisht
//! License : Please check license file
//! Details : This API shows details for a specific repository
//! which is a program registered on zigistry.
//! Format : /api/programs/:username/:repoName
//!===============================================================

// ===================
//       Imports
// ===================

// --------- Types -----------
import Repo from "@/types/customTypes";
import type { NextApiRequest, NextApiResponse } from "next";
import mainDatabase from "@/database/programs.json";

// ===============================================
//   Exports "/api/programs/:username/:reponame"
// ===============================================
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
