<script lang="ts">
    import type { PageData } from './$types';
    import PackageProgramDisplay from '../../../../../../../components/+packageProgramDisplay.svelte';

    let { data: data_from_api }: { data: PageData } = $props();

    let title = $derived(
        data_from_api.library
            ? `Zig package: ${data_from_api.library.owner_name}/${data_from_api.library.repo_name} from ${data_from_api.provider} | Version: ${data_from_api.version}`
            : 'Loading package version...'
    );

    let meta_description = $derived(
        data_from_api.library ? 'Zig package: ' + data_from_api.library.description : 'Loading package details...'
    );
</script>

<svelte:head>
    <title>{title}</title>
    <meta name="description" content={meta_description} />
</svelte:head>

{#if data_from_api.library}
    <PackageProgramDisplay
        show_dependents={true}
        provider_id={data_from_api.provider_id}
        readme_url={data_from_api.library.readme_url}
        version_name={data_from_api.version + ' version'}
        releases={data_from_api.library.releases}
        publish_date={data_from_api.library.published_at}
        owner_name={data_from_api.library.owner_name}
        repo_name={data_from_api.library.repo_name}
        avatar_id={data_from_api.library.avatar_id}
        stars_count={data_from_api.library.stars_count}
        description={data_from_api.library.description}
        forks_count={data_from_api.library.forks_count}
        issues_count={data_from_api.library.issues_count}
        license={data_from_api.library.license}
        minimum_zig_version={data_from_api.library.minimum_zig_version}
        published_date={data_from_api.library.published_at}
        dependents={data_from_api.library.dependents}
        dependencies={data_from_api.library.dependencies}
    />
{:else}
    <div class="flex h-screen items-center justify-center">
        <div class="text-2xl font-bold text-black dark:text-white">Loading package version...</div>
    </div>
{/if}
