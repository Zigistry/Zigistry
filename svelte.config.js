import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: vitePreprocess(),

    kit: {
        csp: {
            mode: 'hash',
            directives: {
                'default-src': ['self'],
                'script-src': ['self'],
                'style-src': ['self', 'unsafe-inline'],
                'img-src': ['self', 'data:', 'https://avatars.githubusercontent.com', 'https://codeberg.org'],
                'connect-src': ['self', 'https://rohanvashisht-zigistrybackend.hf.space', 'https://api.github.com', 'http://localhost:*', 'ws://localhost:*'],
                'font-src': ['self'],
                'object-src': ['none'],
                'base-uri': ['self'],
                'form-action': ['self'],
                'frame-ancestors': ['none'],
                'frame-src': ['self', https://www.youtube.com', 'https://www.youtube-nocookie.com'],
                    'upgrade-insecure-requests': true
            }
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
