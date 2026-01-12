export const prerender = true;

import { error } from '@sveltejs/kit';
import database from '../../../../../database.json';

export const load = ({ params }) => {
    let { provider, owner_name, repo_name } = params;
    provider = provider.toLowerCase();
    if (provider !== 'github' && provider !== 'codeberg') {
        throw error(404, 'Unknown provider:' + provider);
    }
    const provider_id = provider === 'github' ? 'gh' : 'cb';
    const complete_correct_name = `${provider_id}/${owner_name}/${repo_name}`.toLowerCase();
    if (complete_correct_name in database.packages) {
        const value = database.packages[complete_correct_name];
        return { complete_correct_name, value, provider_id };
    }
    throw error(404, `Unable to find ${owner_name} at ${provider}`);
};
