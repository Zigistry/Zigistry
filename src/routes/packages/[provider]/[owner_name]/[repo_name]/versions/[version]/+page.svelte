<script>
    import DOMPurify from 'dompurify';
    import PackageProgramDisplay from '../../../../../../../components/+packageProgramDisplay.svelte';
    import { marked } from 'marked';
    import { onMount } from 'svelte';
    const { data } = $props();
    const key = data.complete_correct_name;
    const value = data.value;
    const provider_id = data.provider_id;
    const version = data.version;
    const name_splitted = key.split('/');
    const library = value;

    let readme_content = $state('');
</script>

<PackageProgramDisplay
    show_dependents={true}
    {provider_id}
    readme_url={library.r[version].r}
    version_name={version + " version"}
    releases={library.r}
    publish_date={library.r[version].p}
    owner_name={name_splitted[1]}
    repo_name={name_splitted[2]}
    avatar_id={library.a}
    stars_count={library.s}
    description={library.d}
    forks_count={library.f}
    issues_count={library.i}
    license={library.l}
    minimum_zig_version={library.r[version].m}
    published_date={library.r[version].p}
    dependents={library.dts}
    dependencies={library.r[version].d}
/>
