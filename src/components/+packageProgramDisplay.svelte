<script>
    import Card from './+card.svelte';
    import TimeAgo from 'javascript-time-ago';
    import en from 'javascript-time-ago/locale/en';
    import { Badge, Tabs, TabItem } from 'flowbite-svelte';
    import DependencyCard from './+dependencyCard.svelte';
    import DOMPurify from 'dompurify';
    import { marked } from 'marked';
    import { onMount } from 'svelte';
    import LeftMiniTitle from './+LeftMiniTitle.svelte';
    import { InfoIcon } from '@lucide/svelte';

    const data = $props();
    const provider_id = data.provider_id;

    const library_r = Object.entries(data.releases);

    TimeAgo.addDefaultLocale(en);
    let readme_content = $state('');
    function load_readme() {
        fetch(data.readme_url)
            .then((response) => {
                if (response.ok) {
                    return response.text();
                } else {
                    throw new Error('Network response was not ok');
                }
            })
            .then((data) => {
                readme_content = marked(DOMPurify.sanitize(data)).toString();
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

<LeftMiniTitle name={data.version_name + ' details'} icon={InfoIcon} />

<Badge rounded color="blue" class="mt-2 mr-0 mb-0 ml-10 text-xl"
    >Last updated: {timeAgo.format(new Date(data.publish_date))}</Badge
>

<div class="mt-3 min-h-screen p-2 sm:px-4 sm:pb-4 md:px-6 md:pb-6 lg:px-8 lg:pb-8">
    <Card
        avatar_url={data.avatar_id}
        owner_name={data.owner_name}
        repo_name={data.repo_name}
        stars={data.stars_count}
        description={data.description}
        watchers={data.watchers_count}
        forks={data.forks_count}
        issues={data.issues_count}
        provider={data.provider_id}
        spdx_id={data.license}
        minimum_zig_version={data.minimum_zig_version}
        type_of_card="special-display"
    />

    <div class="mb-10"></div>

    <Tabs tabStyle="full" class="mt-4 dark:bg-[#1e1e1e]">
        <TabItem open title="Readme" class="w-full">
            <div
                class="rounded-lg bg-white p-3 shadow-lg shadow-black sm:rounded-lg sm:p-6 dark:bg-[#1e1e1e]"
            >
                <h2
                    class="mb-3 border-b border-gray-300 pb-2 text-xl font-bold text-black sm:mb-4 sm:text-2xl dark:border-yellow-500 dark:text-white"
                >
                    Readme
                </h2>
                <div class="readmeDiv">
                    {@html readme_content}
                </div>
            </div>
        </TabItem>
        <TabItem title={'Dependencies: ' + data.dependencies.length} class="w-full">
            <div
                class="m-0 rounded-lg bg-white p-3 shadow-lg shadow-black sm:rounded-xl sm:p-6 dark:bg-[#1e1e1e]"
            >
                <h2
                    class="mb-3 border-b border-gray-300 pb-2 text-xl font-bold text-black sm:mb-4 sm:text-2xl dark:border-yellow-500 dark:text-white"
                >
                    Dependencies
                </h2>
                <div class="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {#if data.dependencies.length === 0}
                        This package has no dependencies.
                    {:else}
                        {#each data.dependencies as dependency}
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
        {#if data.show_dependents}
            <TabItem title={'Dependents: ' + data.dependents.length} class="w-full">
                <div
                    class="m-0 rounded-lg bg-white p-3 shadow-lg shadow-black sm:rounded-xl sm:p-6 dark:bg-[#1e1e1e]"
                >
                    <h2
                        class="mb-3 border-b border-gray-300 pb-2 text-xl font-bold text-black sm:mb-4 sm:text-2xl dark:border-yellow-500 dark:text-white"
                    >
                        Dependents
                    </h2>
                    <div class="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {#if data.dependents.length === 0}
                            This package has no dependents.
                        {:else}
                            {#each data.dependents as dependent}
                                {@const dependent_iter = dependent.split('/')}
                                {@const url = `https://zigistry.dev/packages/${dependent_iter[0] === 'gh' ? 'github' : 'codeberg'}/${dependent_iter[1]}/${dependent_iter[2]}`}
                                <div
                                    class="transform rounded-lg bg-gray-100 p-3 transition-all duration-300 hover:scale-102 hover:bg-gray-200 sm:p-4 dark:bg-[#2e2e2e] dark:hover:bg-slate-600"
                                >
                                    <a href={url}>{url}</a>
                                </div>
                            {/each}
                        {/if}
                    </div>
                </div>
            </TabItem>
        {/if}
        <TabItem
            title={'Versions: ' + (library_r.length ? library_r.length : 0)}
            class="tabItemClass w-full"
        >
            <div
                class="m-0 rounded-lg bg-white p-3 shadow-lg shadow-black sm:rounded-xl sm:p-6 dark:bg-[#1e1e1e]"
            >
                <h2
                    class="mb-3 border-b border-gray-300 pb-2 text-xl font-bold text-black sm:mb-4 sm:text-2xl dark:border-yellow-500 dark:text-white"
                >
                    Versions
                </h2>
                <div class="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {#if library_r.length === 0}
                        This package has no version.
                    {:else}
                        <ul class="list-inside list-disc">
                            <div class="p-4">
                                <li>
                                    <a
                                        class="underline"
                                        href="/packages/{data.provider_id === 'gh'
                                            ? 'github'
                                            : 'codeberg'}/{data.owner_name}/{data.repo_name}"
                                        >Head Branch</a
                                    >
                                </li>
                                <li>Updated at: {new Date(data.published_date)}</li>
                            </div>
                            {#each library_r as [a, b]}
                                <DependencyCard
                                    name={dependency.n}
                                    url={dependency.u}
                                    hash={dependency.h}
                                />
                                <div class="p-4">
                                    <li>
                                        <a
                                            class="underline"
                                            href="/packages/{provider_id === 'gh'
                                                ? 'github'
                                                : 'codeberg'}/{data.owner_name}/{data.repo_name}/versions/{a}"
                                            >{a}</a
                                        >
                                    </li>

                                    <li>Updated at: {new Date(b.p)}</li>
                                </div>
                            {/each}
                        </ul>
                    {/if}
                </div>
            </div>
        </TabItem>
    </Tabs>
</div>
