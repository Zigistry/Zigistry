//!===============================================================
//!                     About Page "/about"
//!===============================================================
//!	Author  : Rohan Vashisht
//! License : Please check license file
//! Details : The about page.
//!===============================================================

// ===================
//       Imports
// ===================

// ------- Components ---------
import { BsFillLightningChargeFill } from "react-icons/bs";

// =============================
//       Exports "/about"
// =============================
export default function About() {
  return (
      <div className="flex items-center justify-center" style={{ height: "calc(100vh - 122px)" }}>
          <div className="">
              <span className="self-center italic whitespace-nowrap dark:text-white text-5xl font-extrabold flex">
                  <span className="text-yellow-300 flex"><BsFillLightningChargeFill />Zig</span>istry
              </span>
              <h2 className="text-2xl italic mt-2">A place where you can find all the libraries that suit your Zig lang needs.</h2>
              <h3 className="text-2xl text-right italic">- Rohan Vashisht</h3>
          </div>
      </div>
  )
}
