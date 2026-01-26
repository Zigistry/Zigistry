<script>
    import { onMount, onDestroy } from 'svelte';
    import LeftMiniTitle from '../components/+LeftMiniTitle.svelte';
    import Card from '../components/+card.svelte';
    import { Rocket } from '@lucide/svelte';
    let all_props = $props();
    let listElement;

    let items = $state([]);
    let page = 0;

    async function loadMore() {
        const data = await fetch(
            `http://localhost:8000/${all_props.thingy}/scroll?` +
                encodeURI('per_page=20&page=' + page)
        );
        const data_res = await data.json();
        items = [...items, ...Object.entries(data_res)];
        page++;
    }

    onMount(async () => {
        if (listElement) {
            new IntersectionObserver(async (e) => {
                if (e[0].isIntersecting) {
                    await loadMore();
                }
            }).observe(listElement);
        }
    });

    onDestroy(() => {
        // listElement.removeEventListener("scroll");
    });
</script>

<LeftMiniTitle icon={Rocket} name="View More" />
<section class="flex w-full flex-wrap justify-evenly">
    {@html '<!--What!!!! package is a reserved keyword!!!!!!-->'}
    {#each items as library}
        {#if name_splitted[0] === 'gh'}
            <Card
                avatar_url={library.a}
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
                type_of_card={all_props.thingy === 'programs'
                    ? 'program-display'
                    : 'packages-display'}
            />
        {:else if name_splitted[0] === 'cb'}
            <Card
                avatar_url={library.a}
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
                type_of_card={all_props.thingy === 'programs'
                    ? 'program-display'
                    : 'packages-display'}
            />
        {/if}
    {/each}
</section>
<ul bind:this={listElement}></ul>
