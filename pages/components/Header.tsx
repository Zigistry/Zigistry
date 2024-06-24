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
        <NavbarLink>About</NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
}
