import type { PageLoad } from './$types';
import { getApiBaseUrl } from '$lib/api';

export const prerender = true;

export const load: PageLoad = async ({ fetch, url }) => {
    try {
        const response = await fetch(
            `${getApiBaseUrl(url.hostname)}/programIndexDetails`
        );
        const data = await response.json();

        return {
            top_10_latest_repos: data.latest || [],
            most_used: data.most_used || []
        };
    } catch (error) {
        return {
            top_10_latest_repos: [],
            most_used: []
        };
    }
};
