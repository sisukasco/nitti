
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
