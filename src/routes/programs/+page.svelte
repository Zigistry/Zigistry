<script>
    import LeftMiniTitle from '../../components/+LeftMiniTitle.svelte';
    import Card from '../../components/+card.svelte';
    import Infinite_Scroll from '../../components/+InfiniteScroll.svelte';
    import { Rocket } from '@lucide/svelte';

    let top_10_latest_repos = $state([]);
    let most_used = $state([]);
    async function get_latest() {
        top_10_latest_repos = await (await fetch('http://localhost:8000/programs/latest')).json();
        most_used = await (await fetch('http://localhost:8000/programs/latest')).json();
    }

    get_latest();

    let show_default = $state(true);
    let search_results = $state({});
    async function handle_search(e) {
        const value = e.target.value.trim().toLowerCase();
        if (value === '') {
            show_default = true;
            search_results = {};
            return;
        }
        if (e.key === 'Enter') {
            const result_data = await fetch(
                'http://localhost:8000/search/programs?' + encodeURI(`q=${value}&filter=a`)
            );
            let result = await result_data.json();
            //  Now the entire data is loaded
            if (result == null) {
                result = {};
            }
            search_results = Object.entries(result);
            show_default = false;
        }
    }
</script>

<svelte:head>
    <title>Zigistry: Browse Zig programs</title>
    <meta
        name="description"
        content="A packages and programs registry for the Zig programming language. Browse packages and programs."
    />
</svelte:head>

<div class="flex flex-col items-center">
    <div class="searchArea rounded-lg sm:m-5 sm:p-5 sm:shadow-lg sm:shadow-black">
        <h1 class="my-5 text-center text-2xl font-semibold">Search Ziglang Programs</h1>
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
                        placeholder="Search 2000+ Zig programs"
                        autofocus=""
                        on:keyup={handle_search}
                    />
                </div>
            </div>
        </div>
    </div>
</div>
{#if show_default}
    <div>
        <LeftMiniTitle icon={Rocket} name="Recently Released" />
        <section class="flex w-full flex-wrap justify-evenly">
            {@html '<!--What!!!! package is a reserved keyword!!!!!!-->'}
            {#each top_10_latest_repos as library}
                <Card
                    avatar_url={library.avatar_url}
                    owner_name={library.owner_name}
                    repo_name={library.repo_name}
                    stars={library.stars}
                    description={library.description}
                    watchers={library.watchers}
                    forks={library.forks}
                    issues={library.issues}
                    provider={library.provider}
                    spdx_id={library.spdx_id}
                    minimum_zig_version={library.minimum_zig_version}
                    type_of_card="program-display"
                />
            {/each}
        </section>

        <LeftMiniTitle icon={Rocket} name="Most Used" />
        <section class="flex w-full flex-wrap justify-evenly">
            {#each most_used as [name, library]}
                {@const name_splitted = name.split('/')}
                <Card
                    avatar_url={library.avatar_url}
                    owner_name={name_splitted[1]}
                    repo_name={name_splitted[2]}
                    stars={library.stars}
                    description={library.description}
                    watchers={library.watchers}
                    forks={library.forks}
                    issues={library.issues}
                    provider={name_splitted[0]}
                    spdx_id={library.spdx_id}
                    minimum_zig_version={library.minimum_zig_version}
                    type_of_card="program-display"
                />
            {/each}
        </section>
        <Infinite_Scroll thingy="programs" />
    </div>
{:else}
    <div>
        <LeftMiniTitle icon={Rocket} name="Search results" />
        <section class="flex w-full flex-wrap justify-evenly">
            {#each search_results as [name, library]}
                {@const name_splitted = name.split('/')}
                <Card
                    avatar_url={library.avatar_url}
                    owner_name={name_splitted[1]}
                    repo_name={name_splitted[2]}
                    stars={library.stars}
                    description={library.description}
                    watchers={library.watchers}
                    forks={library.forks}
                    issues={library.issues}
                    provider={name_splitted[0]}
                    spdx_id={library.spdx_id}
                    minimum_zig_version={library.minimum_zig_version}
                    type_of_card="program-display"
                />
            {/each}
        </section>
    </div>
{/if}
