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
import { act } from "react-dom/test-utils";

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
      <div className="pl-2 space-x-2 flex h-[40px] mt-1">
        <Clipboard valueToCopy={outputValue} label="Copy Output" />
      </div>
      <div className="h-[calc(100vh-172px)] w-screen flex">
        <div className="block w-1/2">
          <div
            id="pseudo_editor"
            className="font-mono rounded-lg m-2 text-white bg-[#2a3038] p-4 h-[calc(100vh-200px)] absolute overflow-y-scroll left-0 top-[102px] w-1/2 z-10 text-wrap text-left break-words"
          ></div>
          <textarea
            onScroll={scrollActualPseudoEditorTogether}
            wrap="hard"
            placeholder={"Paste/type Zon here"}
            onChange={hotReload}
            id="actual_editor"
            autoCapitalize="false"
            autoFocus
            autoCorrect="false"
            autoComplete="false"
            className="bg-transparent  m-2 p-4  border-r-2 border-white absolute left-0 top-[102px] font-mono caret-white text-transparent z-20 w-1/2 h-[calc(100vh-200px)]"
          ></textarea>
        </div>
        <div id="output" className="block h-[calc(100vh-200px)] bg-[#263554] ml-10 mr-2 mt-3 rounded-lg font-mono w-1/2 p-4 text-wrap break-words overflow-y-scroll">
          Get json here
        </div>
      </div>
    </>
  );
}
