import { useState } from "react";
import zon2json from "z2j";
import { highlight, zig } from "zilite";

export default function Z2j_app() {
  function scrollActualPseudoEditorTogether() {
    const s1 = document.getElementById('pseudo_editor') as HTMLElement;
    const s2 = document.getElementById('actual_editor') as HTMLElement;
    const output = document.getElementById("output") as HTMLElement;
    s1.scrollTop = s2.scrollTop;
    output.scrollTop = s2.scrollTop;
  }

  const [outputValue, set_outputValue] = useState("");

  function hotReload() {
    const actualEditor = document.getElementById(
      "actual_editor",
    ) as HTMLInputElement;
    const pseudoEditor = document.getElementById("pseudo_editor") as HTMLElement;
    const output = document.getElementById("output") as HTMLElement;
    pseudoEditor.innerHTML = highlight(zig, actualEditor.value);
    const answer = zon2json(actualEditor.value);
    output.innerHTML = highlight(zig, answer);
    output.innerHTML = highlight(zig, answer);
    pseudoEditor.scrollTop = actualEditor.scrollTop;
    output.scrollTop = actualEditor.scrollTop;
    set_outputValue(answer);
    console.log("asdf" + outputValue);
  }
  return (
    <>
      <div className="mt-1 flex h-[40px] space-x-2 pl-2" >
      </div>
      <div className="flex h-[calc(100vh-172px)] w-screen" >
        <div className="block w-1/2" >
          <div
            id="pseudo_editor"
            className="absolute left-0 top-[102px] z-10 m-2 h-[calc(100vh-200px)] w-1/2 overflow-y-scroll text-wrap break-words rounded-lg bg-[#2a3038] p-4 text-left font-mono text-white"
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
            className="absolute  left-0 top-[102px]  z-20 m-2 h-[calc(100vh-200px)] w-1/2 border-r-2 border-white bg-transparent p-4 font-mono text-transparent caret-white"
          ></textarea>
        </div>
        < div id="output" className="ml-10 mr-2 mt-3 block h-[calc(100vh-200px)] w-1/2 overflow-y-scroll text-wrap break-words rounded-lg bg-[#263554] p-4 font-mono" >
          Get json here
        </div>
      </div>
    </>
  );
}
