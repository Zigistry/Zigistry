//!===============================================================
//!                 Helper functoins provider
//!===============================================================
//!	Author  : Rohan Vashisht
//! License : Please check license file
//! Details : I don't like repeating functions, hence, I have added
//! this file, from which other files can import common functions.
//! Infact, this library has enough functions to become 4 different
//! npm packages.
//!===============================================================
import { highlightElements, zig, bash, diff } from "zilite";
// Use bash, zig, or diff in the highlighting function

// ------ Numbers to special notations ------
export function numberAsLetters(i: number): string {
  const numberAsString = i.toString();
  if (numberAsString.length > 3)
    return (i / 1000).toString().slice(0, 3) + "K";
  else
    return numberAsString;
}

export function highlightCode() {
  highlightElements(zig, "language-zig");
  highlightElements(bash, "language-diff");
  highlightElements(diff, "language-bash");
}