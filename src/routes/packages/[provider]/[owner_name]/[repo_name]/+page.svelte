<script lang="ts">
    import TimeAgo from 'javascript-time-ago';
    import en from 'javascript-time-ago/locale/en';
    import PackageProgramDisplay from '../../../../../components/+packageProgramDisplay.svelte';

    TimeAgo.addLocale(en);
    const { data } = $props();
    const provider_id = $derived(data.provider_id);
    const library = $derived(data.value);
    const provider = provider_id === 'gh' ? 'GitHub' : 'Codeberg';
</script>

<svelte:head>
    <title
        >Zig package: {library.owner_name}/{library.repo_name} from {provider} | Branch: {library.default_branch_name}</title
    >
    <meta name="description" content={'Zig package: ' + library.description} />
</svelte:head>

<PackageProgramDisplay
    show_dependents={true}
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
    dependents={library.dependents}
    dependencies={library.dependencies}
/>
