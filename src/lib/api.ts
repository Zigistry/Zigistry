import axios from 'axios';

const BASE_URL = 'https://rohanvashisht-zigistrybackend.hf.space';

export const api = axios.create({
    baseURL: BASE_URL,
    timeout: 30000,
});

export const endpoints = {
    users: () => `${BASE_URL}/users`,
    packageIndexDetails: () => `${BASE_URL}/packageIndexDetails`,
    programIndexDetails: () => `${BASE_URL}/programIndexDetails`,
    programs: () => `${BASE_URL}/programs`,
    packages: () => `${BASE_URL}/packages`,
};

export const getApiBaseUrl = (hostname: string) => {
    if (hostname === 'localhost' || hostname.includes('localhost:')) {
        return 'http://localhost:7860';
    }
    return BASE_URL;
};