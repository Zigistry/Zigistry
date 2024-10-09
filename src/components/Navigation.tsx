//!============================================================
//!                      Navbar Component
//!============================================================
//!	Author  : Rohan Vashisht
//! License : Please check license file
//! Details : This is the default Navbar component.
//!============================================================

// ===================
//       Imports
// ===================

// ------- Components ---------
import GitHubButton from "react-github-btn";

// =====================================
//       Export navbar component
// =====================================
export default function Header(): JSX.Element {
  // Using to avoid page reloading.
  // function reset_text_box() {
  //   try {
  //     var mine = document.getElementById("SearchBox") as HTMLInputElement;
  //     mine.value = "";
  //   } catch {

  //   };
  // }
  return (
    // <Navbar
    //   className="border-b-orange-300"
    //   style={{ borderBottom: "2px solid #faca15" }}
    //   rounded
    // >
    //   <NavbarBrand href="/">
    //       <span className="self-center whitespace-nowrap text-2xl font-extrabold dark:text-white">
    //         <span className="text-amber-400 dark:text-yellow-300">Zig</span>istry
    //       </span>
    //   </NavbarBrand>
    //   <NavbarToggle />
    //   <NavbarCollapse>
    //     <NavbarLink href="/" active>
    //       Packages
    //     </NavbarLink>
    //     <NavbarLink href="/programs" active>
    //       Programs
    //     </NavbarLink>
    //     <NavbarLink href="/statistics" active>
    //       Statistics
    //     </NavbarLink>
    //     <NavbarLink href="/apps" active>
    //       Apps
    //     </NavbarLink>
    //     <NavbarLink href="/API-docs" active>
    //       API
    //     </NavbarLink>
    //     <NavbarLink href="/about" active>
    //       About
    //     </NavbarLink>
    //     <NavbarLink href="/help" active>
    //       Help
    //     </NavbarLink>
    //     <GitHubButton href="https://github.com/zigistry/zigistry" data-color-scheme="no-preference: light; light: light; dark: dark;" data-icon="octicon-star" data-show-count="true" aria-label="Star zigistry/zigistry on GitHub">Star</GitHubButton>
    //     <Flowbite>
    //       <DarkThemeToggle className="w-4 py-0 pr-7" />
    //     </Flowbite>
    //   </NavbarCollapse>
    // </Navbar>

    <nav style={{ borderBottom: "2px solid #faca15" }}>
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-3">
        <a href="/">
          <span className="self-center whitespace-nowrap text-2xl font-extrabold dark:text-white">
            <span className="text-amber-400 dark:text-yellow-300">Zig</span>istry
          </span>
        </a>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="size-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 p-4 font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0   md:p-0 rtl:space-x-reverse">
            <li>
              <a
                href="/"
                className="block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
              >
                Packages
              </a>
            </li>
            <li>
              <a
                href="/programs"
                className="block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
              >
                Programs
              </a>
            </li>
            <li>
              <a
                href="/statistics"
                className="block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
              >
                Statistics
              </a>
            </li>
            <li>
              <a
                href="/apps"
                className="block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
              >
                Apps
              </a>
            </li>
            <li>
              <a
                href="/API-docs"
                className="block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
              >
                API
              </a>
            </li>
            <li>
              <a
                href="/about"
                className="block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="/help"
                className="block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
              >
                Help
              </a>
            </li>
            <li className="mt-0.5">
              <GitHubButton
                href="https://github.com/zigistry/zigistry"
                data-color-scheme="no-preference: light; light: light; dark: dark;"
                data-icon="octicon-star"
                data-show-count="true"
                aria-label="Star zigistry/zigistry on GitHub"
              >
                Star
              </GitHubButton>
            </li>
            <li>
              <button id="theme-toggle" type="button" className="rounded-lg p-1 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-700">
                <svg id="theme-toggle-dark-icon" className="hidden size-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>
                <svg id="theme-toggle-light-icon" className="hidden size-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
