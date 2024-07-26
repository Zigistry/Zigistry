//!===============================================================
//!                 Helper functoins provider
//!===============================================================
//!	Author  : Rohan Vashisht
//! License : Please check license file
//! Details : I don't like repeating functions, hence, I have added
//! this file, from which other files can import common functions.
//!===============================================================


// ------ Numbers to special notations ------
export function numberAsLetters(i: number) {
    if (i.toString().length > 3) {
        return (i / 1000).toString().slice(0, 3) + "K";
    } else {
        return i.toString();
    }
}
