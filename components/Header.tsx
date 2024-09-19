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
import Link from "next/link";
import { DarkThemeToggle, Flowbite } from "flowbite-react";

// =====================================
//       Export navbar component
// =====================================
export default function Header(): JSX.Element {
  // Using as={Link} to avoid page reloading.
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
      <NavbarBrand as={Link} href="/">
        <span className="self-center whitespace-nowrap dark:text-white font-extrabold text-2xl">
          <span className="dark:text-yellow-300 text-amber-400">Zig</span>istry
        </span>
      </NavbarBrand>
      <NavbarToggle />
      <NavbarCollapse>
        <NavbarLink as={Link} href="/" active>
          Packages
        </NavbarLink>
        <NavbarLink as={Link} href="/programs" active>
          Programs
        </NavbarLink>
        <NavbarLink as={Link} href="/statistics" active>
          Statistics
        </NavbarLink>
        <NavbarLink as={Link} href="/apps" active>
          Apps
        </NavbarLink>
        <NavbarLink as={Link} href="/API-docs" active>
          API
        </NavbarLink>
        <NavbarLink as={Link} href="/about" active>
          About
        </NavbarLink>
        <NavbarLink as={Link} href="/help" active>
          Help
        </NavbarLink>
        <NavbarLink
          as={Link}
          className="github-button"
          href="https://github.com/zigistry/zigistry"
          data-color-scheme="no-preference: light; light: light; dark:dark_dimmed;"
          data-size="small"
          data-show-count="true"
          aria-label="Star zigistry/zigistry on GitHub"
        >
          Star
        </NavbarLink>
        <Flowbite>
          <DarkThemeToggle className="w-4 py-0 pr-7" />
        </Flowbite>
      </NavbarCollapse>
    </Navbar>
  );
}
