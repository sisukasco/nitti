import {CalculationFunction} from "./types"
declare global {
  interface Window { 
      [key:string]: CalculationFunction; 
  }
}


export function getVariablesUsed(fnn:CalculationFunction):string[]{

    return getParametersUsed(fnn.toString())
}

export function extractParameters(code: string): string[] {
    const params = code.match(/\(([^)]*)\)/)![1];
    return params.split(',').map(p => p.trim());
}

export function getParametersUsed(code:string){

    // Remove single-line comments
    code = code.replace(/\/\/.*/g, "");

    // Remove multi-line comments
    code = code.replace(/\/\*[\s\S]*?\*\//g, "");

    const params = extractParameters(code)
    if(params.length <= 0 ){
        return []
    }

    const strregex = `\\b(${params[0]})\\.([a-zA-Z_$][\\w$]*)\\b`

    const pattern = new RegExp(strregex, "g");

    const matches =  code.match(pattern)

    const fullvar = Array.from(new Set(matches));

    const variables = fullvar.map((m) => m.split(".")[1])
    
    return variables
}


export function getValidIdentifiers(code: string): string[] {
    // Remove single-line comments
    code = code.replace(/\/\/.*/g, "");
  
    // Remove multi-line comments
    code = code.replace(/\/\*[\s\S]*?\*\//g, "");
  
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
  
    const pattern = new RegExp(
      `\\b(?!${keywords.join("|")})[a-zA-Z_$][\\w$]*\\b`,
      "g"
    );
  
    const matches = code.match(pattern);
    return Array.from(new Set(matches));
  }


  type CalcFunc = {
    fn: CalculationFunction,
    vars: string[]
  }
  
  export function createFunctionFromCode(code:string):CalcFunc{

    const vars = getValidIdentifiers(code)

    let param = vars.join(",")

    param ="{"+param+"}"

    const fncode = `
    let result = 0
    try{
        result = ${code};
    }catch(e){
        result = 0
    }
    return(result);
    `
    const newFn = new Function(param, fncode)

    return({
        fn: <CalculationFunction>(newFn),
        vars
    })
    
  }
  

export function getGlobalFunction(fnname:string){
    if (typeof window[fnname] == "function"){
        return window[fnname]
    }

    return null
}


