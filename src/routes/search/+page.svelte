<script lang="ts">
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import type { PageData } from './$types';
    import LeftMiniTitle from '../../components/+LeftMiniTitle.svelte';
    import Card from '../../components/+card.svelte';
    import SearchSortSidebar from '../../components/+SearchSortSidebar.svelte';
    import { Rocket } from '@lucide/svelte';
    import { P, PaginationNav } from 'flowbite-svelte';
    import { get_search_parameters_from_url } from '$lib/search-share';

    let { data }: { data: PageData } = $props();

    let search_query = $state('');
    let search_type = $state('packages');
    let search_results: any[] = $state([]);
    const MAXIMUM_SEARCH_ALLOWED_PER_PAGE = 12;
    let current_search_page = $state(1);
    let search_total_pages = $state(0);
    let search_total_results = $state(0);
    let active_sort_kind_of_filter = $state('intelligent');
    let sort_ascending_or_descending = $state('desc');
    let card_display_mode = $state('grid');
    let has_loaded = $state(false);

    function keep_everything_in_sync() {
        if (typeof window === 'undefined') return;

        const params = new URLSearchParams();
        params.set('search', search_query);
        params.set('sort', active_sort_kind_of_filter);
        params.set('dir', sort_ascending_or_descending);
        params.set('type', search_type);
        const hash = `#${params.toString()}`;

        if (window.location.hash !== hash) {
            window.location.hash = hash;
        }
    }

    async function load_search_results(page: number, query_override?: string) {
        const active_query = (query_override ?? search_query).trim().toLowerCase();
        if (active_query === '') {
            return;
        }

        const base_url = data.apiBaseUrl || 'https://zigistry-backend.hf.space';
        const params = new URLSearchParams({
            q: active_query,
            page: String(page),
            per_page: String(MAXIMUM_SEARCH_ALLOWED_PER_PAGE),
            sort: active_sort_kind_of_filter,
            dir: sort_ascending_or_descending
        });

        if (search_type === 'all') {
            const [packagesRes, programsRes] = await Promise.all([
                fetch(`${base_url}/search/packages/?${params.toString()}`).then((r) => r.json()),
                fetch(`${base_url}/search/programs/?${params.toString()}`).then((r) => r.json())
            ]);

            const packagesItems = Array.isArray(packagesRes?.items) ? packagesRes.items : [];
            const programsItems = Array.isArray(programsRes?.items) ? programsRes.items : [];
            search_results = [...packagesItems, ...programsItems];

            const packagesTotal = typeof packagesRes?.total === 'number' ? packagesRes.total : 0;
            const programsTotal = typeof programsRes?.total === 'number' ? programsRes.total : 0;

            search_total_results = packagesTotal + programsTotal;
            search_total_pages =
                Math.ceil(search_total_results / MAXIMUM_SEARCH_ALLOWED_PER_PAGE) ||
                (search_results.length > 0 ? 1 : 0);
            current_search_page = page;
        } else {
            const endpoint = search_type === 'programs' ? 'programs' : 'packages';
            const result_data = await fetch(`${base_url}/search/${endpoint}/?${params.toString()}`);
            const result = await result_data.json();
            const items = Array.isArray(result?.items) ? result.items : [];

            search_results = items;
            search_total_results = typeof result?.total === 'number' ? result.total : items.length;
            search_total_pages =
                typeof result?.total_pages === 'number'
                    ? result.total_pages
                    : items.length > 0
                      ? 1
                      : 0;
            current_search_page = typeof result?.page === 'number' ? result.page : page;
        }
    }

    async function go_to_search_page(page: number) {
        if (page < 1 || page > search_total_pages || page === current_search_page) {
            return;
        }

        await load_search_results(page);
    }

    function sort_data(kind: string) {
        active_sort_kind_of_filter = kind;
        load_search_results(1);
        keep_everything_in_sync();
    }

    function sort_direction_data(direction: string) {
        sort_ascending_or_descending = direction;
        load_search_results(1);
        keep_everything_in_sync();
    }

    async function filter_by_type(type: string) {
        if (type === 'all') {
            search_type = 'all';
        } else if (type === 'programs') {
            search_type = 'programs';
        } else {
            search_type = 'packages';
        }
        current_search_page = 1;
        await load_search_results(1);
        keep_everything_in_sync();
    }

    async function restore_from_hash() {
        const hash = window.location.hash;
        const params = new URLSearchParams(hash.replace(/^#/, ''));
        const search = params.get('search')?.trim().toLowerCase() || '';
        const sort = params.get('sort')?.trim() || 'intelligent';
        const dir = params.get('dir')?.trim() || 'desc';
        const type = params.get('type')?.trim() || 'packages';

        active_sort_kind_of_filter = sort;
        sort_ascending_or_descending = dir === 'asc' ? 'asc' : 'desc';
        if (type === 'all' || type === 'libraries' || type === 'programs') {
            search_type = type === 'libraries' ? 'packages' : type;
        } else {
            search_type = type;
        }

        if (!search) {
            goto(search_type === 'programs' ? '/programs' : '/');
            return;
        }

        search_query = search;
        await load_search_results(1, search);
    }

    onMount(() => {
        restore_from_hash().then(() => {
            has_loaded = true;
        });

        window.addEventListener('hashchange', restore_from_hash);

        return () => {
            window.removeEventListener('hashchange', restore_from_hash);
        };
    });
</script>

<svelte:head>
    <title>Search results - Zigistry</title>
    <meta name="description" content="Search results for Zig packages and programs on Zigistry." />
</svelte:head>

<div class="relative w-full">
    <SearchSortSidebar
        onSort={sort_data}
        onType={filter_by_type}
        onDirection={sort_direction_data}
        activeSort={active_sort_kind_of_filter}
        currentDirection={sort_ascending_or_descending}
        activeType={search_type === 'all'
            ? 'all'
            : search_type === 'programs'
              ? 'programs'
              : 'libraries'}
    />
    <div class="md:pl-64">
        {#if !has_loaded}
            <p class="px-4 py-8 text-center text-sm text-gray-600 dark:text-gray-300">Loading...</p>
        {:else}
            <div class="flex flex-col items-center">
                <div class="searchArea rounded-lg sm:m-5 sm:p-5 sm:shadow-lg sm:shadow-black">
                    <h1 class="my-5 text-center text-2xl font-semibold">
                        {#if search_type === 'all'}
                            Search Ziglang Packages & Programs
                        {:else if search_type === 'programs'}
                            Search Ziglang Programs
                        {:else}
                            Search Ziglang Packages
                        {/if}
                    </h1>
                    <div class="flex">
                        <div class="w-fit">
                            <div class="ml-4 flex">
                                <div class="relative w-max max-w-36 min-w-10">
                                    <label for="dropDownID" class="hidden">Display</label><select
                                        class="block w-27 rounded-lg border border-yellow-500 bg-yellow-50 p-2.5 text-sm text-yellow-900 placeholder-yellow-700 focus:border-yellow-500 focus:ring-yellow-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-yellow-400 dark:bg-yellow-100 dark:focus:border-yellow-500 dark:focus:ring-yellow-500"
                                        id="dropDownID"
                                        onchange={(e) =>
                                            (card_display_mode = e.currentTarget.value)}
                                        ><option value="grid">Grid</option><option value="list"
                                            >List</option
                                        ></select
                                    >
                                </div>
                            </div>
                        </div>
                        <div class="mx-4 mb-5 flex w-60 max-w-72">
                            <div class="relative w-full">
                                <input
                                    class="block w-full rounded-lg border border-slate-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-cyan-500 focus:ring-cyan-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-600 dark:bg-[#2e2e2e] dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500"
                                    type="text"
                                    placeholder={search_type === 'all'
                                        ? 'Search Zig packages & programs'
                                        : search_type === 'programs'
                                          ? 'Search 2000+ Zig programs'
                                          : 'Search 500+ Zig libraries'}
                                    bind:value={search_query}
                                    onkeyup={(e: any) => {
                                        if (e.key === 'Enter') {
                                            const value = e.target.value.trim();
                                            if (value === '') {
                                                goto(
                                                    search_type === 'programs' ? '/programs' : '/'
                                                );
                                                return;
                                            }
                                            search_query = value;
                                            load_search_results(1, value);
                                            keep_everything_in_sync();
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <LeftMiniTitle icon={Rocket} name="Search results" />
            <p class="px-4 text-sm text-gray-600 dark:text-gray-300">
                {search_total_results} result{search_total_results === 1 ? '' : 's'}
            </p>
            <section
                class={card_display_mode === 'list'
                    ? 'mx-auto flex max-w-5xl flex-col gap-2 px-4'
                    : 'flex w-full flex-wrap justify-evenly'}
            >
                {#each search_results as library}
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
                        pushed_at={library.pushed_at}
                        type_of_card={search_type === 'programs'
                            ? 'program-display'
                            : search_type === 'all'
                              ? 'packages-display'
                              : 'packages-display'}
                        variant={card_display_mode}
                    />
                {/each}
            </section>
            {#if search_total_results === 0}
                <p class="my-4 text-center text-sm text-gray-600 dark:text-gray-300">
                    No results found.
                </p>
            {:else}
                <div class="my-4 flex flex-col items-center gap-3">
                    <P class="text-sm"
                        >Showing {current_search_page} of {search_total_pages} Entries</P
                    >
                    <PaginationNav
                        currentPage={current_search_page}
                        totalPages={search_total_pages}
                        onPageChange={go_to_search_page}
                        layout="navigation"
                    />
                </div>
            {/if}
        {/if}
    </div>
</div>
