<script lang="ts">
    import { Gamepad2, Globe, AppWindow } from '@lucide/svelte';
    let { type = 'packages' }: { type: string } = $props();
</script>

<div class="flex items-center justify-around gap-3">
    <a
        href="/search#search=&sort=stars&type={type}&topic=web"
        class="inline-flex items-center gap-1 rounded-full border border-sky-200 bg-sky-50 px-2.5 py-1 text-xs font-medium text-sky-700 transition-all hover:bg-sky-100 hover:shadow-sm dark:border-sky-800 dark:bg-sky-900/30 dark:text-sky-300 dark:hover:bg-sky-900/50"
    >
        <Globe size={14} />
        Web
    </a>
    <a
        href="/search#search=&sort=stars&type={type}&topic=gui"
        class="inline-flex items-center gap-1 rounded-full border border-violet-200 bg-violet-50 px-2.5 py-1 text-xs font-medium text-violet-700 transition-all hover:bg-violet-100 hover:shadow-sm dark:border-violet-800 dark:bg-violet-900/30 dark:text-violet-300 dark:hover:bg-violet-900/50"
    >
        <AppWindow size={14} />
        GUI
    </a>
    <a
        href="/search#search=&sort=stars&type={type}&topic=game"
        class="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 transition-all hover:bg-emerald-100 hover:shadow-sm dark:border-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 dark:hover:bg-emerald-900/50"
    >
        <Gamepad2 size={14} />
        Games
    </a>
    <a
        href="/search#sort=stars&type={type}"
        class="inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700 transition-all hover:bg-amber-100 hover:shadow-sm dark:border-amber-800 dark:bg-amber-900/30 dark:text-amber-300 dark:hover:bg-amber-900/50"
    >
        View more
        <svg class="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"
            ><path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
            /></svg
        >
    </a>
</div>
