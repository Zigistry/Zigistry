<script>
    import { SquareArrowOutUpRight, Package, Code } from '@lucide/svelte';
    const { data } = $props();
    import LeftMiniTitle from '../../../../components/+LeftMiniTitle.svelte';
    import Card from '../../../../components/+card.svelte';

    const {
        owner_name,
        owner_details,
        packages_from_owner,
        programs_from_owner,
        provider_id,
        avatar_url,
        owner_provider_link
    } = data;
</script>

<div class="px-40 py-20 sm:px-20 sm:py-10">
    <img alt="profile" class="max-w-37.5 min-w-25 rounded-full" src={avatar_url} />
    <h2 class="mt-4 font-bold">Name: {owner_name}</h2>
    <p>Bio: {owner_details?.b}</p>
    <a
        class="mt-2 flex w-fit items-center justify-center rounded-full bg-slate-800 p-4 hover:underline"
        target="_blank"
        href={owner_provider_link}
        >View profile at {provider_id === 'gh' ? 'GitHub' : 'Codeberg'}&nbsp;<SquareArrowOutUpRight
            size={18}
        /></a
    >
</div>
<div>
    {#if packages_from_owner.length > 0}
        <LeftMiniTitle icon={Package} name="Packages" />
        <section class="flex w-full flex-wrap justify-evenly">
            {#each packages_from_owner as [name, library]}
                {@const name_splitted = name.split('/')}
                <Card
                    avatar_url={library.a}
                    owner_name={name_splitted[1]}
                    repo_name={name_splitted[2]}
                    stars={library.s}
                    description={library.d}
                    watchers={library.w}
                    forks={library.f}
                    issues={library.i}
                    provider={provider_id}
                    spdx_id={library.l}
                    minimum_zig_version={library.dbi.m}
                    type_of_card="packages-display"
                />
            {/each}
        </section>
    {/if}
    {#if programs_from_owner.length > 0}
        <LeftMiniTitle icon={Code} name="Programs"></LeftMiniTitle>
        <section class="flex w-full flex-wrap justify-evenly">
            {#each programs_from_owner as [name, library]}
                {@const name_splitted = name.split('/')}
                <Card
                    avatar_url={library.a}
                    owner_name={name_splitted[1]}
                    repo_name={name_splitted[2]}
                    stars={library.s}
                    description={library.d}
                    watchers={library.w}
                    forks={library.f}
                    issues={library.i}
                    provider={provider_id}
                    spdx_id={library.l}
                    minimum_zig_version={library.dbi.m}
                    type_of_card="program-display"
                />
            {/each}
        </section>
    {/if}
</div>
