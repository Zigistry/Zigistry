<script lang="ts">
    import type { PageData } from './$types';
    import PackageProgramDisplay from '../../../../../components/+packageProgramDisplay.svelte';

    let { data }: { data: PageData } = $props();

    let title = $derived(
        data.library
            ? `Zig program: ${data.library.owner_name}/${data.library.repo_name} from ${data.provider} | Branch: ${data.library.default_branch_name}`
            : 'Zig program | Zigistry'
    );
    let meta_description = $derived(
        data.library
            ? 'Zig program: ' + data.library.description
            : 'Zig program details on Zigistry.'
    );
</script>

<svelte:head>
    <title>{title}</title>
    <meta name="description" content={meta_description} />
</svelte:head>

{#if data.library}
    <PackageProgramDisplay
        route_thingy="programs"
        show_dependents={false}
        provider_id={data.provider_id}
        readme_url={data.library.readme_url}
        version_name={data.library.default_branch_name + ' branch'}
        releases={data.library.releases}
        publish_date={data.library.pushed_at}
        owner_name={data.library.owner_name}
        repo_name={data.library.repo_name}
        avatar_id={data.library.avatar_id}
        stars_count={data.library.stars_count}
        description={data.library.description}
        forks_count={data.library.forks_count}
        issues_count={data.library.issues_count}
        license={data.library.license}
        minimum_zig_version={data.library.minimum_zig_version}
        published_date={data.library.pushed_at}
        dependents={[]}
        dependencies={data.library.dependencies}
    />
{:else}
    <div class="flex h-screen items-center justify-center">
        <div class="text-2xl font-bold text-black dark:text-white">Program not found.</div>
    </div>
{/if}
