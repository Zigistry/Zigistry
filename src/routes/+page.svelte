<script lang="ts">
    import type { PageData } from './$types';
    import LeftMiniTitle from '../components/+LeftMiniTitle.svelte';
    import Card from '../components/+card.svelte';
    import Infinite_Scroll from '../components/+InfiniteScroll.svelte';
    import SearchSortSidebar from '../components/+SearchSortSidebar.svelte';
    import { Rocket } from '@lucide/svelte';

    import { search_results, show_default, search_query } from '$lib/stores';

    let { data }: { data: PageData } = $props();
    let original_results: any[] = [];
    const MAXIMUM_SEARCH_ALLOWED_PER_PAGE = 12;
    let current_search_page = $state(1);
    let search_total_pages = $state(0);
    let search_total_results = $state(0);
    let active_sort_kind_of_filter = $state('intelligent');

    function get_sorted_results(results: any[], kind_of_filter: string) {
        if (kind_of_filter === 'intelligent') {
            return [...results];
        }

        return [...results].sort((a, b) => {
            switch (kind_of_filter) {
                case 'stars':
                    return (b.stargazer_count || 0) - (a.stargazer_count || 0);
                case 'dependents':
                    return (b.dependents_count || 0) - (a.dependents_count || 0);
                case 'recently_updated':
                    return new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime();
                case 'newly_added':
                    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
                case 'oldest':
                    return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
                case 'a_z':
                    return (a.repo_name || '').localeCompare(b.repo_name || '');
                case 'z_a':
                    return (b.repo_name || '').localeCompare(a.repo_name || '');
                case 'forks':
                    return (b.fork_count || 0) - (a.fork_count || 0);
                case 'issues_desc':
                    return (b.issues_count || 0) - (a.issues_count || 0);
                case 'issues_ascending':
                    return (a.issues_count || 0) - (b.issues_count || 0);
                case 'zig_descending_version':
                    return (b.minimum_zig_version || '0.0.0').localeCompare(
                        a.minimum_zig_version || '0.0.0',
                        undefined,
                        { numeric: true }
                    );
                case 'zig_ascending_version':
                    return (a.minimum_zig_version || '0.0.0').localeCompare(
                        b.minimum_zig_version || '0.0.0',
                        undefined,
                        { numeric: true }
                    );
                default:
                    return 0;
            }
        });
    }

    async function load_search_results(page: number, query_override?: string) {
        const active_query = (query_override ?? $search_query).trim().toLowerCase();
        if (active_query === '') {
            return;
        }

        const result_data = await fetch(
            'https://rohanvashisht-zigistrybackend.hf.space/search/packages?' +
                new URLSearchParams({
                    q: active_query,
                    page: String(page),
                    per_page: String(MAXIMUM_SEARCH_ALLOWED_PER_PAGE)
                }).toString()
        );
        const result = await result_data.json();
        const items = Array.isArray(result?.items) ? result.items : [];

        original_results = [...items];
        $search_results = get_sorted_results(original_results, active_sort_kind_of_filter);
        search_total_results = typeof result?.total === 'number' ? result.total : items.length;
        search_total_pages =
            typeof result?.total_pages === 'number' ? result.total_pages : items.length > 0 ? 1 : 0;
        current_search_page = typeof result?.page === 'number' ? result.page : page;
        $show_default = false;
    }

    async function handle_search(e: any) {
        const value = e.target.value.trim().toLowerCase();
        if (value === '') {
            $show_default = true;
            $search_results = [];
            original_results = [];
            current_search_page = 1;
            search_total_pages = 0;
            search_total_results = 0;
            return;
        }
        if (e.key === 'Enter') {
            $search_query = value;
            await load_search_results(1, value);
        }
    }

    async function go_to_search_page(page: number) {
        if (page < 1 || page > search_total_pages || page === current_search_page) {
            return;
        }

        await load_search_results(page);
    }

    function sort_data(kind_of_filter: string) {
        active_sort_kind_of_filter = kind_of_filter;
        $search_results = get_sorted_results(original_results, kind_of_filter);
    }
</script>

<svelte:head>
    <title>Zigistry: A Packages and Programs registry for Zig programming language</title>
    <meta
        name="description"
        content="A packages and programs registry for the Zig programming language. Browse packages and programs."
    />
</svelte:head>
<div class="flex flex-col items-center">
    <div class="searchArea rounded-lg sm:m-5 sm:p-5 sm:shadow-lg sm:shadow-black">
        <h1 class="my-5 text-center text-2xl font-semibold">Search Ziglang Packages</h1>
        <div class="flex">
            <div class="w-fit">
                <div class="ml-4 flex">
                    <div class="relative w-max max-w-36 min-w-10">
                        <label for="dropDownID" class="hidden">Filter</label><select
                            class="block w-full rounded-lg border border-yellow-500 bg-yellow-50 p-2.5 text-sm text-yellow-900 placeholder-yellow-700 focus:border-yellow-500 focus:ring-yellow-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-yellow-400 dark:bg-yellow-100 dark:focus:border-yellow-500 dark:focus:ring-yellow-500"
                            id="dropDownID"
                            ><option>No Filter</option><option>api</option><option>http</option
                            ><option>rest</option><option>gamedev</option><option>gui</option
                            ><option>cross-platform</option></select
                        >
                    </div>
                </div>
            </div>
            <div class="mx-4 mb-5 flex w-60 max-w-72">
                <div class="relative w-full">
                    <input
                        class="block w-full rounded-lg border border-slate-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-600 dark:bg-[#2e2e2e] dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500"
                        type="text"
                        placeholder="Search 500+ Zig libraries"
                        autofocus={true}
                        bind:value={$search_query}
                        onkeyup={handle_search}
                    />
                </div>
            </div>
        </div>
    </div>
