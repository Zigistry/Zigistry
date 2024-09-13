//!===============================================================
//!  Provide details of "/" as api: "/api/indexDetailsPackages"
//!===============================================================
//!	Author  : Rohan Vashisht
//! License : Please check license file
//! Details : This api is used to get the details available on
//! the "/" route. (This API is not used by Zigistry, but only
//! for other users/applications).
//!===============================================================

// ===================
//       Imports
// ===================

// ----------- Types -----------
import Repo from "@/types/customTypes";
import type { NextApiRequest, NextApiResponse } from "next";

// ----------- Database -----------
import databaseMain from "@/database/main.json";

// =========================================
//    Exports "/api/indexDetailsPackages"
// =========================================
export default async function indexDetails(
  req: NextApiRequest,
  res: NextApiResponse<Repo[]>,
) {
  const { section, range } = req.query;
  if (
    !section ||
    typeof section !== "string" ||
    !range ||
    typeof range !== "string"
  ) {
    return res.status(400).json([]);
  }
  const ranger = range.split("..");
  const lowerLimit = parseInt(ranger[0]);
  const upperLimit = parseInt(ranger[1]);

  if (section == "mostUsed") {
    return res.status(400).json(databaseMain.slice(lowerLimit, upperLimit));
  } else if (section == "latestRepos") {
    const sortedRepos = databaseMain
      .slice()
      .sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      );
    return res.status(400).json(sortedRepos.slice(lowerLimit, upperLimit));
  }

  return res.status(400).json([]);
}
