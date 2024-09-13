//!===============================================================
//!                 Helper functoins provider
//!===============================================================
//!	Author  : Rohan Vashisht
//! License : Please check license file
//! Details : I don't like repeating functions, hence, I have added
//! this file, from which other files can import common functions.
//! Infact, this library has enough functions to become 4 different
//! npm packages. Strictly DRY method is followed.
//!===============================================================

// ===================
//       Imports
// ===================

// ------- Methods ---------
import { highlightElements, zig, bash, diff } from "zilite";

// ===================
//      Functoins
// ===================

// ------ Numbers to special notations converstion. ------
export function numberAsLetters(i: number): string {
  const numberAsString = i.toString();
  if (numberAsString.length > 3) return (i / 1000).toString().slice(0, 3) + "K";
  else return numberAsString;
}

// ----- Highlight code present inside README's of each package/program ------
export function highlightCode(): void {
  highlightElements(zig, "language-zig");
  highlightElements(diff, "language-diff");
  highlightElements(bash, "language-bash");
}
