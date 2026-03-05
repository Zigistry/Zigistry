import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: vitePreprocess(),

    kit: {
        prerender: {
            entries: ['*']
        },

        adapter: adapter({
            pages: './cloudflare/build',
            assets: './cloudflare/build',
            fallback: 'index.html'
        })
    }
};

export default config;
