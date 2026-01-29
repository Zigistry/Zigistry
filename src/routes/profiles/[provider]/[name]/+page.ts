import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch, params: parameters }) => {
  const provider_id = parameters.provider === "github" ? "gh" : "cb";
  const user_query = `${provider_id}/${parameters.name}`;
  const res = await fetch(
    `https://rohanvashisht-zigistrybackend.hf.space/users/?q=${user_query}`,
  );
  const owner_data = await res.json();

  const avatar_url =
    (provider_id === "gh"
      ? "https://avatars.githubusercontent.com/"
      : "https://codeberg.org/avatars/") + owner_data.avatar_id;

  const owner_provider_link =
    (provider_id === "gh" ? "https://github.com/" : "https://codeberg.org/") +
    parameters.name;

  return {
    owner_name: parameters.name,
    owner_details: owner_data.bio,
    packages_from_owner: owner_data.packages || [],
    programs_from_owner: owner_data.programs || [],
    provider_id,
    avatar_url,
    owner_provider_link,
  };
};
