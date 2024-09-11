//!===============================================================
//!       Show Library "/apps/z2j-app"
//!===============================================================
//!	Author  : Rohan Vashisht
//! License : Please check license file
//! Details : This page is used to display the details of a
//! Z2j-app which converts Zon to json made by Zigistry and it
//! also works like a tool with hot reloading.
//!===============================================================

// ===================
//       Imports
// ===================

// ----------- Types -----------
import { zon2json } from "z2j";
import { highlight, zig } from "zilite";

// ================================
//      Exports "/apps/z2j-app"
// ================================
export default function z2j_app() {
  function hotReload() {
    var actualEditor = document.getElementById(
      "actual_editor",
    ) as HTMLInputElement;
    var pseudoEditor = document.getElementById("pseudo_editor") as HTMLElement;
    var output = document.getElementById("output") as HTMLElement;
    pseudoEditor.innerHTML = highlight(zig, actualEditor.value);
    output.innerHTML = highlight(zig, zon2json(actualEditor.value));
  }
  return (
    <>
      <div className="h-screen w-screen flex">
        <div className="block w-1/2">
          <textarea
            placeholder="Paste Zon here"
            onChange={hotReload}
            id="actual_editor"
            autoCapitalize="false"
            autoCorrect="false"
            autoFocus={true}
            autoComplete="false"
            className="bg-transparent font-mono caret-white text-transparent w-full h-screen z-10"
          ></textarea>
          <div
            id="pseudo_editor"
            className="font-mono absolute left-3 top-[62px] h-screen"
          ></div>
        </div>
        <div id="output" className="block font-mono w-1/2 p-2">
          Get json here
        </div>
      </div>
    </>
  );
}
