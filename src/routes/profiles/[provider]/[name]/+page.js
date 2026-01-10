export const prerender = true

import { error } from '@sveltejs/kit';
import database from '../../../../database.json';

export const load = ({ params }) => {
    let { provider, name } = params;
    provider = provider.toLowerCase();
    const owner_name = name.toLowerCase();
    if (provider !== 'github' && provider !== 'codeberg') {
        throw error(404, 'Unknown provider:' + provider);
    }   
    if((provider === 'github' ? 'gh/' : 'cb/') + owner_name in database.users){
        const user = database.users[owner_name];
        return { provider, owner_name, user };
    }
    // if (provider === 'github') {
    //     for (const [name, user] of Object.entries(database.users)) {
    //         const name_to_check = name.split('/');
    //         if (name_to_check[0] === 'gh' && name_to_check[1] === owner_name) {
    //             return { provider, owner_name, user };
    //         }
    //     }
    // } else {
    //     for (const [name, user] of Object.entries(database.users)) {
    //         const name_to_check = name.split('/');
    //         if (name_to_check[0] === 'cb' && name_to_check[1] === owner_name) {
    //             return { provider, owner_name, user };
    //         }
    //     }
    // }
    throw error(404, `Unable to find ${owner_name} at ${provider}`);
};
