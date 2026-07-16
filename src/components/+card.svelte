<script>
    import {
        MountainSnow,
        Star,
        User,
        Github,
        Eye,
        GitFork,
        CircleDotDashed,
        Clock,
        Scale,
        Package
    } from '@lucide/svelte';
    import TimeAgo from 'javascript-time-ago';
    import en from 'javascript-time-ago/locale/en';

    let props = $props();

    TimeAgo.addLocale(en);
    const timeAgo = new TimeAgo('en-US');

    const clean_owner_name = $derived(
        props.owner_name.includes('/') ? props.owner_name.split('/')[1] : props.owner_name
    );

    const avatar_url = $derived(
        (props.provider === 'gh'
            ? 'https://avatars.githubusercontent.com/'
            : 'https://codeberg.org/avatars/') + props.avatar_url
    );
    const is_list_view = $derived(props.variant === 'list');

    const provider = $derived(props.provider === 'gh' ? 'github' : 'codeberg');

    const detail_href = $derived.by(() => {
        if (props.type_of_card === 'packages-display') {
            return `/packages/${provider}/${clean_owner_name}/${props.repo_name}`;
        }

        if (props.type_of_card === 'program-display') {
            return `/programs/${provider}/${clean_owner_name}/${props.repo_name}`;
        }

        if (props.type_of_card === 'special-display') {
            const base = props.provider === 'gh' ? 'https://github.com/' : 'https://codeberg.org/';

            return `${base}${clean_owner_name}/${props.repo_name}`;
        }

        return '#';
    });

    const detail_label = $derived.by(() => {
        if (props.type_of_card === 'packages-display') {
            return 'View Package';
        }

        if (props.type_of_card === 'program-display') {
            return 'View Program';
        }

        if (props.type_of_card === 'special-display') {
            return props.provider === 'gh' ? 'View on GitHub' : 'View on Codeberg';
        }

        return 'View';
    });
</script>

