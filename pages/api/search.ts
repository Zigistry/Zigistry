import Repo from '@/types/custom_types';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Repo[]>
) {
  const { q } = req.query;

  if (q) {
    const response = await fetch("https://raw.githubusercontent.com/RohanVashisht1234/zigistry/main/database/main.json");
    if (!response.ok) throw new Error(`Error: ${response.statusText}`);
    const items: Repo[] = await response.json();
    return res.status(200).json(items.filter(item =>
      item.full_name.toLowerCase().includes(q.toString().toLowerCase()) ||
      item.description.toLowerCase().includes(q.toString().toLowerCase())
    ));
  }
  return res.status(200).json([]);
}
