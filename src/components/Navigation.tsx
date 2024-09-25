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
import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import { DarkThemeToggle, Flowbite } from "flowbite-react";
import GitHubButton from 'react-github-btn'

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
    <Navbar
      className="border-b-orange-300"
      style={{ borderBottom: "2px solid #faca15" }}
      rounded
    >
      <NavbarBrand href="/">
          <span className="self-center whitespace-nowrap text-2xl font-extrabold dark:text-white">
            <span className="text-amber-400 dark:text-yellow-300">Zig</span>istry
          </span>
      </NavbarBrand>
      <NavbarToggle />
      <NavbarCollapse>
        <NavbarLink href="/" active>
          Packages
        </NavbarLink>
        <NavbarLink href="/programs" active>
          Programs
        </NavbarLink>
        <NavbarLink href="/statistics" active>
          Statistics
        </NavbarLink>
        <NavbarLink href="/apps" active>
          Apps
        </NavbarLink>
        <NavbarLink href="/API-docs" active>
          API
        </NavbarLink>
        <NavbarLink href="/about" active>
          About
        </NavbarLink>
        <NavbarLink href="/help" active>
          Help
        </NavbarLink>
        {/* <NavbarLink
          class="github-button"
          href="https://github.com/zigistry/zigistry"
          data-color-scheme="no-preference: light; light: light; dark:dark_dimmed;"
          data-size="small"
          data-show-count="true"
          aria-label="Star zigistry/zigistry on GitHub"
        >
          Star
        </NavbarLink> */}
        <GitHubButton href="https://github.com/zigistry/zigistry" data-color-scheme="no-preference: light; light: light; dark: dark;" data-icon="octicon-star" data-show-count="true" aria-label="Star zigistry/zigistry on GitHub">Star</GitHubButton>
        <Flowbite>
          <DarkThemeToggle className="w-4 py-0 pr-7" />
        </Flowbite>
      </NavbarCollapse>
    </Navbar>
  );
}
