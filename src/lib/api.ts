import axios from 'axios';

const FALLBACK_URL = 'https://zigistry-backend.hf.space';

function resolveUrl(): string {
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

export const getApiBaseUrl = (hostname: string) => {
    if (import.meta.env.VITE_API_BASE_URL) {
        return import.meta.env.VITE_API_BASE_URL;
    }
    if (hostname === 'localhost' || hostname.includes('localhost:')) {
        return 'http://localhost:7860';
    }
    return FALLBACK_URL;
};
