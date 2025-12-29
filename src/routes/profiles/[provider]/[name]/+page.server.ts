import { error } from "@sveltejs/kit";

export const load = ({ params }) => {
  const {_provider, _name} = params;
  const provider = _provider.toLowerCase();
  const owner_name = _name.toLowerCase();
    if(provider !== "github" && provider !== "codeberg") {
      throw error(404, "Unknown provider:" + provider);
    }
    return {provider, owner_name};
}
