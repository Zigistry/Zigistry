import { useState } from "react";
import zon2json from "z2j";
import { highlight, zig } from "zilite";
import CopyButton from "./CopyButton";

export default function Z2j_app() {
  function scrollActualPseudoEditorTogether() {
    const s1 = document.getElementById("pseudo_editor") as HTMLElement;
    const s2 = document.getElementById("actual_editor") as HTMLElement;
    const output = document.getElementById("output") as HTMLElement;
    s1.scrollTop = s2.scrollTop;
    output.scrollTop = s2.scrollTop;
  }

  const [outputValue, set_outputValue] = useState("");

  function hotReload() {
    const actualEditor = document.getElementById(
      "actual_editor",
    ) as HTMLInputElement;
    const pseudoEditor = document.getElementById(
      "pseudo_editor",
    ) as HTMLElement;
    const output = document.getElementById("output") as HTMLElement;
    pseudoEditor.innerHTML = highlight(zig, actualEditor.value);
    const answer = zon2json(actualEditor.value);
    output.innerHTML = highlight(zig, answer);
    output.innerHTML = highlight(zig, answer);
    pseudoEditor.scrollTop = actualEditor.scrollTop;
    output.scrollTop = actualEditor.scrollTop;
    set_outputValue(answer);
    try {
      JSON.parse(answer);
      const outputAnalysis = document.getElementById(
        "outputAnalysis",
      ) as HTMLElement;
      outputAnalysis.innerHTML =
        "<span class='text-bold text-green-500'>Json seems good! &#x2713;</span>";
    } catch (e) {
      const outputAnalysis = document.getElementById(
        "outputAnalysis",
      ) as HTMLElement;
      outputAnalysis.innerHTML = `<span class='text-bold text-red-500'>${e}</span>`;
    }
  }
  function download() {
    const element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(outputValue),
    );
    element.setAttribute("download", "output.json");

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }
  return (
    <>
      <div className="mt-2 flex h-[60px] space-x-2 pl-2">
        <button
          id="downloadJson"
          onClick={download}
          className="rounded bg-slate-400 px-7 py-4 text-black focus:border-4 focus:border-sky-400 dark:bg-blue-800 dark:text-white"
        >
          Download .json
        </button>
        <CopyButton text_to_copy={outputValue} />
      </div>
      <div className="flex h-[calc(100vh-192px)] w-screen">
        <div className="block w-1/2">
          <div
            id="pseudo_editor"
            className="absolute left-0 top-[127px] z-10 m-2 h-[calc(100vh-200px)] w-1/2 overflow-y-scroll text-wrap break-words rounded-lg bg-[#2a3038] p-4 text-left font-mono text-white"
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
            className="absolute  left-0 top-[127px]  z-20 m-2 h-[calc(100vh-200px)] w-1/2 border-r-2 border-white bg-transparent p-4 font-mono text-transparent caret-white"
          ></textarea>
        </div>
        <div className="ml-10 mr-2 mt-[9px] block h-[calc(100vh-200px)] w-1/2 overflow-y-scroll text-wrap break-words rounded-lg bg-[#263554] p-4 font-mono">
          <div id="output" className="h-1/2 text-white">
            Get json here
          </div>
          <div className="h-1/4"></div>
          <div className="h-1/6"></div>
          <div
            id="outputAnalysis"
            className="absolute w-[calc(50vw-50px)] rounded-lg bg-slate-800 p-5"
          >
            Get json analysis here
          </div>
        </div>
      </div>
    </>
  );
}
