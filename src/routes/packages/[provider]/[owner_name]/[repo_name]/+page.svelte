<script>
    import TimeAgo from 'javascript-time-ago';
    import en from 'javascript-time-ago/locale/en';
    import DOMPurify from 'dompurify';
    import { marked } from 'marked';
    import { onMount } from 'svelte';
    import PackageProgramDisplay from '../../../../../components/+packageProgramDisplay.svelte';

    TimeAgo.addDefaultLocale(en);
    const { data } = $props();
    const key = data.complete_correct_name;
    const value = data.value;
    const provider_id = data.provider_id;
    const name_splitted = key.split('/');
    const library = value;
</script>

<PackageProgramDisplay
    show_dependents={true}
    provider_id={provider_id}
    readme_url={library.dbi.r}
    version_name={library.db + " branch"}
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
