import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params, fetch }) => {
  const provider_id = params.provider === "github" ? "gh" : "cb";
  const provider = params.provider === "github" ? "GitHub" : "Codeberg";
  const version = params.version;

  const complete_correct_name =
    `${provider_id}/${params.owner_name}/${params.repo_name}`.toLowerCase();

  try {
    const res = await fetch(
      `https://rohanvashisht-zigistrybackend.hf.space/packages?q=${complete_correct_name}&version=${version}`,
    );
    const library = await res.json();

    return {
      library,
      provider_id,
      provider,
      version,
    };
  } catch (error) {
    return {
      library: null,
      provider_id,
      provider,
      version,
    };
  }
};
