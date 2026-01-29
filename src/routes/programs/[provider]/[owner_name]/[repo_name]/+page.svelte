<script lang="ts">
    import { page } from '$app/state';
    import TimeAgo from 'javascript-time-ago';
    import en from 'javascript-time-ago/locale/en';
    import PackageProgramDisplay from '../../../../../components/+packageProgramDisplay.svelte';

    TimeAgo.addLocale(en);

    let library = $state(null);
    let provider_id = $derived(page.params.provider === 'github' ? 'gh' : 'cb');
    let provider = $derived(page.params.provider === 'github' ? 'GitHub' : 'Codeberg');

    $effect(() => {
        const complete_correct_name =
            `${provider_id}/${page.params.owner_name}/${page.params.repo_name}`.toLowerCase();
        fetch(`https://rohanvashisht-zigistrybackend.hf.space/programs?q=${complete_correct_name}`)
            .then((res) => res.json())
            .then((data) => {
                library = data;
            });
    });

    let title = $derived(
        library
            ? `Zig program: ${library.owner_name}/${library.repo_name} from ${provider} | Branch: ${library.default_branch_name}`
            : 'Loading program...'
    );
    let meta_description = $derived(
        library ? 'Zig program: ' + library.description : 'Loading program details...'
    );
</script>

<svelte:head>
    <title>{title}</title>
    <meta name="description" content={meta_description} />
</svelte:head>

{#if library}
    <PackageProgramDisplay
        show_dependents={false}
        {provider_id}
        readme_url={library.readme_url}
        version_name={library.default_branch_name + ' branch'}
        releases={library.releases}
        publish_date={library.pushed_at}
        owner_name={library.owner_name}
        repo_name={library.repo_name}
        avatar_id={library.avatar_id}
        stars_count={library.stars_count}
        description={library.description}
        forks_count={library.forks_count}
        issues_count={library.issues_count}
        license={library.license}
        minimum_zig_version={library.minimum_zig_version}
        published_date={library.pushed_at}
        dependents={[]}
        dependencies={library.dependencies}
    />
{:else}
    <div class="flex h-screen items-center justify-center">
        <div class="text-2xl font-bold text-black dark:text-white">Loading program details...</div>
    </div>
{/if}
