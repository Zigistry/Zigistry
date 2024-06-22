import { Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from "flowbite-react";
import logo from "../assets/logo.svg";

export function Header() {
  return (
    <Navbar className="border-b-orange-300" style={{ borderBottom: "2px solid #faca15" }} rounded>
      <NavbarBrand href="/">
        <span className="self-center whitespace-nowrap dark:text-white font-extrabold text-2xl"><span class="text-yellow-300">Zig</span>istry</span>
      </NavbarBrand>
      <NavbarToggle />
      <NavbarCollapse>
        <NavbarLink href="/" active>
          Home
        </NavbarLink>
        <NavbarLink href="/">
          About
        </NavbarLink>
        <NavbarLink href="#">Services</NavbarLink>
        <NavbarLink href="#">Pricing</NavbarLink>
        <NavbarLink href="#">Contact</NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
}
