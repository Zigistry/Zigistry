export const prerender = true;

import { error } from '@sveltejs/kit';
import database from '../../../../database.json';

export const load = ({ params }) => {
    let { provider, name } = params;
    provider = provider.toLowerCase();
    const owner_name = name.toLowerCase();

    if (provider !== 'github' && provider !== 'codeberg') {
        throw error(404, 'Unknown provider:' + provider);
    }

    const provider_id = provider === 'github' ? 'gh' : 'cb';

    const owner_name_key = provider_id + '/' + owner_name;

    const owner_details = database.users[owner_name_key];

    if (!owner_details) {
        throw error(404, `Unable to find ${owner_name} at ${provider}`);
    }

    const packages_from_owner = Object.entries(database.packages).filter(([pkg_name, pkg]) => {
        const splitted = pkg_name.split('/');
        return splitted[0] === provider_id && splitted[1] === owner_name;
    });

    const programs_from_owner = Object.entries(database.programs).filter(([pkg_name, pkg]) => {
        const splitted = pkg_name.split('/');
        return splitted[0] === provider_id && splitted[1] === owner_name;
    });

    const avatar_url =
        (provider_id === 'gh'
            ? 'https://avatars.githubusercontent.com/'
            : 'https://codeberg.org/avatars/') + owner_details.a;

    const owner_provider_link =
        (provider_id === 'gh' ? 'https://github.com/' : 'https://codeberg.org/') + owner_name;
    return {
        owner_name,
        owner_details,
        packages_from_owner,
        programs_from_owner,
        provider_id,
        avatar_url,
        owner_provider_link
    };
};
