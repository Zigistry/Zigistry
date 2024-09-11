//!===============================================================
//!                 Statistics Page "/statistics"
//!===============================================================
//!	Author  : Rohan Vashisht
//! License : Please check license file
//! Details : This is the statistics page which displayes the
//! statistics of libraries indexed by Zigistry.
//!===============================================================

// ==============================
//            Imports
// ==============================

import Image from "next/image";

// ==============================
//      Exports "/statistics"
// ==============================
export default function statistics() {
  return (
    <div className="readme">
      <div className="readmeDiv">
        <h1>Here are some of the statistics that Zigistry found:</h1>
        <h3>Most common licenses used by Zig libraries:</h3>
        <div className="flex justify-center">
          <Image
            width={200}
            height={200}
            className="w-3/5"
            alt="Pie chart graph of most common licenses used by Zig libraries."
            src="/license_chart.svg"
          />
        </div>
        <h3>Average *storage size of Zig libraries: 6898KB or 6.898MB.</h3>
        <h3>Most common licenses used by Zig programs:</h3>
        <div className="flex justify-center">
          <Image
            width={200}
            height={200}
            className="w-3/5"
            alt="Pie chart graph of most common licenses used by Zig programs."
            src="/programs.svg"
          />
        </div>
        <h3>Average *storage size of Zig programs: 6232KB or 6.232MB.</h3>
        <h6>
          * : this includes everything in the repository, from images till src
          code.
        </h6>
      </div>
    </div>
  );
}
