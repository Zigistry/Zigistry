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
                encodeURI('per_page=20&ge=' + page)
        );
        const data_res = await data.json();
        items = [...items, ...data_res];
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
        <Card
            avatar_url={library.avatar_url}
            owner_name={library.owner_name.split('/')[1] || library.owner_name}
            repo_name={library.repo_name}
            stars={library.stargazer_count}
            description={library.description}
            watchers={library.watchers_count}
            forks={library.fork_count}
            issues={library.issues_count}
            provider={library.provider}
            spdx_id={library.license}
            minimum_zig_version={library.minimum_zig_version}
            type_of_card={all_props.thingy === 'programs' ? 'program-display' : 'packages-display'}
        />
    {/each}
</section>
<ul bind:this={listElement}></ul>
