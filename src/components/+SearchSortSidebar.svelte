<script>
    import { Filter, X } from '@lucide/svelte';
    let isOpen = $state(false);
    let { onSort } = $props();
</script>

{#if !isOpen}
    <button
        class="fixed top-20 left-0 z-50 rounded-r-md bg-yellow-400 p-2 text-black shadow-md hover:bg-yellow-500 focus:outline-none md:hidden"
        onclick={() => (isOpen = true)}
        aria-label="Open filters"
    >
        <Filter size={20} />
    </button>
{/if}

<aside
    class="fixed top-[66px] left-0 z-50 h-[calc(100vh-66px)] w-64 transform transition-transform md:top-0 md:z-40 md:translate-x-0 {isOpen
        ? 'translate-x-0'
        : '-translate-x-full'}"
>
    <button
        class="absolute top-2 right-2 z-50 p-2 text-gray-600 hover:text-gray-900 md:hidden dark:text-gray-400 dark:hover:text-white"
        onclick={() => (isOpen = false)}
        aria-label="Close filters"
    >
        <X size={20} />
    </button>
    <h2
        class="cursor-pointer border-r-2 border-r-[#faca15] bg-gray-100 py-3 text-center text-lg font-semibold text-gray-900 hover:bg-gray-100 dark:bg-[#1e1e1e] dark:text-white dark:hover:bg-gray-700"
        onclick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
        Go to top
    </h2>
    <div
        class="h-full overflow-y-auto border-r-2 border-r-[#faca15] bg-white px-3 py-4 dark:bg-[#1e1e1e]"
    >
        <h2 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">Sort By</h2>
        <div class="flex flex-col space-y-2">
            <button
                type="button"
                class="flex items-center rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                onclick={() => {
                    onSort('intelligent');
                    isOpen = false;
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="currentColor"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    height="20"
                    width="20"
                    class="mr-3"
                >
                    <path
                        d="M11 21V2.352A3.451 3.451 0 0 0 9.5 2a3.5 3.5 0 0 0-3.261 2.238A3.5 3.5 0 0 0 4.04 8.015a3.518 3.518 0 0 0-.766 1.128c-.042.1-.064.209-.1.313a3.34 3.34 0 0 0-.106.344 3.463 3.463 0 0 0 .02 1.468A4.017 4.017 0 0 0 2.3 12.5l-.015.036a3.861 3.861 0 0 0-.216.779A3.968 3.968 0 0 0 2 14c.003.24.027.48.072.716a4 4 0 0 0 .235.832c.006.014.015.027.021.041a3.85 3.85 0 0 0 .417.727c.105.146.219.285.342.415.072.076.148.146.225.216.1.091.205.179.315.26.11.081.2.14.308.2.02.013.039.028.059.04v.053a3.506 3.506 0 0 0 3.03 3.469 3.426 3.426 0 0 0 4.154.577A.972.972 0 0 1 11 21Zm10.934-7.68a3.956 3.956 0 0 0-.215-.779l-.017-.038a4.016 4.016 0 0 0-.79-1.235 3.417 3.417 0 0 0 .017-1.468 3.387 3.387 0 0 0-.1-.333c-.034-.108-.057-.22-.1-.324a3.517 3.517 0 0 0-.766-1.128 3.5 3.5 0 0 0-2.202-3.777A3.5 3.5 0 0 0 14.5 2a3.451 3.451 0 0 0-1.5.352V21a.972.972 0 0 1-.184.546 3.426 3.426 0 0 0 4.154-.577A3.506 3.506 0 0 0 20 17.5v-.049c.02-.012.039-.027.059-.04.106-.064.208-.13.308-.2s.214-.169.315-.26c.077-.07.153-.14.225-.216a4.007 4.007 0 0 0 .459-.588c.115-.176.215-.361.3-.554.006-.014.015-.027.021-.041.087-.213.156-.434.205-.659.013-.057.024-.115.035-.173.046-.237.07-.478.073-.72a3.948 3.948 0 0 0-.066-.68Z"
                    ></path>
                </svg>
                Intelegent Sort
            </button>
            <button
                type="button"
                class="flex items-center rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                onclick={() => {
                    onSort('stars');
                    isOpen = false;
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="currentColor"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    height="20"
                    width="20"
                    class="mr-3"
                >
                    <path
                        d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
                    ></path>
                </svg>
                Most Stars
            </button>
            <button
                type="button"
                class="flex items-center rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                onclick={() => {
                    onSort('dependents');
                    isOpen = false;
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="currentColor"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    height="20"
                    width="20"
                    class="mr-3"
                >
                    <path
                        fill-rule="evenodd"
                        d="M5 6a3 3 0 1 1 4 2.83V10a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V8.83a3.001 3.001 0 1 1 2 0V10a3 3 0 0 1-3 3h-1v2.17a3.001 3.001 0 1 1-2 0V13h-1a3 3 0 0 1-3-3V8.83A3.001 3.001 0 0 1 5 6Z"
                        clip-rule="evenodd"
                    ></path>
                </svg>
                Most Depended On
            </button>
            <button
                type="button"
                class="flex items-center rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                onclick={() => {
                    onSort('recently_updated');
                    isOpen = false;
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="currentColor"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    height="20"
                    width="20"
                    class="mr-3"
                >
                    <path
                        fill-rule="evenodd"
                        d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                        clip-rule="evenodd"
                    ></path>
                </svg>
                Recently Updated
            </button>
            <button
                type="button"
                class="flex items-center rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                onclick={() => {
                    onSort('newly_added');
                    isOpen = false;
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="currentColor"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    height="20"
                    width="20"
                    class="mr-3"
                >
                    <path
                        fill-rule="evenodd"
                        d="M18 5.05h1a2 2 0 0 1 2 2v2H3v-2a2 2 0 0 1 2-2h1v-1a1 1 0 1 1 2 0v1h3v-1a1 1 0 1 1 2 0v1h3v-1a1 1 0 1 1 2 0v1Zm-15 6v8a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-8H3ZM11 18a1 1 0 1 0 2 0v-1h1a1 1 0 1 0 0-2h-1v-1a1 1 0 1 0-2 0v1h-1a1 1 0 1 0 0 2h1v1Z"
                        clip-rule="evenodd"
                    ></path>
                </svg>
                Newly Added
            </button>
            <button
                type="button"
                class="flex items-center rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                onclick={() => {
                    onSort('oldest');
                    isOpen = false;
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="currentColor"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    height="20"
                    width="20"
                    class="mr-3"
                >
                    <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5 18h14M5 18v3h14v-3M5 18l1-9h12l1 9M16 6v3m-4-3v3m-2-6h8v3h-8V3Zm-1 9h.01v.01H9V12Zm3 0h.01v.01H12V12Zm3 0h.01v.01H15V12Zm-6 3h.01v.01H9V15Zm3 0h.01v.01H12V15Zm3 0h.01v.01H15V15Z"
                    ></path>
                </svg>
                Oldest First
            </button>
            <div class="my-2 border-t border-gray-200 dark:border-gray-700"></div>
            <button
                type="button"
                class="flex items-center rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                onclick={() => {
                    onSort('a_z');
                    isOpen = false;
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="currentColor"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    height="20"
                    width="20"
                    class="mr-3"
                >
                    <path
                        d="M10.83 5a3.001 3.001 0 0 0-5.66 0H4a1 1 0 1 0 0 2h1.17a3.001 3.001 0 0 0 5.66 0H20a1 1 0 1 0 0-2h-9.17ZM4 11h9.17a3.001 3.001 0 0 1 5.66 0H20a1 1 0 1 1 0 2h-1.17a3.001 3.001 0 0 1-5.66 0H4a1 1 0 1 1 0-2Zm1.17 6H4a1 1 0 1 0 0 2h1.17a3.001 3.001 0 0 0 5.66 0H20a1 1 0 1 0 0-2h-9.17a3.001 3.001 0 0 0-5.66 0Z"
                    ></path>
                </svg>
                A to Z
            </button>
            <button
                type="button"
                class="flex items-center rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                onclick={() => {
                    onSort('z_a');
                    isOpen = false;
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="currentColor"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    height="20"
                    width="20"
                    class="mr-3"
                >
                    <path
                        d="M10.83 5a3.001 3.001 0 0 0-5.66 0H4a1 1 0 1 0 0 2h1.17a3.001 3.001 0 0 0 5.66 0H20a1 1 0 1 0 0-2h-9.17ZM4 11h9.17a3.001 3.001 0 0 1 5.66 0H20a1 1 0 1 1 0 2h-1.17a3.001 3.001 0 0 1-5.66 0H4a1 1 0 1 1 0-2Zm1.17 6H4a1 1 0 1 0 0 2h1.17a3.001 3.001 0 0 0 5.66 0H20a1 1 0 1 0 0-2h-9.17a3.001 3.001 0 0 0-5.66 0Z"
                    ></path>
                </svg>
                Z to A
            </button>
            <div class="my-2 border-t border-gray-200 dark:border-gray-700"></div>
            <button
                type="button"
                class="flex items-center rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                onclick={() => {
                    onSort('forks');
                    isOpen = false;
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="currentColor"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    height="20"
                    width="20"
                    class="mr-3"
                >
                    <path
                        fill-rule="evenodd"
                        d="M5 6a3 3 0 1 1 4 2.83V10a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1V8.83a3.001 3.001 0 1 1 2 0V10a3 3 0 0 1-3 3h-1v2.17a3.001 3.001 0 1 1-2 0V13h-1a3 3 0 0 1-3-3V8.83A3.001 3.001 0 0 1 5 6Z"
                        clip-rule="evenodd"
                    ></path>
                </svg>
                Most Forks
            </button>
            <button
                type="button"
                class="flex items-center rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                onclick={() => {
                    onSort('issues_desc');
                    isOpen = false;
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="currentColor"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    height="20"
                    width="20"
                    class="mr-3"
                >
                    <path
                        fill-rule="evenodd"
                        d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v5a1 1 0 1 0 2 0V8Zm-1 7a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H12Z"
                        clip-rule="evenodd"
                    ></path>
                </svg>
                Most Issues
            </button>
            <button
                type="button"
                class="flex items-center rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                onclick={() => {
                    onSort('issues_asc');
                    isOpen = false;
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="currentColor"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    height="20"
                    width="20"
                    class="mr-3"
                >
                    <path
                        fill-rule="evenodd"
                        d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586l-1.793-1.793a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4-4Z"
                        clip-rule="evenodd"
                    ></path>
                </svg>
                Least Issues
            </button>
            <button
                type="button"
                class="flex items-center rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                onclick={() => {
                    onSort('zig_ver_desc');
                    isOpen = false;
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="currentColor"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    height="20"
                    width="20"
                    class="mr-3"
                >
                    <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15.583 8.445h.01M10.86 19.71l-6.573-6.63a.993.993 0 0 1 0-1.4l7.329-7.394A.98.98 0 0 1 12.31 4l5.734.007A1.968 1.968 0 0 1 20 5.983v5.5a.992.992 0 0 1-.316.727l-7.44 7.5a.974.974 0 0 1-1.384.001Z"
                    ></path>
                </svg>
                Latest Zig Version
            </button>
            <button
                type="button"
                class="flex items-center rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                onclick={() => {
                    onSort('zig_ver_asc');
                    isOpen = false;
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="currentColor"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    height="20"
                    width="20"
                    class="mr-3"
                >
                    <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15.583 8.445h.01M10.86 19.71l-6.573-6.63a.993.993 0 0 1 0-1.4l7.329-7.394A.98.98 0 0 1 12.31 4l5.734.007A1.968 1.968 0 0 1 20 5.983v5.5a.992.992 0 0 1-.316.727l-7.44 7.5a.974.974 0 0 1-1.384.001Z"
                    ></path>
                </svg>
                Oldest Zig Version
            </button>
        </div>
    </div>
</aside>
