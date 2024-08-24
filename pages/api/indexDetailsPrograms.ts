import Repo from '@/types/customTypes';
import type { NextApiRequest, NextApiResponse } from 'next';
import databaseMain from '@/database/programs.json';
export default async function indexDetailsPrograms(
    req: NextApiRequest,
    res: NextApiResponse<Repo[]>
) {
    const { section, range } = req.query;
    if (!section || typeof section !== "string" || !range || typeof range !== "string") {
        return res.status(400).json([]);
    }
    const ranger = range.split("..");
    const ll = parseInt(ranger[0]);
    const ul = parseInt(ranger[1]);

    if(section == "mostUsed"){
        return res.status(400).json(databaseMain.slice().sort((a, b) =>
            b.stargazers_count - a.stargazers_count
          ).slice(ll, ul));
    } else if (section == "latestRepos") {
        const sortedRepos = databaseMain.slice().sort((a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        return res.status(400).json(sortedRepos.slice(ll, ul));
    }

    return res.status(400).json([]);
}
