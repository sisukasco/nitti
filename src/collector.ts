
import { FormElement,FormDataValues } from "./FormElement";

export function collectFormData(form:HTMLFormElement){
    let ret:FormDataValues={}
    $("input,select,textarea",form).each((_i:number,e:HTMLElement)=>{
        const elmnt = new FormElement(e)
        const name = elmnt.getName()
        if(name in ret || name.length <=0)
        {//captured already
            return
        }
        
        ret[name] = elmnt.getValue()
    });
    
    return(ret)    
}