<script>
    import Card from '../../../../../../../components/+card.svelte';
    import { Tabs, TabItem } from 'flowbite-svelte';
    import DOMPurify from 'dompurify';
    import { load } from './+page.js';
    import { marked } from 'marked';
    import { onMount } from 'svelte';
    const { data } = $props();
    const key = data.complete_correct_name;
    const value = data.value;
    const provider_id = data.provider_id;
    const name_splitted = key.split('/');
    const library = value;

    let readme_content = $state('');

    const library_r = Object.entries(library.r);

    function load_readme() {
        fetch(library.dbi.r)
            .then((response) => {
                if (response.ok) {
                    return response.text();
                } else {
                    throw new Error('Network response was not ok');
                }
            })
            .then((data) => {
                readme_content = marked(DOMPurify.sanitize(data.r[data.version]));
            })
            .catch((error) => {
                console.error('There has been a problem with your fetch operation:', error);
                readme_content = 'No readme available.';
            });
    }

    onMount(() => {
        load_readme();
    });

</script>

{#if provider_id === 'gh'}
    <Card
        avatar_url={'https://avatars.githubusercontent.com/' + name_splitted[1]}
        owner_name={name_splitted[1]}
        repo_name={name_splitted[2]}
        stars={library.s}
        description={library.d}
        watchers={library.w}
        forks={library.f}
        issues={library.i}
        provider="gh"
        spdx_id={library.l}
        minimum_zig_version={library.r[data.version].m}
        type_of_card="special-display"
    />
{:else if provider_id === 'cb'}
    <Card
        avatar_url={'https://codeberg.org/avatars/' + library.a}
        owner_name={name_splitted[1]}
        repo_name={name_splitted[2]}
        description={library.d}
        watchers={library.w}
        stars={library.s}
        forks={library.f}
        issues={library.i}
        minimum_zig_version={library.r[data.version].m}
        provider="cb"
        spdx_id={library.l}
        type_of_card="special-display"
    />
{/if}

<h1>Currently viewing: Version: {data.version}</h1>

<Tabs>
    <TabItem open title="Readme">
        <p class="text-sm text-gray-500 dark:text-gray-400">
            {@html readme_content}
        </p>
    </TabItem>
    <TabItem title="Dependencies">
        <div class="text-sm text-gray-500 dark:text-gray-400">
            {#if library.dbi.d.length === 0}
                This package has no dependencies.
            {:else}
                <ul class="list-inside list-disc">
                    {#each library.r[data.version].d as dependency}
                        <div class="p-4">
                            <li>{dependency.n}</li>
                            <li>{dependency.h}</li>
                            <li>{dependency.u}</li>
                        </div>
                    {/each}
                </ul>
            {/if}
        </div>
    </TabItem>
    <TabItem title="Versions">
        <div class="text-sm text-gray-500 dark:text-gray-400">
            {#if library_r.length === 0}
                This package has no version.
            {:else}
                <ul class="list-inside list-disc">
                    <div class="p-4">
                          <li><a class="underline" href="/packages/{provider_id === 'gh' ? 'github' : 'codeberg'}/{name_splitted[1]}/{name_splitted[2]}">Head Branch</a></li>
                            <li>Updated at: {new Date(library.p)}</li>
                        </div>  
                    {#each library_r as [a, b]}
                        <div class="p-4">
                          <li><a class="underline" href="/packages/{provider_id === 'gh' ? 'github' : 'codeberg'}/{name_splitted[1]}/{name_splitted[2]}/versions/{a}">{a}</a></li>

                            <li>Updated at: {new Date(b.p)}</li>
                        </div>  
                    {/each}
                </ul>
            {/if}
        </div>
    </TabItem>
</Tabs>
