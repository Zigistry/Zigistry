import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import res from './src/database.json' with { type: 'json' };

// WOOOOOH! Now, I need to make the entries:

let out = [];
// Since when package was a keyword?
for (const [name, package_thing] of Object.entries(res['packages'])) {
    const iter = name.split('/');
    const provider = iter[0] === 'gh' ? 'github' : 'codeberg';
    out.push(`/packages/${provider}/${iter[1]}/${iter[2]}`);
    if (!package_thing.r) continue;
    for (const [version_name, version] of Object.entries(package_thing.r)) {
        out.push(`/packages/${provider}/${iter[1]}/${iter[2]}/versions/${version_name}`);
    }
}

for (const [name, program] of Object.entries(res['users'])) {
    const iter = name.split('/');
    const provider = iter[0] === 'gh' ? 'github' : 'codeberg';
    out.push(`/profiles/${provider}/${iter[1]}`);
}

for (const [name, program] of Object.entries(res['programs'])) {
    const iter = name.split('/');
    const provider = iter[0] === 'gh' ? 'github' : 'codeberg';
    out.push(`/programs/${provider}/${iter[1]}/${iter[2]}`);
    if (!program.r) continue;
    for (const [version_name, version] of Object.entries(program.r)) {
        out.push(`/programs/${provider}/${iter[1]}/${iter[2]}/versions/${version_name}`);
    }
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Consult https://svelte.dev/docs/kit/integrations
    // for more information about preprocessors
    preprocess: vitePreprocess(),

    kit: {
        // adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
        // If your environment is not supported, or you settled on a specific environment, switch out the adapter.
        // See https://svelte.dev/docs/kit/adapters for more information about adapters.
        adapter: adapter({
            pages: './cloudflare/build',
            assets: './cloudflare/build'
        }),
        prerender: {
            crawl: false,
            entries: [
                ...out,
                '/',
                '/programs',
                '/about',
                '/apps',
                '/advancedSearch',
                '/help',
                '/statistics',
                '/packages',
                '/API-docs'
            ],
            handleHttpError: 'ignore'
        }
    }
};

export default config;
