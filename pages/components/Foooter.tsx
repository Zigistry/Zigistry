import { Footer, FooterCopyright, FooterLink, FooterLinkGroup } from "flowbite-react";

export function Foooter() {
  return (
    <Footer container>
      <FooterCopyright href="/" by="Rohan Vashisht" year={2024} />
      <FooterLinkGroup>
        <FooterLink href="/about">About</FooterLink>
        <FooterLink href="/terms_and_conditions">Terms and Conditions</FooterLink>
        <FooterLink href="/license">Licensing</FooterLink>
        <FooterLink href="/contact">Contact</FooterLink>    
        <FooterLink href="/GitHub">GitHub</FooterLink>
      </FooterLinkGroup>
    </Footer>
  );
}