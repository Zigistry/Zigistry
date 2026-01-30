<script lang="ts">
    import type { PageData } from './$types';
    import PackageProgramDisplay from '../../../../../components/+packageProgramDisplay.svelte';

    let { data: data_from_api_csr_thingy }: { data: PageData } = $props();

    let title = $derived(
        data_from_api_csr_thingy.library
            ? `Zig package: ${data_from_api_csr_thingy.library.owner_name}/${data_from_api_csr_thingy.library.repo_name} from ${data_from_api_csr_thingy.provider} | Branch: ${data_from_api_csr_thingy.library.default_branch_name}`
            : 'Loading package...'
    );

    let meta_description = $derived(
        data_from_api_csr_thingy.library
            ? 'Zig package: ' + data_from_api_csr_thingy.library.description
            : 'Loading package details...'
    );
</script>

<svelte:head>
    <title>{title}</title>
    <meta name="description" content={meta_description} />
</svelte:head>

{#if data_from_api_csr_thingy.library}
    <PackageProgramDisplay
        show_dependents={true}
        provider_id={data_from_api_csr_thingy.provider_id}
        readme_url={data_from_api_csr_thingy.library.readme_url}
        version_name={data_from_api_csr_thingy.library.default_branch_name + ' branch'}
        releases={data_from_api_csr_thingy.library.releases}
        publish_date={data_from_api_csr_thingy.library.pushed_at}
        owner_name={data_from_api_csr_thingy.library.owner_name}
        repo_name={data_from_api_csr_thingy.library.repo_name}
        avatar_id={data_from_api_csr_thingy.library.avatar_id}
        stars_count={data_from_api_csr_thingy.library.stars_count}
        description={data_from_api_csr_thingy.library.description}
        forks_count={data_from_api_csr_thingy.library.forks_count}
        issues_count={data_from_api_csr_thingy.library.issues_count}
        license={data_from_api_csr_thingy.library.license}
        minimum_zig_version={data_from_api_csr_thingy.library.minimum_zig_version}
        published_date={data_from_api_csr_thingy.library.pushed_at}
        dependents={data_from_api_csr_thingy.library.dependents}
        dependencies={data_from_api_csr_thingy.library.dependencies}
    />
{:else}
    <div class="flex h-screen items-center justify-center">
        <div class="text-2xl font-bold text-black dark:text-white">Loading package details...</div>
    </div>
{/if}
