import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const mode = 'DEV';

const directives_release = {
    'default-src': ['none'],
    'script-src': ['self'],
    'style-src': ['self'],
    'img-src': ['self', 'data:', 'https://avatars.githubusercontent.com', 'https://codeberg.org'],
    'connect-src': [
        '*',
        'https://raw.githubusercontent.com',
        'https://rohanvashisht-zigistrybackend.hf.space',
        'https://api.github.com',
        'http://localhost:7860'
    ],
    'font-src': ['self'],
    'object-src': ['none'],
    'base-uri': ['self'],
    'form-action': ['self'],
    'frame-ancestors': ['self'],
    'frame-src': ['self', 'https://www.youtube.com', 'https://www.youtube-nocookie.com'],
    'upgrade-insecure-requests': true
};

const directives = mode != 'DEV' ? directives_release : {};

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: vitePreprocess(),

    kit: {
        csp: {
            mode: 'hash',
            directives
        },
        prerender: {
            entries: ['/', '/programs', '/graph', '/about', '/help'],
            handleHttpError: 'warn',
            handleUnseenRoutes: 'warn'
        },

        adapter: adapter({
            pages: './cloudflare/build',
            assets: './cloudflare/build',
            fallback: '404.html'
        })
    }
};

export default config;
