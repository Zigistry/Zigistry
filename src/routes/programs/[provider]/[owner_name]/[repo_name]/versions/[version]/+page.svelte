<script>
    import Card from '../../../../../../../components/+card.svelte';
    import { Tabs, TabItem } from 'flowbite-svelte';
    import DOMPurify from 'dompurify';
    import { load } from './+page.js';
    import { marked } from 'marked';
    import { onMount } from 'svelte';
    import PackageProgramDisplay from '../../../../../../../components/+packageProgramDisplay.svelte';
    const { data } = $props();
    const key = data.complete_correct_name;
    const value = data.value;
    const provider_id = data.provider_id;
    const name_splitted = key.split('/');
    const version = data.version;
    const library = value;
</script>

<PackageProgramDisplay
    show_dependents={false}
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
    dependents={[]}
    dependencies={library.r[version].d}
/>
