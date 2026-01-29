export const prerender = false;
import { error } from "@sveltejs/kit";

export const load = async ({ params, fetch }) => {
  let { provider, owner_name, repo_name } = params;
  provider = provider.toLowerCase();
  if (provider !== "github" && provider !== "codeberg") {
    throw error(404, "Unknown provider:" + provider);
  }
  const provider_id = provider === "github" ? "gh" : "cb";
  const complete_correct_name = `${provider_id}/${owner_name}/${repo_name}`
    .toLowerCase();

  try {
    const response = await fetch(
      `http://localhost:8000/packages?q=${complete_correct_name}`,
    );
    if (!response.ok) {
      throw error(
        response.status,
        `Unable to find ${owner_name}/${repo_name} at ${provider}`,
      );
    }
    const value = await response.json();
    return { complete_correct_name, value, provider_id };
  } catch (e) {
    throw error(
      404,
      `Unable to find ${owner_name}/${repo_name} at ${provider}`,
    );
  }
};
