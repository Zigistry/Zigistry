import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch }) => {
  try {
    const response = await fetch(
      "https://rohanvashisht-zigistrybackend.hf.space/programIndexDetails",
    );
    const data = await response.json();

    return {
      top_10_latest_repos: data.latest || [],
      most_used: data.most_used || [],
    };
  } catch (error) {
    return {
      top_10_latest_repos: [],
      most_used: [],
    };
  }
};
