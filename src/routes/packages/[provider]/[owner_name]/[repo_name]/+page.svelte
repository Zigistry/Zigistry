<script>
    import Card from '../../../../../components/+card.svelte';
    import TimeAgo from 'javascript-time-ago';
    import en from 'javascript-time-ago/locale/en';
    import { Badge } from 'flowbite-svelte';

    TimeAgo.addDefaultLocale(en);
    import DependencyCard from '../../../../../components/+dependencyCard.svelte';
    import { Tabs, TabItem } from 'flowbite-svelte';
    import DOMPurify from 'dompurify';
    import { load } from './+page.js';
    import { marked } from 'marked';
    import { onMount } from 'svelte';
    import LeftMiniTitle from '../../../../../components/+LeftMiniTitle.svelte';
    import { InfoIcon } from '@lucide/svelte';
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
                readme_content = marked(DOMPurify.sanitize(data));
            })
            .catch((error) => {
                console.error('There has been a problem with your fetch operation:', error);
                readme_content = 'No readme available.';
            });
    }

    const timeAgo = new TimeAgo('en-US');

    onMount(() => {
        load_readme();
    });
</script>

<LeftMiniTitle name={library.db + ' branch details'} icon={InfoIcon} />

<Badge rounded color="blue" class="mb-0 mt-2 ml-10 mr-0 text-xl"
    >Last updated: {timeAgo.format(new Date(library.p))}</Badge
>

{#if library.s != 0}
<Badge rounded color="indigo" class="mb-0 mt-2 ml-10 text-xl"
    >Size: {library.s} KB</Badge
>
{/if}

<div class="mt-3 min-h-screen p-2 sm:px-4 sm:pb-4 md:px-6 md:pb-6 lg:px-8 lg:pb-8">
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
            minimum_zig_version={library.dbi.m}
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
            minimum_zig_version={library.dbi.m}
            provider="cb"
            spdx_id={library.l}
            type_of_card="special-display"
        />
    {/if}

    <div class="mb-10"></div>

    <Tabs tabStyle="full" class="mt-4 dark:bg-[#1e1e1e]">
        <TabItem open title="Readme" class="w-full">
            <div
                class="rounded-lg bg-white p-3 shadow-lg shadow-black sm:rounded-lg sm:p-6 dark:bg-[#1e1e1e]"
            >
                <h2
                    class="mb-3 border-b border-gray-300 pb-2 text-xl font-bold text-black sm:mb-4 sm:text-2xl dark:border-yellow-500 dark:text-white"
                >
                    README
                </h2>
                {@html readme_content}
            </div>
        </TabItem>
        <TabItem title={"Dependencies: " + library.dbi.d.length} class="w-full">
            <div
                class="rounded-lg bg-white p-3 shadow-lg shadow-black sm:rounded-xl sm:p-6 dark:bg-[#1e1e1e]"
            >
                <div class="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {#if library.dbi.d.length === 0}
                        This package has no dependencies.
                    {:else}
                        {#each library.dbi.d as dependency}
                            <DependencyCard
                                name={dependency.n}
                                url={dependency.u}
                                hash={dependency.h}
                            />
                        {/each}
                    {/if}
                </div>
            </div>
        </TabItem>
        <TabItem title={"Dependents: " + library.dts.length} class="w-full">
            <div class="text-sm text-gray-500 dark:text-gray-400">
                {#if library.dts.length === 0}
                    This package has no Dependents.
                {:else}
                    <ul class="list-inside list-disc">
                        {#each library.dts as dependent}
                            <div class="p-4">
                                <li>{dependent}</li>
                            </div>
                        {/each}
                    </ul>
                {/if}
            </div>
        </TabItem>
        <TabItem title={"Versions: " + (library.r.length ? library.r.length : 0)} class="w-full">
            <div class="text-sm text-gray-500 dark:text-gray-400">
                {#if library_r.length === 0}
                    This package has no version.
                {:else}
                    <ul class="list-inside list-disc">
                        <div class="p-4">
                            <li>
                                <a
                                    class="underline"
                                    href="/packages/{provider_id === 'gh'
                                        ? 'github'
                                        : 'codeberg'}/{name_splitted[1]}/{name_splitted[2]}"
                                    >Head Branch</a
                                >
                            </li>
                            <li>Updated at: {new Date(library.p)}</li>
                        </div>
                        {#each library_r as [a, b]}
                            <div class="p-4">
                                <li>
                                    <a
                                        class="underline"
                                        href="/packages/{provider_id === 'gh'
                                            ? 'github'
                                            : 'codeberg'}/{name_splitted[1]}/{name_splitted[2]}/versions/{a}"
                                        >{a}</a
                                    >
                                </li>

                                <li>Updated at: {new Date(b.p)}</li>
                            </div>
                        {/each}
                    </ul>
                {/if}
            </div>
        </TabItem>
    </Tabs>
</div>
