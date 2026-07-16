<script lang="ts">
    import { goto } from '$app/navigation';
    import type { PageData } from './$types';
    import LeftMiniTitle from '../components/+LeftMiniTitle.svelte';
    import Card from '../components/+card.svelte';
    import Infinite_Scroll from '../components/+InfiniteScroll.svelte';
    import ViewMoreBulge from '../components/+ViewMoreBulge.svelte';
    import { Rocket, CircleFadingArrowUp, Gamepad2, Star, Globe, AppWindow } from '@lucide/svelte';

    let { data }: { data: PageData } = $props();
    let search_query = $state('');
    let card_display_mode = $state('grid');

    function handle_search(e: any) {
        const value = e.target.value.trim();
        if (e.key === 'Enter' && value !== '') {
            const hash = `#search=${encodeURIComponent(value)}&sort=intelligent&type=packages`;
            goto(`/search${hash}`);
        }
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
                        <label for="dropDownID" class="hidden">Display</label><select
                            class="block w-27 rounded-lg border border-yellow-500 bg-yellow-50 p-2.5 text-sm text-yellow-900 placeholder-yellow-700 focus:border-yellow-500 focus:ring-yellow-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-yellow-400 dark:bg-yellow-100 dark:focus:border-yellow-500 dark:focus:ring-yellow-500"
                            id="dropDownID"
                            onchange={(e) => (card_display_mode = e.currentTarget.value)}
                            ><option value="grid">Grid</option><option value="list">List</option
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
                        placeholder="Search 500+ Zig libraries"
                        autofocus={true}
                        bind:value={search_query}
                        onkeyup={handle_search}
                    />
                </div>
            </div>
        </div>
    </div>
</div>
<div>
        <LeftMiniTitle icon={Rocket} name="Recently Released" />
        <section
            class={card_display_mode === 'list'
                ? 'mx-auto flex max-w-5xl flex-col gap-2 px-4'
                : 'flex w-full flex-wrap justify-evenly'}
        >
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
                    pushed_at={library.pushed_at}
                    type_of_card="packages-display"
                    variant={card_display_mode}
                />
            {/each}
        </section>
        <ViewMoreBulge href="/" label="View More Recently Released" />

        <LeftMiniTitle icon={CircleFadingArrowUp} name="Recently Updated" />
        <section
            class={card_display_mode === 'list'
                ? 'mx-auto flex max-w-5xl flex-col gap-2 px-4'
                : 'flex w-full flex-wrap justify-evenly'}
        >
            {#each data.recently_updated as library}
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
                    type_of_card="packages-display"
                    variant={card_display_mode}
                />
            {/each}
        </section>
        <ViewMoreBulge href="/" label="View More Recently Updated" />

        <LeftMiniTitle icon={Star} name="Most Used" />
        <section
            class={card_display_mode === 'list'
                ? 'mx-auto flex max-w-5xl flex-col gap-2 px-4'
                : 'flex w-full flex-wrap justify-evenly'}
        >
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
                    pushed_at={library.pushed_at}
                    type_of_card="packages-display"
                    variant={card_display_mode}
                />
            {/each}
        </section>
        <ViewMoreBulge href="/" label="View More Most Used" />

        <LeftMiniTitle icon={Gamepad2} name="Famous Game libs" />
        <section
            class={card_display_mode === 'list'
                ? 'mx-auto flex max-w-5xl flex-col gap-2 px-4'
                : 'flex w-full flex-wrap justify-evenly'}
        >
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
                    pushed_at={library.pushed_at}
                    type_of_card="packages-display"
                    variant={card_display_mode}
                />
            {/each}
        </section>
        <ViewMoreBulge href="/" label="View More Game Libs" />

        <LeftMiniTitle icon={Globe} name="Famous Web libs" />
        <section
            class={card_display_mode === 'list'
                ? 'mx-auto flex max-w-5xl flex-col gap-2 px-4'
                : 'flex w-full flex-wrap justify-evenly'}
        >
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
                    pushed_at={library.pushed_at}
                    type_of_card="packages-display"
                    variant={card_display_mode}
                />
            {/each}
        </section>
        <ViewMoreBulge href="/" label="View More Web Libs" />

        <LeftMiniTitle icon={AppWindow} name="Famous GUI libs" />
        <section
            class={card_display_mode === 'list'
                ? 'mx-auto flex max-w-5xl flex-col gap-2 px-4'
                : 'flex w-full flex-wrap justify-evenly'}
        >
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
                    pushed_at={library.pushed_at}
                    type_of_card="packages-display"
                    variant={card_display_mode}
                />
            {/each}
        </section>
        <ViewMoreBulge href="/" label="View More GUI Libs" />
        <Infinite_Scroll thingy="packages" variant={card_display_mode} />
    </div>

