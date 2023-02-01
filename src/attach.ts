import {collectFormData} from "./collector"
import {getVariablesUsed, createFunctionFromCode} from "./identifiers"
import $ from "@sisukas/jquery";

type CalculationFunction = (a:Object)=>any

declare global {
    interface Window { 
        [key:string]: CalculationFunction; 
    }
}

export function attachToCalculatedFields() {
  $("[r-calculated]").each((_i, elm) => {
    let calccode = $(elm).attr("r-calculated");
    if(!calccode){ return }

    calccode = calccode.trim()

    let fnn = getGlobalFunction(calccode);

    if (fnn) {
        routeEventsToGlobalFunction(elm, fnn, [])
    }else{
        /** it is an expression */
        const {fn,vars} = createFunctionFromCode(calccode)
        
        routeEventsToGlobalFunction(elm, fn, vars)
    }

  });
}

function routeEventsToGlobalFunction(elm: HTMLElement,fnn:CalculationFunction, vars:string[]){
    
    let $form = $(elm).parents("form")

    if($form.length < 1){
        console.error("no form found")
        return ;
    }
    let form = $form.get(0)

    if(vars.length <= 0)
    {
        vars = getVariablesUsed(fnn)
    }
    
    for(var v of vars) {
        
        $(`[name="${v}"]`, form).each((_idx,inp)=>{
            $(inp).on("change keyup",()=>{
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

