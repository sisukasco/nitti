import {CalculationFunction} from "./types"
import {getUtilFunctionNames} from "./functions"

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

//  \(\{([^\}]*)\}\,?.*\)

export function getDestructuredParamVariables(funcStr:string):Boolean|string[]{
  const destructuredArgRegex = /\(\s*\{([^}]*)\}(\s*,\s*\{([^}]*)\})?\s*\)/gm;
  const destructuredArgMatch = destructuredArgRegex.exec(funcStr);
  
  if (destructuredArgMatch) {
    const destructuredArgStr = destructuredArgMatch[1];
    const destructuredArgs = destructuredArgStr.split(',').map(arg => arg.trim());
    return destructuredArgs;
  }else{
    return false;
  }
  
}

export function getParametersUsed(code:string):string[]{

    const dparams = getDestructuredParamVariables(code)

    
    if(dparams !== false){
      return(dparams as string[]);
    }

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
      "Math"
    ];
  
    const utils = getUtilFunctionNames()

    const reserved = keywords.concat(utils)

    const regex = /(?<!Math\.)\b[a-zA-Z_$][a-zA-Z_$0-9]*\b/g;
  
    const matches = code.match(regex);
    const variables = matches?.filter((id)=>!reserved.includes(id))

    return Array.from(new Set(variables));
  }


  type CalcFunc = {
    fn: CalculationFunction,
    vars: string[]
  }
  
  export function createFunctionFromCode(code:string, varsInForm?:string[]):CalcFunc{

    let vars = getValidIdentifiers(code)

    if(varsInForm){
        vars = vars.filter((v)=>varsInForm.includes(v))
    }
    
    /**
     ** First parameter is the variables expanded. Second parameter is the utility functions.
     **  
     */
    const param ="{"+vars.join(",")+"}, "+"{" + getUtilFunctionNames().join(",") + "}"

    const fncode = `
    let result = 0;

    result = ${code};

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
        return <CalculationFunction>window[fnname]
    } 
    
    return null
}


