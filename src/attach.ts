import {collectFormData} from "./collector"

type CalculationFunction = (a:Object)=>any

declare global {
    interface Window { 
        [key:string]: CalculationFunction; 
    }
}

export function attachToCalculatedFields() {
  $("[r-calculated]").each((i, elm) => {
    console.log("calculated x ", i, elm);
    let fnname = $(elm).attr("r-calculated");

    
    if(fnname){
        let fnn = getGlobalFunction(fnname);

        if (fnn) {
            routeEventsToGlobalFunction(elm, fnn)
        }
    }

  });
}

function routeEventsToGlobalFunction(elm: HTMLElement,fnn:CalculationFunction){
    let strFn = fnn.toString();
    console.log("function is ", strFn);

    let form = $(elm).parents("form")
    
      form.on("change", (evt) => {
        if(evt.target != elm){
            console.log("value changed ... event ", evt);

            let fd = collectFormData(form.get(0))
            console.log("FormData collected ", fd)
            //let fd = { item1_qty: 12 };
            let res = fnn(fd);
    
            console.log("fn result is ", res);
            
            if($(elm).prop("tagName") == "INPUT")
            {
                $(elm).val(res);
            }
            else
            {
                $(elm).text(res);
            }
            
        }

      });
}



function getGlobalFunction(fnname:string){
    if (typeof window[fnname] == "function"){
        return window[fnname]
    }

    return null
}

