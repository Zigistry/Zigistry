import type { PageLoad } from './$types';
import { getApiBaseUrl } from '$lib/api';

export const load: PageLoad = async ({ fetch, url, params }) => {
    const provider_id = params.provider === 'github' ? 'gh' : 'cb';
    const provider = params.provider === 'github' ? 'GitHub' : 'Codeberg';

    const complete_correct_name =
        `${provider_id}/${params.owner_name}/${params.repo_name}`.toLowerCase();

    try {
        const res = await fetch(
            `${getApiBaseUrl(url.hostname)}/programs?q=${complete_correct_name}`
        );
        const library = await res.json();

        return {
            library,
            provider_id,
            provider
        };
    } catch (error) {
        return {
            library: null,
            provider_id,
            provider
        };
    }
};
