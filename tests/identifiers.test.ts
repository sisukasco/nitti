
import {getIdentifiersFromFunction} from "../src/identifiers"

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