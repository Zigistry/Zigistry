import axios from 'axios';

const FALLBACK_URL = 'https://api.zigistry.dev';

function resolveUrl() {
    if (import.meta.env.VITE_API_BASE_URL) {
        return import.meta.env.VITE_API_BASE_URL;
    }
    return FALLBACK_URL;
}

const BASE_URL = resolveUrl();

export const api = axios.create({
    baseURL: BASE_URL,
    timeout: 30000
});

export const endpoints = {
    users: () => `${BASE_URL}/users/`,
    packageIndexDetails: () => `${BASE_URL}/packageIndexDetails/`,
    programIndexDetails: () => `${BASE_URL}/programIndexDetails/`,
    programs: () => `${BASE_URL}/programs/`,
    packages: () => `${BASE_URL}/packages/`
};

export const getApiBaseUrl = (hostname) => {
    if (import.meta.env.VITE_API_BASE_URL) {
        return import.meta.env.VITE_API_BASE_URL;
    }
    if (hostname === 'localhost' || hostname?.includes('localhost:')) {
        return 'http://localhost:7860';
    }
    return FALLBACK_URL;
};

export function get_the_actual_avatar_url(provider, avatarId) {
    if (!avatarId) return '';

    if (avatarId.startsWith('http')) {
        return avatarId;
    }

    if (provider === 'cb' || provider === 'codeberg') {
        return `https://codeberg.org/avatars/${avatarId}`;
    }

    return `https://avatars.githubusercontent.com/${avatarId}`;
}

export function parseDate(timestamp) {
    if (!timestamp) return null;

    const number = Number(timestamp);

    if (!isNaN(number)) {
        return new Date(number < 10000000000 ? number * 1000 : number);
    }

    const date = new Date(timestamp);

    return isNaN(date.getTime()) ? null : date;
}