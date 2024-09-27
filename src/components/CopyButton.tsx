export default function CopyButton(props: { text_to_copy: string }) {
    function rename_button() {
        const z = document.getElementById("copybutton") as HTMLElement;
        z.innerText = "Copy";
    }
    function copy_text() {
        navigator.clipboard.writeText(props.text_to_copy);
        const z = document.getElementById("copybutton") as HTMLElement;
        z.innerText = "Copied";
        setTimeout(rename_button, 600)

    }
    return (
        <button id="copybutton" onClick={copy_text} className="ml-5 rounded bg-slate-400 px-7 py-4 text-black focus:border-4 focus:border-sky-400 dark:bg-blue-800 dark:text-white">
            Copy
        </button>
    )
}