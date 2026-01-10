import { error } from '@sveltejs/kit';
import database from '../../../../../database.json';

export const load = ({ params }) => {
    let { provider, owner_name, repo_name } = params;
    provider = provider.toLowerCase();
    const name = owner_name.toLowerCase().split('/');
    if (provider !== 'github' && provider !== 'codeberg') {
        throw error(404, 'Unknown provider:' + provider);
    }
    const provider_id = name[0] === 'github' ? 'gh' : 'cb';
    const complete_correct_name = `${provider_id}/${name[1]}/${name[2]}`;
    if (complete_correct_name in database.packages) {
        const value = database.packages[complete_correct_name];
        return { complete_correct_name, value };
    }
    throw error(404, `Unable to find ${owner_name} at ${provider}`);
};