</div>
{#if $show_default}
    <div>
        <LeftMiniTitle icon={Rocket} name="Recently Released" />
        <section class="flex w-full flex-wrap justify-evenly">
            {@html '<!--What!!!! package is a reserved keyword!!!!!!-->'}
            {#each data.top_10_latest_repos as library}
                <Card
                    avatar_url={library.avatar_url}
                    owner_name={library.owner_name}
                    repo_name={library.repo_name}
                    stars={library.stargazer_count}
                    description={library.description}
                    watchers={library.watchers_count}
                    forks={library.fork_count}
                    issues={library.issues_count}
                    provider={library.provider}
                    spdx_id={library.license}
                    minimum_zig_version={library.minimum_zig_version}
                    primary_language={library.primary_language}
                    type_of_card="packages-display"
                />
            {/each}
        </section>

        <LeftMiniTitle icon={Rocket} name="Most Used" />
        <section class="flex w-full flex-wrap justify-evenly">
            {#each data.most_used as library}
                <Card
                    avatar_url={library.avatar_url}
                    owner_name={library.owner_name}
                    repo_name={library.repo_name}
                    stars={library.stargazer_count}
                    description={library.description}
                    watchers={library.watchers_count}
                    forks={library.fork_count}
                    issues={library.issues_count}
                    provider={library.provider}
                    spdx_id={library.license}
                    minimum_zig_version={library.minimum_zig_version}
                    primary_language={library.primary_language}
                    type_of_card="packages-display"
                />
            {/each}
        </section>

        <LeftMiniTitle icon={Rocket} name="Famous Game libs" />
        <section class="flex w-full flex-wrap justify-evenly">
            {#each data.games.slice(0, 10) as library}
                <Card
                    avatar_url={library.avatar_url}
                    owner_name={library.owner_name}
                    repo_name={library.repo_name}
                    stars={library.stargazer_count}
                    description={library.description}
                    watchers={library.watchers_count}
                    forks={library.fork_count}
                    issues={library.issues_count}
                    provider={library.provider}
                    spdx_id={library.license}
                    minimum_zig_version={library.minimum_zig_version}
                    primary_language={library.primary_language}
                    type_of_card="packages-display"
                />
            {/each}
        </section>
        <LeftMiniTitle icon={Rocket} name="Famous Web libs" />
        <section class="flex w-full flex-wrap justify-evenly">
            {#each data.web.slice(0, 10) as library}
                <Card
                    avatar_url={library.avatar_url}
                    owner_name={library.owner_name}
                    repo_name={library.repo_name}
                    stars={library.stargazer_count}
                    description={library.description}
                    watchers={library.watchers_count}
                    forks={library.fork_count}
                    issues={library.issues_count}
                    provider={library.provider}
                    spdx_id={library.license}
                    minimum_zig_version={library.minimum_zig_version}
                    primary_language={library.primary_language}
                    type_of_card="packages-display"
                />
            {/each}
        </section>
        <LeftMiniTitle icon={Rocket} name="Famous GUI libs" />
        <section class="flex w-full flex-wrap justify-evenly">
            {#each data.gui.slice(0, 10) as library}
                <Card
                    avatar_url={library.avatar_url}
                    owner_name={library.owner_name}
                    repo_name={library.repo_name}
                    stars={library.stargazer_count}
                    description={library.description}
                    watchers={library.watchers_count}
                    forks={library.fork_count}
                    issues={library.issues_count}
                    provider={library.provider}
                    spdx_id={library.license}
                    minimum_zig_version={library.minimum_zig_version}
                    primary_language={library.primary_language}
                    type_of_card="packages-display"
                />
            {/each}
        </section>
        <Infinite_Scroll thingy="packages" />
    </div>
{:else}
    <div class="relative w-full">
        <SearchSortSidebar onSort={sort_data} />
        <div class="md:pl-64">
            <LeftMiniTitle icon={Rocket} name="Search results" />
            <p class="px-4 text-sm text-gray-600 dark:text-gray-300">
                {search_total_results} result{search_total_results === 1 ? '' : 's'}
            </p>
            <section class="flex w-full flex-wrap justify-evenly">
                {#each $search_results as library}
                    <Card
                        avatar_url={library.avatar_url}
                        owner_name={library.owner_name}
                        repo_name={library.repo_name}
                        stars={library.stargazer_count}
                        description={library.description}
                        watchers={library.watchers_count}
                        forks={library.fork_count}
                        issues={library.issues_count}
                        provider={library.provider}
                        spdx_id={library.license}
                        minimum_zig_version={library.minimum_zig_version}
                        primary_language={library.primary_language}
                        type_of_card="packages-display"
                    />
                {/each}
            </section>
            {#if search_total_results === 0}
                <p class="my-4 text-center text-sm text-gray-600 dark:text-gray-300">
                    No results found.
                </p>
            {:else}
                <div class="my-4 flex items-center justify-center gap-3">
                    <button
                        type="button"
                        class="rounded-lg border border-gray-300 px-3 py-1.5 text-sm disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600"
                        onclick={() => go_to_search_page(current_search_page - 1)}
                        disabled={current_search_page <= 1}
                    >
                        Previous
                    </button>
                    <span class="text-sm text-gray-700 dark:text-gray-300">
                        Page {current_search_page} of {search_total_pages}
                    </span>
                    <button
                        type="button"
                        class="rounded-lg border border-gray-300 px-3 py-1.5 text-sm disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600"
                        onclick={() => go_to_search_page(current_search_page + 1)}
                        disabled={current_search_page >= search_total_pages}
                    >
                        Next
                    </button>
                </div>
            {/if}
        </div>
    </div>
{/if}
