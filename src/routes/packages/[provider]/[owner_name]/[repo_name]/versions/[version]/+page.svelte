<script>
    import TimeAgo from 'javascript-time-ago';
    import en from 'javascript-time-ago/locale/en';
    import PackageProgramDisplay from '../../../../../../../components/+packageProgramDisplay.svelte';

    TimeAgo.addLocale(en);
    const { data } = $props();
    const provider_id = $derived(data.provider_id);
    const version = $derived(data.version);
    const library = $derived(data.value);
    const platform = provider_id === 'gh' ? 'GitHub' : 'Codeberg';
</script>

<svelte:head>
    <title
        >Zig package: {library.owner_name}/{library.repo_name} from {platform} | Version: {version}</title
    >
    <meta name="description" content={'Zig package: ' + library.description} />
</svelte:head>

<PackageProgramDisplay
    show_dependents={true}
    {provider_id}
    readme_url={library.readme_url}
    version_name={version + ' version'}
    releases={library.releases}
    publish_date={library.published_at}
    owner_name={library.owner_name}
    repo_name={library.repo_name}
    avatar_id={library.avatar_id}
    stars_count={library.stars_count}
    description={library.description}
    forks_count={library.forks_count}
    issues_count={library.issues_count}
    license={library.license}
    minimum_zig_version={library.minimum_zig_version}
    published_date={library.published_at}
    dependents={library.dependents}
    dependencies={library.dependencies}
/>
