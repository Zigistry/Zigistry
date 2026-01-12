<script lang="ts">
    import TimeAgo from 'javascript-time-ago';
    import en from 'javascript-time-ago/locale/en';
    import PackageProgramDisplay from '../../../../../components/+packageProgramDisplay.svelte';

    TimeAgo.addLocale(en);
    const { data } = $props();
    const provider_id = $derived(data.provider_id);
    const name_splitted = $derived(data.complete_correct_name.split('/'));
    const library = $derived(data.value);
</script>

<PackageProgramDisplay
    show_dependents={true}
    {provider_id}
    readme_url={library.dbi.r}
    version_name={library.db + ' branch'}
    releases={library.r}
    publish_date={library.p}
    owner_name={name_splitted[1]}
    repo_name={name_splitted[2]}
    avatar_id={library.a}
    stars_count={library.s}
    description={library.d}
    forks_count={library.f}
    issues_count={library.i}
    license={library.l}
    minimum_zig_version={library.m}
    published_date={library.p}
    dependents={library.dts}
    dependencies={library.dbi.d}
/>
