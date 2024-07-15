/*===============================================================================*/
/*                               Foooter Component                               */
/*===============================================================================*/

/*
 | Author:
 | Rohan Vashisht
 |
 | Details:
 | This is the default Footer (Foooter) component.
 | Please check license file for copyright details.
 */

// ===================
//       Imports
// ===================

// ------- Components ---------
import { Footer, FooterCopyright, FooterLink, FooterLinkGroup } from "flowbite-react";


// ============================================
//       Exports default Foooter component
// ============================================
export default function Foooter() {
  return (
    <Footer container>
      <FooterCopyright href="/" by="Rohan Vashisht" year={2024} />
      <FooterLinkGroup>
        <FooterLink href="/about">About</FooterLink>
        <FooterLink href="/help">Help</FooterLink>    
        <FooterLink href="https://github.com/RohanVashisht1234/zigistry">GitHub</FooterLink>
      </FooterLinkGroup>
    </Footer>
  );
}
