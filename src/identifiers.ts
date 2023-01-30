import {CalculationFunction} from "./types"

export function getIdentifiersFromFunction(fn:CalculationFunction){
    let strFn = fn.toString()

    return getValidIdentifiers(strFn)
}

const keywords = [
    "break",
    "case",
    "catch",
    "class",
    "const",
    "continue",
    "debugger",
    "default",
    "delete",
    "do",
    "else",
    "enum",
    "export",
    "extends",
    "false",
    "finally",
    "for",
    "function",
    "if",
    "import",
    "in",
    "instanceof",
    "new",
    "null",
    "return",
    "super",
    "switch",
    "this",
    "throw",
    "true",
    "try",
    "typeof",
    "var",
    "void",
    "while",
    "with",
    "yield",
  ];

function getValidIdentifiers(code: string): string[] {
    // Remove single-line comments
    code = code.replace(/\/\/.*/g, "");
  
    // Remove multi-line comments
    code = code.replace(/\/\*[\s\S]*?\*\//g, "");
  
    const pattern = /\b[a-zA-Z_$][\w$]*\b/g;
    const matches = code.match(pattern);
    const all = Array.from(new Set(matches));
    const locals = getLocalVariables(code)

    const res = all.filter((w)=>{
        if(keywords.includes(w) || locals.includes(w)){
            return false
        }else{
            return true
        }})

    return res
  }

  function getLocalVariables(code:string):string[]{
    const pattern = new RegExp(
        `(var|let|const)\\s+([^;=]+?)[;=]`,
        "g"
      );
    
      const matches = code.match(pattern);
      const variables = matches
        ? matches.map((m) => m.split(" ")[1].trim())
        : [];

    return variables
  }
  