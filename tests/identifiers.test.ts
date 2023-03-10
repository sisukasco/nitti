
import {extractParameters, getParametersUsed, getValidIdentifiers,createFunctionFromCode} from "../src/identifiers"



test("get function parameters",()=>{

    const fn = (formdata:any)=>{
        /**
         * this function should be called like this
         * function(fkkk)
         * 
         */
        return formdata.qty*10
    }


    const params = extractParameters(fn.toString())

    console.log("params ", params)
})

test("get parameters_used",()=>{

    const fn = (formdata:any)=>{
        /**
         * this function should be called like this
         * function(fkkk)
         * formdata.invalid
         * 
         */
        //formdata.invalid
        let res = formdata.items[0].qty * formdata.items[0].price + formdata.global
        return res
    }


    const variables = getParametersUsed(fn.toString())

    expect(variables).not.toBe(false)

    variables && expect(variables.includes("invalid")).toBe(false)

    variables && expect(variables.includes("res")).toBe(false)

    variables && expect(variables.includes("items")).toBe(true)

    variables && expect(variables.includes("global")).toBe(true)
})

test("get parameters_used different format",()=>{

    function another(ffd:any){
        if(ffd.isCorrect){
            return ffd.firstName + ffd.lastName
        }
        // ffd.invalidmember
        /** ffd.another */
        return ffd.items[0].qty * ffd.items[0].price 
    }


    const variables = getParametersUsed(another.toString())

    expect(variables).not.toBe(false)

    variables && expect(variables.includes("invalidmember")).toBe(false)

    variables && expect(variables.includes("another")).toBe(false)

    variables && expect(variables.includes("items")).toBe(true)

    variables && expect(variables.includes("firstName")).toBe(true)

    variables && expect(variables.includes("isCorrect")).toBe(true)

    variables && expect(variables.includes("lastName")).toBe(true)

})

test("get identifiers from raw code",()=>{

    const variables = getValidIdentifiers("item1 * qty1")

    expect(variables.includes("item1")).toBe(true)

    expect(variables.includes("qty1")).toBe(true)

})


test("get identifiers from code with brackets",()=>{

    const variables = getValidIdentifiers("((item1 * qty1) + (item2 * qty2))*1/2")

    expect(variables.includes("item1")).toBe(true)

    expect(variables.includes("qty1")).toBe(true)

})


test("idmath100: get identifiers from code with Math Function calls",()=>{

    const variables = getValidIdentifiers("Math.pow(param1, param2)")

    expect(variables.includes("param1")).toBe(true)

    expect(variables.includes("param2")).toBe(true)

    expect(variables.includes("pow")).toBe(false)

    expect(variables.includes("Math")).toBe(false)

})

test("creating function from code", ()=>{


    const {fn,} = createFunctionFromCode("item1 * qty1")

    const it ={
        item1: 10,
        qty1: 2
    }
    expect(fn(it,{})).toBe(20)

    const it2 ={
        item1: 3,
        qty1: 5
    }

    expect(fn(it2,{})).toBe(15)
})


test("id1001: get identifiers from code - variables with similar to keywords",()=>{

    const variables = getValidIdentifiers("selectedcake + filling + includecandles + includeinscription + void0")

    expect(variables).toContain("selectedcake")
    expect(variables).toContain("filling")
    expect(variables).toContain("includecandles")
    expect(variables).toContain("includeinscription")
    expect(variables).toContain("void0")
    //expect(variables.includes("qty1")).toBe(true)

})




test("fn001: creating function from code", ()=>{


    const {fn,vars} = createFunctionFromCode("Math.pow(param, po) + 2*Math.pow(param, po)")

    const it ={
        param: 10,
        po: 2
    }
    expect(vars).toContain("param")
    expect(vars).toContain("po")

    expect(vars).not.toContain("pow")
    expect(vars).not.toContain("Math")

    expect(fn(it,{})).not.toBeNaN()


})


test("fn002: expect variables from form", ()=>{
    const {vars} = createFunctionFromCode("paramx1 + paramx2 + paramx3", ["paramx1", "paramx2"])

    expect(vars).toContain("paramx1")
    expect(vars).toContain("paramx2")

    expect(vars).not.toContain("paramx3")

})