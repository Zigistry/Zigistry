<script>
    const data = $props();
    const name = data.name;
    const hash = data.hash;
    const url = data.url;
    const updated_at = data.updated_at;

    // only get the repository url from this using regex
    // using : https?://([a-zA-Z0-9.-]*/[^/]+/[^/]+)(?:/archive/|$)

    const repoUrlMatch = url.match(/https?:\/\/([a-zA-Z0-9.-]*\/[^/]+\/[^/]+)(?:\/archive\/|$)/);
    const repo_link = repoUrlMatch ? `https://${repoUrlMatch[1]}` : data.url;
</script>

<div
    class="transform rounded-lg bg-gray-100 p-3 transition-all duration-300 hover:scale-102 hover:bg-gray-200 sm:p-4 dark:bg-[#2e2e2e] dark:hover:bg-slate-600"
>
    <div class="space-y-2 sm:space-y-3">
        <div class="flex items-center space-x-2 text-sm sm:text-base">
            <span class="font-medium text-emerald-600 dark:text-emerald-400">Name</span><span
                class="text-black dark:text-white">{name}</span
            >
        </div>
        <div class="space-y-1">
            <div class="text-sm font-medium text-sky-600 sm:text-base dark:text-sky-400">URL</div>
            <a
                href={repo_link}
                target="_blank"
                class="text-xs break-all text-black hover:text-sky-500 sm:text-sm dark:text-white dark:hover:text-sky-300"
                >{repo_link}</a
            >
        </div>
        <div class="space-y-1">
            <div class="text-sm font-medium text-purple-600 sm:text-base dark:text-purple-400">
                Tag URL
            </div>
            <a
                href={url}
                target="_blank"
                class="text-xs break-all text-black hover:text-purple-500 sm:text-sm dark:text-white dark:hover:text-purple-300"
                >{url}</a
            >
        </div>
        <div class="flex items-center space-x-2">
            <span class="text-sm font-medium text-amber-600 sm:text-base dark:text-amber-400"
                >Commit</span
            ><code
                class="relative truncate rounded bg-gray-200 px-2 py-1 font-mono text-xs text-gray-800 hover:absolute hover:z-10 hover:overflow-visible hover:whitespace-normal hover:shadow-lg sm:text-sm dark:bg-slate-800 dark:text-white"
                >{hash}</code
            >
        </div>
    </div>
</div>
