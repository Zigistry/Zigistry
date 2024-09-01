//!===============================================================
//!                 Helper functoins provider
//!===============================================================
//!	Author  : Rohan Vashisht
//! License : Please check license file
//! Details : I don't like repeating functions, hence, I have added
//! this file, from which other files can import common functions.
//!===============================================================


// ------ Numbers to special notations ------
export function numberAsLetters(i: number) {
  if (i.toString().length > 3) {
    return (i / 1000).toString().slice(0, 3) + "K";
  } else {
    return i.toString();
  }
}

export function highlight_zig_code(code: string): string {
  // Use unique placeholders to avoid conflicts
  code = code.replace(/ /g, "±±§§±±§§");
  code = code.replace(/=/g, "±§±§±§±§");

  const patterns = [
    { regex: /"(?:[^"\\]|\\.)*"/g, className: 'dark:dark_string string' },
    { regex: /'([^'\\]|\\.)'/g, className: 'char' },
    { regex: /\\\\.*$/gm, className: 'string' },
    { regex: /\/\/.*$/gm, className: 'comment' },
    { regex: /\b(const|try|var|return|if|else|while|for|switch|break|catch|continue|struct|enum|pub|use|extern|export|inline|noalias|align|defer|fn)\b/g, className: 'keyword' },
    { regex: /\b(true|false|null)\b/g, className: 'boolean' },
    { regex: /\b(?:u\d+|i\d+|f\d+|bool|void|noreturn|type|isize|usize|c_void|c_int|c_long|c_ulong|c_float|c_double)\b/g, className: 'type' },
    { regex: /\b\d+(\.\d+)?\b/g, className: 'number' },
    { regex: /\b(\w+)\s*(?=\()/g, className: 'function' },
    { regex: /@/g, className: 'function' },
    { regex: /[\{\}\[\]\(\)\,.]/g, className: 'operators' },
    { regex: /(?<!&\w{0,10});(?!\w*;)/g, className: 'operators' },
    { regex: /±§±§±§±§/g, className: 'operators' },  // Placeholder for '='
    { regex: /±±±§§§/g, className: 'operators' },  // Placeholder for '='
  ];

  patterns.forEach(({ regex, className }) => {
    code = code.replace(regex, (match: string) => `<span class="${className}">${match}</span>`);
  });

  // Restore placeholders
  code = code.replace(/±±§§±±§§/g, "&nbsp;");
  code = code.replace(/±§±§±§±§/g, "=");

  code = code.replace(/\n/g, "<br/>");

  return code;
}

export function highlight_bash_code(code: string): string {
  // Use unique placeholders to avoid conflicts
  code = code.replace(/ /g, "±±§§±±§§");
  code = code.replace(/=/g, "±§±§±§±§");

  const patterns = [
    { regex: /"(?:[^"\\]|\\.)*"/g, className: 'string' },
    { regex: /'([^'\\]|\\.)'/g, className: 'char' },
    { regex: /\\\\.*$/gm, className: 'string' },
    { regex: /\-\-(\w+)/gm, className: 'comment' },
    { regex: /#.*$/gm, className: 'comment' },
    { regex: /\-\w+/g, className: 'types' },
    { regex: /\b(zig|bash|sh|curl|wget|cd|rm|mkdir|git)\b/g, className: 'keyword' },
    { regex: /\b(true|false|null)\b/g, className: 'boolean' },
    { regex: /\b\d+(\.\d+)?\b/g, className: 'number' },
    { regex: /\b(\w+)\s*(?=\()/g, className: 'function' },
    { regex: /\$/g, className: 'operators' },
    { regex: /(?<!&\w{0,10});(?!\w*;)/g, className: 'operators' },
    { regex: /±§±§±§±§/g, className: 'operators' },  // Placeholder for '='
    { regex: /±±±§§§/g, className: 'operators' },  // Placeholder for '='
  ];

  patterns.forEach(({ regex, className }) => {
    code = code.replace(regex, (match: string) => `<span class="${className}">${match}</span>`);
  });

  // Restore placeholders
  code = code.replace(/±±§§±±§§/g, "&nbsp;");
  code = code.replace(/±§±§±§±§/g, "=");

  code = code.replace(/\n/g, "<br/>");

  return code;
}



