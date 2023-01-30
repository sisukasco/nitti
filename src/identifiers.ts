import {CalculationFunction} from "./types"


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

