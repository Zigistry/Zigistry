import type { PageLoad } from './$types';
import { getApiBaseUrl } from '$lib/api';

export const load: PageLoad = async ({ url }) => {
    return {
        apiBaseUrl: getApiBaseUrl(url.hostname)
    };
};
