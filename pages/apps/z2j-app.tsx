import { zon2json } from "z2j";
import { highlight, zig } from "zilite";


export default function z2j_app() {
    function sdf() {
        var ae = document.getElementById("actual_editor") as HTMLInputElement;
        var pe = document.getElementById("pseudo_editor") as HTMLElement;
        var op = document.getElementById("output") as HTMLElement;
        pe.innerHTML = highlight(zig, ae.value);
        op.innerHTML = highlight(zig,zon2json(ae.value));
    }
    return (
        <>
            <div className="h-screen w-screen flex">
                <div className="block w-1/2">
                    <textarea placeholder="Paste Zon here" onChange={sdf} id="actual_editor" autoCapitalize="false" autoCorrect="false" autoFocus={true} autoComplete="false" className="bg-transparent font-mono caret-white text-transparent w-full h-screen z-10"></textarea>
                    <div id="pseudo_editor" className="font-mono absolute left-3 top-[62px] h-screen">

                    </div>
                </div>
                <div id="output" className="block font-mono w-1/2 p-2">
Get json here
                </div>
            </div>
        </>
    )
}