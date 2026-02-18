export const prerender = true;

import { redirect } from '@sveltejs/kit';

export const load = () => {
    throw redirect(307, '/');
};
