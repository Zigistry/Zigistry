import { Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";
import Link from "next/link";

export default function Header(): JSX.Element {
  return (
    <Navbar className="border-b-orange-300" style={{ borderBottom: "2px solid #faca15" }} rounded>
      <NavbarBrand as={Link} href="/">
        <span className="self-center whitespace-nowrap dark:text-white font-extrabold text-2xl">
          <span className="text-yellow-300">Zig</span>istry
        </span>
      </NavbarBrand>
      <NavbarToggle />
      <NavbarCollapse>
        <NavbarLink as={Link} href="/" active>Home</NavbarLink>
        <NavbarLink as={Link} href="/about" active>About</NavbarLink>
        <NavbarLink as={Link} className="github-button" href="https://github.com/rohanvashisht1234/zigistry" data-color-scheme="no-preference: dark_dimmed; light: dark_dimmed; dark: dark_dimmed;" data-size="small" data-show-count="true" aria-label="Star rohanvashisht1234/zigistry on GitHub">Star</NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
}
