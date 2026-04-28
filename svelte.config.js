import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: vitePreprocess(),

    kit: {
        csp: {
            mode: 'hash',
            directives: {
                'default-src': ['none'],
                'script-src': ['self'],
                'style-src': ['self'],
                'img-src': ['self', 'data:', 'https://avatars.githubusercontent.com', 'https://codeberg.org'],
                'connect-src': ['self', 'https://raw.githubusercontent.com', 'https://rohanvashisht-zigistrybackend.hf.space', 'https://api.github.com'],
                'font-src': ['self'],
                'object-src': ['none'],
                'base-uri': ['self'],
                'form-action': ['self'],
                'frame-ancestors': ['self'],
                'frame-src': ['self', 'https://www.youtube.com', 'https://www.youtube-nocookie.com'],
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