export function highlight_zig_diff_code(code: string): string {
  // Use unique placeholders to avoid conflicts
  code = code.replace(/ /g, "±±§§±±§§");
  code = code.replace(/=/g, "±§±§±§±§");

  const patterns = [
    { regex: /"(?:[^"\\]|\\.)*"/g, className: 'string' },
    { regex: /'([^'\\]|\\.)'/g, className: 'char' },
    { regex: /\\\\.*$/gm, className: 'string' },
    { regex: /\/\/.*$/gm, className: 'comment' },
    { regex: /^\+.*$/gm, className: 'diff_add' },
    { regex: /^\-.*$/gm, className: 'diff_subtract' },
    { regex: /\b(const|try|var|return|if|else|while|for|switch|break|catch|continue|struct|enum|pub|use|extern|export|inline|noalias|align|defer|fn)\b/g, className: 'keyword' },
    { regex: /\b(true|false|null)\b/g, className: 'boolean' },
    { regex: /\b(?:u\d+|i\d+|f\d+|bool|void|noreturn|type|isize|usize|c_void|c_int|c_long|c_ulong|c_float|c_double)\b/g, className: 'type' },
    { regex: /\b\d+(\.\d+)?\b/g, className: 'number' },
    { regex: /\b(\w+)\s*(?=\()/g, className: 'function' },
    { regex: /@/g, className: 'function' },
    { regex: /[\{\}\[\]\(\)\,.|:]/g, className: 'operators' },
    { regex: /(?<!&\w{0,10});(?!\w*;)/g, className: 'operators' },
    { regex: /±§±§±§±§/g, className: 'operators' },  // Placeholder for '='
    { regex: /±±±§§§/g, className: 'operators' },  // Placeholder for '='
  ];

  patterns.forEach(({ regex, className }) => {
    code = code.replace(regex, (match: string) => `<span class="${className}">${match}</span>`);
  });

  // Restore placeholders
  code = code.replace(/±±§§±±§§/g, "&nbsp;");
  code = code.replace(/±§±§±§±§/g, "=");

  code = code.replace(/\n/g, "<br/>");

  return code;
}


export function highlight() {
  const ZigCodeContainers: any = document.getElementsByClassName('language-zig');
  for (let pre of ZigCodeContainers) {
    const codeContent = pre.innerHTML;
    const highlightedContent = highlight_zig_code(codeContent);
    pre.innerHTML = highlightedContent;
  }
  const ZigDiffCodeContainers: any = document.getElementsByClassName('language-diff');
  for (let pre of ZigDiffCodeContainers) {
    const codeContent = pre.innerHTML;
    const highlightedContent = highlight_zig_diff_code(codeContent);
    pre.innerHTML = highlightedContent;
  }
  const ZonCodeContainers: any = document.getElementsByClassName('language-zon');
  for (let pre of ZonCodeContainers) {
    const codeContent = pre.innerHTML;
    const highlightedContent = highlight_zig_code(codeContent);
    pre.innerHTML = highlightedContent;
  }
  const BashCodeContainers: any = document.getElementsByClassName('language-shell');
  for (let pre of BashCodeContainers) {
    const codeContent = pre.innerHTML;
    const highlightedContent = highlight_bash_code(codeContent);
    pre.innerHTML = highlightedContent;
  }
  const ShCodeContainers: any = document.getElementsByClassName('language-sh');
  for (let pre of ShCodeContainers) {
    const codeContent = pre.innerHTML;
    const highlightedContent = highlight_bash_code(codeContent);
    pre.innerHTML = highlightedContent;
  }
};


function removeComments(input: string):string {
  // Match strings and comments separately
  return input.replace(/("(?:\\.|[^"\\])*")|\/\/.*|\/\*[\s\S]*?\*\//g, (match, stringMatch) => {
    // If it's a string, return it unchanged
    if (stringMatch !== undefined) {
      return stringMatch;
    }
    // Otherwise, it's a comment, so remove it
    return '';
  });
}

export function zon2json(input: string) {
  input = removeComments(input);

  // input = input.replace(/\/\/.*$/gm, ''); // Remove single-line comments
  input = input.replace(/\.{/, '{');

  // Replace .field = "value" with "field": "value"
  input = input.replace(/\.([a-zA-Z0-9_-]+)\s*=\s*/g, '"$1": ');

  // Handle the @"raylib-zig" case
  input = input.replace(/\.\@"([\w\-\.]+)"\s*=\s*\./g, '"$1": ');

  // Replace arrays in the format .{ "value1", "value2", ... } with [ "value1", "value2", ... ]
  input = input.replace(/\.{\s*("[^"]*"\s*,?\s*)+\s*}/g, match => {
    return match
      .replace(/\.{/, '[')
      .replace(/}\s*$/, ']')
      .replace(/,\s*]/, ']'); // Remove the trailing comma before closing ]
  });

  // Remove extra dots before opening braces
  input = input.replace(/\.\s*\{/g, '{');

  // Remove commas after the last element in objects or arrays (JSON doesn't allow trailing commas)
  input = input.replace(/,(\s*[}\]])/g, '$1');
  return input;
}