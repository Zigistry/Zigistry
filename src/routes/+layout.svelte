<script lang="ts">
    import './layout.css';
    import favicon from '$lib/assets/favicon.ico';
    let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<nav class="border-b-2 border-b-[#faca15]">
    <div class="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-3">
        <a href="/"
            ><span class="self-center text-2xl font-extrabold whitespace-nowrap dark:text-white"
                ><span class="text-amber-600 dark:text-yellow-300">Zig</span>istry</span
            ></a
        ><button
            data-collapse-toggle="navbar-default"
            type="button"
            class="inline-flex size-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:ring-2 focus:ring-gray-200 focus:outline-none md:hidden dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
            ><span class="sr-only">Open main menu</span><svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
                class="size-5"
                ><path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 1h15M1 7h15M1 13h15"
                ></path></svg
            ></button
        >
        <div class="hidden w-full md:block md:w-auto" id="navbar-default">
            <ul
                class="mt-4 flex flex-col rounded-lg border border-gray-100 p-4 font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0 md:p-0 rtl:space-x-reverse"
            >
                <li>
                    <a
                        href="/"
                        class="block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
                        >Packages</a
                    >
                </li>
                <li>
                    <a
                        href="/programs"
                        class="block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
                        >Programs</a
                    >
                </li>
                <div
                    class="z-10 hidden w-44 divide-y divide-gray-100 rounded-lg bg-white font-normal shadow dark:divide-gray-600 dark:bg-gray-700"
                    id="dropdownNavbar"
                >
                    <ul
                        aria-labelledby="dropdownNavbarLink"
                        class="py-2 text-sm text-gray-700 dark:text-gray-400"
                    >
                        <li>
                            <a
                                href="/statistics"
                                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >Statistics</a
                            >
                        </li>
                        <li>
                            <a
                                href="/apps"
                                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >Apps</a
                            >
                        </li>
                        <li>
                            <a
                                href="/API-docs"
                                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >API</a
                            >
                        </li>
                        <li>
                            <a
                                href="/help"
                                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >Help</a
                            >
                        </li>
                    </ul>
                </div>
                <li>
                    <a
                        href="/about"
                        class="block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
                        >About</a
                    >
                </li>
                <li>
                    <a
                        href="/help"
                        class="block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
                        >Help</a
                    >
                </li>
                <li class="mt-0.5">
                    <a
                        href="https://github.com/zigistry/zigistry"
                        class="flex rounded-lg border-2 border-gray-600 bg-gray-700 px-3 text-center text-sm font-medium text-white hover:bg-gray-600 focus:ring-4 focus:ring-gray-500 focus:outline-none dark:border-gray-300 dark:bg-white dark:text-gray-900 dark:hover:border-gray-300 dark:hover:bg-gray-100 dark:focus:ring-gray-200"
                        target="_blank"
                        rel="noopener noreferrer"
                        ><svg
                            class="mr-1.5 text-[#ffffff] dark:text-[#161616]"
                            stroke="currentColor"
                            fill="currentColor"
                            strokewidth="0"
                            color="black"
                            viewBox="0 0 24 24"
                            height="18"
                            width="18"
                            xmlns="http://www.w3.org/2000/svg"
                            ><path
                                stroke="currentColor"
                                stroke-width="2"
                                d="M11.083 5.104c.35-.8 1.485-.8 1.834 0l1.752 4.022a1 1 0 0 0 .84.597l4.463.342c.9.069 1.255 1.2.556 1.771l-3.33 2.723a1 1 0 0 0-.337 1.016l1.03 4.119c.214.858-.71 1.552-1.474 1.106l-3.913-2.281a1 1 0 0 0-1.008 0L7.583 20.8c-.764.446-1.688-.248-1.474-1.106l1.03-4.119A1 1 0 0 0 6.8 14.56l-3.33-2.723c-.698-.571-.342-1.702.557-1.771l4.462-.342a1 1 0 0 0 .84-.597l1.753-4.022Z"
                            ></path></svg
                        ><span class="pr-1.5"> Star</span><span
                            class="border-l-2 pl-1.5"
                            id="star_count">606</span
                        ></a
                    >
                </li>
                <li>
                    <button
                        aria-label="theme toggle"
                        type="button"
                        class="rounded-lg p-1 text-sm text-gray-500 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                        id="theme-toggle"
                        ><svg
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                            class="hidden h-5 w-5"
                            id="theme-toggle-dark-icon"
                            ><path
                                d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
                            ></path></svg
                        ><svg
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5"
                            id="theme-toggle-light-icon"
                            ><path
                                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                            ></path></svg
                        ></button
                    >
                </li>
            </ul>
        </div>
    </div>
</nav>
{@render children()}
<footer
    data-testid="flowbite-footer"
    class="w-full rounded-none bg-white p-6 shadow md:flex md:items-center md:justify-between dark:bg-[rgb(30,30,30)]"
>
    <div
        data-testid="flowbite-footer-copyright"
        class="text-sm text-gray-500 sm:text-center dark:text-gray-400"
    >
        © 2024<a href="/" class="ml-1 hover:underline">Rohan Vashisht</a>
    </div>
    <ul data-testid="footer-groupLink" class="flex flex-wrap text-sm text-gray-500 dark:text-white">
        <li class="me-4 last:mr-0 md:mr-6"><a href="/about" class="hover:underline">About</a></li>
        <li class="me-4 last:mr-0 md:mr-6"><a href="/help" class="hover:underline">Help</a></li>
        <li class="me-4 last:mr-0 md:mr-6">
            <a href="https://github.com/zigistry/zigistry" class="hover:underline">GitHub</a>
        </li>
    </ul>
</footer>
