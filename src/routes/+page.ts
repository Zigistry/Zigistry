import type { PageLoad } from './$types';
import { getApiBaseUrl } from '$lib/api';

export const prerender = true;

export const load: PageLoad = async ({ fetch, url }) => {
    try {
        const response = await fetch(
            `${getApiBaseUrl(url.hostname)}/packageIndexDetails`
        );
        const data = await response.json();

        return {
            top_10_latest_repos: data.latest || [],
            most_used: data.most_used || [],
            games: data.games || [],
            gui: data.gui || [],
            web: data.web || []
        };
    } catch (error) {
        return {
            top_10_latest_repos: [],
            most_used: [],
            games: [],
            gui: [],
            web: []
        };
    }
};
