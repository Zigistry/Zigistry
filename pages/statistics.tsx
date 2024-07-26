//!===============================================================
//!                 Statistics Page "/statistics"
//!===============================================================
//!	Author  : Rohan Vashisht
//! License : Please check license file
//! Details : This is the statistics page which displayes the
//! statistics of libraries indexed by Zigistry.
//!===============================================================

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
          <img className="w-3/5" src="/license_chart.svg" />
        </div>
        {/* <h3>Most common topics used by Zig libraries:</h3>
                <div className="flex justify-center">
                    <img className="w-3/5" src="/topics_chart.svg" />
                </div> */}
      </div>
    </div>
  );
}
