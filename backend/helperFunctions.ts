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
export function highlight_my_code(code: string): string {
  // Use unique placeholders to avoid conflicts
  code = code.replace(/ /g, "±±§§±±§§");
  code = code.replace(/=/g, "±§±§±§±§");

  const patterns = [
    { regex: /"(?:[^"\\]|\\.)*"/g, className: 'string' },
    { regex: /'([^'\\]|\\.)'/g, className: 'char' },
    { regex: /\/\/.*$/gm, className: 'comment' },
    { regex: /\/\*[\s\S]*?\*\//gm, className: 'comment' },
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