{#if is_list_view}
    <div
        class="mb-2 rounded-xl border-gray-200 shadow-lg shadow-black hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800"
    >
        <div class="flex flex-col justify-between gap-4 px-4 py-5 sm:flex-row">
            <div class="min-w-0 flex-1">
                <div class="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <a
                        href={detail_href}
                        class="truncate text-2xl font-bold text-gray-900 hover:text-yellow-600 dark:text-white dark:hover:text-yellow-400"
                    >
                        {props.repo_name}
                    </a>
                    <span class="text-sm text-gray-500">
                        by <a
                            class="text-gray-700 hover:text-amber-700 hover:underline dark:text-gray-300 dark:hover:text-amber-300"
                            href={(props.provider === 'gh'
                                ? '/profiles/github/'
                                : '/profiles/codeberg/') + clean_owner_name}>{clean_owner_name}</a
                        >
                    </span>
                </div>

                <p
                    class="mt-1.5 line-clamp-2 max-w-3xl text-sm font-normal text-gray-700 dark:text-gray-400"
                >
                    {props.description}
                </p>

                <div class="mt-3 flex flex-wrap items-center gap-2">
                    <div class="mr-1 flex items-center gap-1 rounded-md bg-gray-900 px-1.5 py-0.5">
                        <img
                            src={props.primary_language === 'Zig'
                                ? '/languages-logo/zig-logo.png'
                                : '/languages-logo/' +
                                  (typeof props.primary_language === 'string' &&
                                  props.primary_language !== ''
                                      ? encodeURIComponent(props.primary_language.toLowerCase())
                                      : 'undefined') +
                                  '-logo.png'}
                            alt=""
                            width="16"
                            height="16"
                            class="rounded-full"
                        />

                        {#if props.primary_language !== 'Zig'}
                            <img
                                src="/languages-logo/zig-logo.png"
                                alt=""
                                width="16"
                                height="16"
                                class="rounded-full"
                            />
                        {/if}
                    </div>

                    <span
                        class="flex h-fit w-fit items-center gap-1 rounded border border-slate-200 bg-white px-2 py-0.5 font-mono text-xs font-semibold dark:border-none dark:bg-slate-600"
                    >
                        {props.minimum_zig_version}
                    </span>

                    {#if props.pushed_at}
                        <span
                            class="flex h-fit w-fit items-center gap-1 rounded border border-slate-200 bg-white px-2 py-0.5 text-xs font-semibold dark:border-none dark:bg-slate-600"
                        >
                            {timeAgo.format(new Date(props.pushed_at))}
                        </span>
                    {/if}

                    <span
                        class="flex h-fit w-fit items-center gap-1 rounded border border-slate-200 bg-white px-2 py-0.5 text-xs font-semibold dark:border-none dark:bg-slate-600"
                    >
                        {props.spdx_id}
                    </span>

                    <span
                        class="flex h-fit w-fit items-center gap-1 rounded border border-slate-200 bg-white px-2 py-0.5 text-xs font-semibold dark:border-none dark:bg-slate-600"
                    >
                        {#if props.provider === 'gh'}
                            <Github size={12} /> GitHub
                        {:else}
                            <MountainSnow size={12} /> Codeberg
                        {/if}
                    </span>
                </div>
            </div>

            <div
                class="flex shrink-0 flex-row items-center justify-between gap-4 border-t border-gray-100 pt-2 sm:flex-col sm:items-end sm:justify-center sm:gap-3 sm:border-0 sm:pt-0 dark:border-gray-800"
            >
                <div class="flex flex-col items-end gap-1.5">
                    <div
                        class="flex items-center gap-1.5 font-bold text-gray-900 dark:text-gray-200"
                    >
                        <Star class="text-[#cfbc0e]" fill="#cfbc0e" stroke="none" size={14} />
                        {props.stars.toLocaleString()}
                    </div>

                    <div class="flex items-center gap-3 text-xs font-medium text-gray-400">
                        <span class="flex items-center gap-1" title="Watchers">
                            <Eye size={14} class="text-[skyblue]" />
                            {props.watchers}
                        </span>
                        <span class="flex items-center gap-1" title="Forks">
                            <GitFork size={14} class="text-[lightpink]" />
                            {props.forks}
                        </span>
                        <span class="flex items-center gap-1" title="Issues">
                            <CircleDotDashed size={14} class="text-[lightgreen]" />
                            {props.issues}
                        </span>
                    </div>
                </div>

                <a
                    href={detail_href}
                    class="inline-flex items-center rounded-full border border-gray-200 bg-white px-4 py-1.5 text-xs font-semibold text-gray-900 transition-colors hover:bg-gray-50 hover:text-cyan-600 dark:border-gray-700 dark:bg-transparent dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                >
                    {detail_label}
                </a>
            </div>
        </div>
    </div>
{:else}
    <div
        class="card z-0 my-2 flex w-72 transform-cpu flex-col rounded-lg border-0 border-gray-200 bg-white shadow-lg shadow-black transition-transform hover:z-10 hover:scale-110 dark:border-gray-700 dark:bg-[rgb(30,30,30)]"
    >
        <div class="flex h-full flex-col justify-center gap-4 p-6">
            <img
                src={avatar_url + '?size=40'}
                alt="-"
                width="40"
                height="40"
                class="w-10 rounded-full"
            />

            <span class="truncate text-2xl font-bold text-gray-900 dark:text-white"
                >{props.repo_name}</span
            >

            <p
                class="flex w-min truncate rounded-2xl bg-amber-100 text-amber-900 dark:bg-slate-700 dark:text-amber-100"
            >
                <span
                    class="flex w-fit rounded-l-2xl bg-amber-200 p-2 text-amber-900 dark:bg-slate-800 dark:text-amber-100"
                >
                    <User size={22} width={22} class="min-h-5.5 min-w-5.5" />&nbsp;<a
                        class="hover:text-amber-700 hover:underline dark:hover:text-amber-300"
                        href={(props.provider === 'gh'
                            ? '/profiles/github/'
                            : '/profiles/codeberg/') + clean_owner_name}>{clean_owner_name}</a
                    >
                </span>
                <span class="flex content-center items-center px-2">
                    {#if props.provider === 'gh'}
                        <Github size={22} />
                    {:else if props.provider === 'cb'}
                        <MountainSnow size={22} />
                    {/if}
                </span>
                <span class="flex content-center items-center gap-1 bg-gray-900 px-2">
                    <img
                        src={props.primary_language === 'Zig'
                            ? '/languages-logo/zig-logo.png'
                            : '/languages-logo/' +
                              (typeof props.primary_language === 'string' &&
                              props.primary_language !== ''
                                  ? encodeURIComponent(props.primary_language.toLowerCase())
                                  : 'undefined') +
                              '-logo.png'}
                        alt={props.primary_language}
                        width="22"
                        height="22"
                        class="min-h-5.5 min-w-5.5 rounded-full"
                    />

                    {#if props.primary_language !== 'Zig'}
                        <img
                            src="/languages-logo/zig-logo.png"
                            alt="zig"
                            width="22"
                            height="22"
                            class="min-h-5.5 min-w-5.5 rounded-full"
                        />
                    {/if}
                </span>
            </p>
            <div class="flex flex-wrap gap-1.5">
                <span class="flex h-5 items-center rounded-full bg-slate-100 dark:bg-slate-700">
                    <span
                        class="flex h-full items-center rounded-full bg-slate-200 px-1.5 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                    >
                        <Package size={10} />
                    </span>
                    <span class="px-1.5 text-xs font-medium text-slate-700 dark:text-slate-300"
                        >{props.minimum_zig_version}</span
                    >
                </span>

                <span
                    class="flex h-5 items-center rounded-full bg-emerald-100 dark:bg-emerald-900/40"
                >
                    <span
                        class="flex h-full items-center rounded-full bg-emerald-200 px-1.5 text-emerald-700 dark:bg-emerald-800 dark:text-emerald-300"
                    >
                        <Scale size={10} />
                    </span>
                    <span class="px-1.5 text-xs font-medium text-emerald-700 dark:text-emerald-300"
                        >{props.spdx_id}</span
                    >
                </span>

                {#if props.pushed_at}
                    <span class="flex h-5 items-center rounded-full bg-sky-100 dark:bg-sky-900/40">
                        <span
                            class="flex h-full items-center rounded-full bg-sky-200 px-1.5 text-sky-700 dark:bg-sky-800 dark:text-sky-300"
                        >
                            <Clock size={10} />
                        </span>
                        <span class="px-1.5 text-xs font-medium text-sky-700 dark:text-sky-300"
                            >{timeAgo.format(new Date(props.pushed_at))}</span
                        >
                    </span>
                {/if}
            </div>
            <p class="font-normal text-gray-700 dark:text-gray-400">
                {props.description}
            </p>
            <div
                class="flex h-7 w-full items-center overflow-hidden rounded-full bg-gray-100 text-sm font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-300"
            >
                <span
                    class="flex h-full flex-1 items-center justify-center bg-amber-50 dark:bg-amber-950/30"
                >
                    <Star size={12} class="text-amber-500" fill="currentColor" stroke="none" />
                </span>
                <span class="flex-1 text-center">{props.stars.toLocaleString()}</span>
                <span class="h-4 w-px bg-gray-300 dark:bg-gray-600"></span>
                <span
                    class="flex h-full flex-1 items-center justify-center bg-sky-50 dark:bg-sky-950/30"
                >
                    <Eye size={12} class="text-sky-500" />
                </span>
                <span class="flex-1 text-center">{props.watchers}</span>
                <span class="h-4 w-px bg-gray-300 dark:bg-gray-600"></span>
                <span
                    class="flex h-full flex-1 items-center justify-center bg-pink-50 dark:bg-pink-950/30"
                >
                    <GitFork size={12} class="text-pink-500" />
                </span>
                <span class="flex-1 text-center">{props.forks}</span>
                <span class="h-4 w-px bg-gray-300 dark:bg-gray-600"></span>
                <span
                    class="flex h-full flex-1 items-center justify-center bg-green-50 dark:bg-green-950/30"
                >
                    <CircleDotDashed size={12} class="text-green-500" />
                </span>
                <span class="flex-1 text-center">{props.issues}</span>
            </div>
            <div class="flex"></div>
            {#if props.type_of_card === 'packages-display'}
                <a
                    href={'/packages/' +
                        (props.provider === 'gh' ? 'github' : 'codeberg') +
                        '/' +
                        clean_owner_name +
                        '/' +
                        props.repo_name}
                    type="button"
                    class=":ring-cyan-700 group relative flex items-stretch justify-center rounded-full border border-gray-200 bg-white p-0.5 text-center font-medium text-gray-900 transition-[color,background-color,border-color,text-decoration-color,fill,stroke,box-shadow] focus:z-10 focus:text-cyan-700 focus:ring-4 focus:outline-none enabled:hover:bg-gray-100 enabled:hover:text-cyan-700 dark:border-gray-600 dark:bg-transparent dark:text-gray-400 dark:enabled:hover:bg-gray-700 dark:enabled:hover:text-white"
                    ><span
                        class="flex items-stretch rounded-md px-4 py-2 text-sm transition-all duration-200"
                        >View Package</span
                    ></a
                >
            {:else if props.type_of_card === 'program-display'}
                <a
                    href={'/programs/' +
                        (props.provider === 'gh' ? 'github' : 'codeberg') +
                        '/' +
                        clean_owner_name +
                        '/' +
                        props.repo_name}
                    type="button"
                    class=":ring-cyan-700 group relative flex items-stretch justify-center rounded-full border border-gray-200 bg-white p-0.5 text-center font-medium text-gray-900 transition-[color,background-color,border-color,text-decoration-color,fill,stroke,box-shadow] focus:z-10 focus:text-cyan-700 focus:ring-4 focus:outline-none enabled:hover:bg-gray-100 enabled:hover:text-cyan-700 dark:border-gray-600 dark:bg-transparent dark:text-gray-400 dark:enabled:hover:bg-gray-700 dark:enabled:hover:text-white"
                    ><span
                        class="flex items-stretch rounded-md px-4 py-2 text-sm transition-all duration-200"
                        >View Program</span
                    ></a
                >
            {:else if props.type_of_card === 'special-display'}
                <a
                    href={(props.provider === 'gh'
                        ? 'https://github.com/'
                        : 'https://codeberg.org/') +
                        clean_owner_name +
                        '/' +
                        props.repo_name}
                    type="button"
                    class=":ring-cyan-700 group relative flex items-stretch justify-center rounded-full border border-gray-200 bg-white p-0.5 text-center font-medium text-gray-900 transition-[color,background-color,border-color,text-decoration-color,fill,stroke,box-shadow] focus:z-10 focus:text-cyan-700 focus:ring-4 focus:outline-none enabled:hover:bg-gray-100 enabled:hover:text-cyan-700 dark:border-gray-600 dark:bg-transparent dark:text-gray-400 dark:enabled:hover:bg-gray-700 dark:enabled:hover:text-white"
                    ><span
                        class="flex items-stretch rounded-md px-4 py-2 text-sm transition-all duration-200"
                        >View on {#if props.provider === 'gh'}
                            GitHub <Github size={22} />
                        {:else if props.provider === 'cb'}
                            Codeberg <MountainSnow size={22} />
                        {/if}</span
                    ></a
                >
            {/if}
        </div>
    </div>
{/if}
