<script>
    import { onMount, onDestroy } from 'svelte';
    import LeftMiniTitle from '../components/+LeftMiniTitle.svelte';
    import Card from '../components/+card.svelte';
    import { Rocket } from '@lucide/svelte';
    let all_props = $props();
    let listElement;

    let items = $state([]);
    let page = $state(1);

    const getApiBaseUrl = (hostname) => {
        if (import.meta.env.VITE_API_BASE_URL) {
            return import.meta.env.VITE_API_BASE_URL;
        }
        if (hostname === 'localhost' || hostname.includes('localhost:')) {
            return 'http://localhost:7860';
        }
        return 'https://zigistry-backend.hf.space';
    };

    async function loadMore() {
        const hostname = window.location.hostname;
        const baseUrl = getApiBaseUrl(hostname);
        const data = await fetch(
            `${baseUrl}/${all_props.thingy}/scroll/?` + encodeURI('per_page=10&page=' + page)
        );
        const data_res = await data.json();
        items = [...items, ...data_res];
        page = page + 1;
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
<section
    class={all_props.variant === 'list'
        ? 'mx-auto flex max-w-5xl flex-col gap-2 px-4'
        : 'flex w-full flex-wrap justify-evenly'}
>
    {@html '<!--What!!!! package is a reserved keyword!!!!!!-->'}
    {#each items as library}
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
            type_of_card={all_props.thingy === 'programs' ? 'program-display' : 'packages-display'}
            variant={all_props.variant}
        />
    {/each}
</section>
<ul bind:this={listElement}></ul>
