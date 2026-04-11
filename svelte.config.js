import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: vitePreprocess(),

    kit: {
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
