if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.classList.add('dark');
}

// function zigSyntaxHighlighter(code) {
//     code = code.replaceAll(" ", "±±§§±±§§");

//     // Define regex patterns for various Zig syntax elements
//     const patterns = [
//         { regex: /"(?:\\.|[^"\\])*"/g, className: 'string' }, 
//         { regex: /\/\/.*$/gm, className: 'comment' },               // Strings
//         { regex: /'([^'\\])'/g, className: 'char' },                // Characters
//         { regex: /\b(const|try|var|return|if|else|while|for|switch|break|continue|struct|enum|pub|use|extern|export|inline|noalias|align|defer)\b/g, className: 'keyword' }, // Keywords
//         { regex: /\b(fn)\b/g, className: 'keyword2' }, // Keywords
//         { regex: /\b(true|false|null)\b/g, className: 'boolean' },        // Booleans
//         { regex: /\b(?:u[0-9]+|i[0-9]+|f[0-9]+|bool|void|noreturn|type|c_void|c_int|c_long|c_ulong|c_float|c_double)\b/g, className: 'type' }, // Types
//         { regex: /\b\d+(\.\d+)?\b/g, className: 'number' },               // Numbers
//         { regex: /\b(\w+)\s*(?=\()/g, className: 'function' },         // Function names (with @ included)
//         { regex: /(\@)/g, className: 'function' },         // Function names (with @ included)
//         { regex: /(\{|\}|\[|\]|\(|\)|\;|\,|\.|\|)/g, className: 'operators' } // operators
//     ];

//     // Apply syntax highlighting by replacing matched patterns with HTML tags
//     patterns.forEach(single_pattern => {
//         code = code.replace(single_pattern.regex, match => `<span class="${single_pattern.className}">${match}</span>`);
//     });
//     code = code.replaceAll("±±§§±±§§", "&nbsp;");
//     code = "<div style='background-color:#1e1e1e;'>" + code + "</div>";
//     code = code.replaceAll("\n", "<br/>");
//     return code;
// };

// const zigCode = document.getElementsByClassName("language-zig").innerHTML;


// let highlightedCode = zigSyntaxHighlighter(zigCode);
// document.getElementsByClassName("language-zig").innerHTML = highlightedCode;