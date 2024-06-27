import Repo from '@/types/custom_types';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Repo[]>
) {
  const q: string | string[] | undefined = req.query.q;

  if (q) {
    const response = await fetch("https://raw.githubusercontent.com/RohanVashisht1234/zigistry/main/database/main.json");
    if (!response.ok) throw new Error(`Error: ${response.statusText}`);
    const items: Repo[] = await response.json();
    const my_list: Repo[] = items
      .map(({ name, full_name, created_at, description, owner, stargazers_count, watchers_count, forks_count, open_issues, tags_url }) => ({
        name, full_name, created_at, description, owner: { avatar_url: owner.avatar_url }, stargazers_count, watchers_count, forks_count, open_issues, tags_url
      }))
      .filter(item => item.name.includes(q.toString()));
    return res.status(200).json(my_list);
  }
  return res.status(200).json([]);
}
