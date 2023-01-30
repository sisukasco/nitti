
import {getIdentifiersFromFunction, extractParameters, getParametersUsed} from "../src/identifiers"

test("get identifiers in a function",()=>{

    const ids = getIdentifiersFromFunction((fd:any)=>{
        /**
         * This is a sample function
         */
        //This is another line 

        var res = fd.qty*10

        return res
    })

    console.log("ids ", JSON.stringify(ids))

    expect(ids.length).toBeGreaterThan(1)

    expect(ids.includes("function")).toBe(false)

    //words from comment
    expect(ids.includes("another")).toBe(false)

    expect(ids.includes("sample")).toBe(false)

    expect(ids.includes("qty")).toBe(true)
})

test("get identifiers with conditions and while",()=>{

    const ids = getIdentifiersFromFunction((fd:any)=>{

        var sum =0
        for(var i=0;i<fd.items.length;i++){
            sum = sum+fd.items[i]
        }
        let discount = 0
        if(sum > 100 ){
            discount = (sum * 10)/100
        }
        var res = sum - discount 

        return res
    })

    console.log("ids ", JSON.stringify(ids))

    expect(ids.length).toBeGreaterThan(1)

    expect(ids.includes("function")).toBe(false)

    expect(ids.includes("items")).toBe(true)
})

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
