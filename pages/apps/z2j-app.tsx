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
import zon2json from "z2j";
import { highlight, zig } from "zilite";
import { Clipboard } from "flowbite-react";
import { useState } from "react";

// ================================
//      Exports "/apps/z2j-app"
// ================================
export default function Z2j_app() {
  function scrollActualPseudoEditorTogether() {
    var s1 = document.getElementById('pseudo_editor') as HTMLElement;
    var s2 = document.getElementById('actual_editor') as HTMLElement;
    var output = document.getElementById("output") as HTMLElement;
    s1.scrollTop = s2.scrollTop;
    output.scrollTop = s2.scrollTop;
  }

  const [outputValue, set_outputValue] = useState("");

  function hotReload() {
    var actualEditor = document.getElementById(
      "actual_editor",
    ) as HTMLInputElement;
    
    var pseudoEditor = document.getElementById("pseudo_editor") as HTMLElement;
    var output = document.getElementById("output") as HTMLElement;
    pseudoEditor.innerHTML = highlight(zig, actualEditor.value);
    const answer = zon2json(actualEditor.value);
    output.innerHTML = highlight(zig, answer);
    output.innerHTML = highlight(zig, answer);
    pseudoEditor.scrollTop = actualEditor.scrollTop;
    output.scrollTop = actualEditor.scrollTop;
    set_outputValue(answer);
  }
  return (
    <>
      <div className="Navbar pl-2 space-x-2 flex h-[40px]">
        <Clipboard valueToCopy={outputValue} label="Copy Output" />
      </div>
      <div className="h-[calc(100vh-172px)] w-screen flex">
        <div className="block w-1/2">
          <div
            id="pseudo_editor"
            className="font-mono h-[calc(100vh-172px)] absolute overflow-y-scroll left-0 top-[102px] w-1/2 z-10 text-wrap text-left break-words"
          ></div>
          <textarea
            onScroll={scrollActualPseudoEditorTogether}
            wrap="hard"
            placeholder="Paste Zon here"
            onChange={hotReload}
            id="actual_editor"
            autoCapitalize="false"
            autoFocus
            autoCorrect="false"
            autoComplete="false"
            className="bg-transparent border-r-2 border-white absolute left-0 top-[102px] p-0 font-mono caret-white text-transparent z-20 w-1/2 h-[calc(100vh-172px)]"
             ></textarea>
        </div>
        <div id="output" className="block font-mono w-1/2 p-2 text-wrap break-words overflow-y-scroll">
          Get json here
        </div>
      </div>
    </>
  );
}
