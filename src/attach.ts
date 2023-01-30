import {collectFormData} from "./collector"
import {getVariablesUsed} from "./identifiers"

type CalculationFunction = (a:Object)=>any

declare global {
    interface Window { 
        [key:string]: CalculationFunction; 
    }
}

export function attachToCalculatedFields() {
  $("[r-calculated]").each((_i, elm) => {
    let fnname = $(elm).attr("r-calculated");
    console.log("fnname ", fnname)
    if(fnname){
        let fnn = getGlobalFunction(fnname);

        if (fnn) {
            routeEventsToGlobalFunction(elm, fnn)
        }
    }

  });
}

function routeEventsToGlobalFunction(elm: HTMLElement,fnn:CalculationFunction){
    
    let $form = $(elm).parents("form")

    console.log("routing events to function ...")
    if($form.length < 1){
        console.error("no form found")
        return ;
    }
    let form = $form.get(0)

    const vars = getVariablesUsed(fnn)

    console.log("variables in the fn ", vars)
    for(var v of vars) {
        
        $(`[name="${v}"]`, form).each((_idx,inp)=>{
            console.log("attaching to variable ", v)
            $(inp).on("change keyup",()=>{
                console.log("v ", v," changed")
                let fd = collectFormData(form)
                let res = fnn(fd);

                if($(elm).prop("tagName") == "INPUT")
                {
                    $(elm).val(res);
                    $(elm).trigger('change')
                }
                else
                {
                    $(elm).text(res);
                }

            })
        })

    }

}



function getGlobalFunction(fnname:string){
    if (typeof window[fnname] == "function"){
        return window[fnname]
    }

    return null
}

