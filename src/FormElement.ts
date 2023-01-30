import $ from "@sisukas/jquery";
export type FileUpload={
    file_name:string,
    size:number,
    type: string,
    upload_id:string
}
export type SingleFormValue = string|boolean|number|FileUpload

export type FormValue = SingleFormValue | SingleFormValue[]

export type FormDataValues=
{
    [name:string]:FormValue
}

export class FormElement
{
    private $e:JQuery<HTMLElement>;
    private form:HTMLFormElement;
    
    constructor(e:HTMLElement)
    {
        let form = (<HTMLInputElement>e).form
        if(form == null)
        {
            throw new Error("form is null for the element")
        }
        this.form =form
        this.$e = $(e)
    }
    
    public getName()
    {
        let name = this.$e.attr("name") ?? "";
        
        if(!name)
        {
            name = this.$e.attr("id") ?? "";
        }
        let m = name.match(/(.+?)((\[\s*\])+)$/)
        if(m && m.length >= 2){ 
            name=m[1]
        }
        return name
    }
    
    public getType()
    {
        let tag = this.$e.prop("tagName");
        let type ="input"
        if(tag == "INPUT")
        {
            let t = this.$e.attr("type");    
            if(t){ type=t;}
        }
        else if(tag=="SELECT")
        {
            type="select"
        }
        else if(tag=="TEXTAREA")
        {
            type="textarea"
        }
        return type.toLowerCase()
    }
    
    private getElementsWithSameName(){
        let name = this.$e.attr("name") ?? ""
        return $(`[name="${name}"]`, this.form)
    }
    private getElementsWithName(name:string){
        return $(`[name="${name}"]`, this.form)
    }
    
    public isArray()
    {
        let name = this.$e.attr("name") ?? "";
        let m = name.match(/(.+?)((\[\s*\])+)$/)
        if(m && m.length >= 2)
        {
            return true
        }
        
        const isArray = this.getElementsWithSameName().length > 1 ? true :false ;
        
        return isArray;
    }
    
    
    public getValue():FormValue
    {
        const isArray = this.isArray() 
        
        let type = this.getType()
        if(type == "checkbox")
        {
            if(isArray)
            {
                return this.getCheckboxGroupValues()
            }
            else{
                return getSingleCheckboxValue(this.$e[0])
            }
        }
        else if(type == "radio")
        {
            /**
             * jQuery's $(e).val() does not work right for radio group
             * It returns the first item value even if none is selected
             */
            let group = this.getElementsWithSameName()
            let value ="";
            for(let g=0;g<group.length;g++)
            {
                if($(group[g]).is(":checked"))
                {
                    let v = $(group[g]).attr("value")
                    if(v !== undefined)
                    {
                        value = v; break;
                    }
                }
            }
            return value;
            
        }
        else
        {
            if(isArray)
            {
                let ret:(string|number)[] = []
                let group = this.getElementsWithSameName()
                for(let g=0;g<group.length;g++)
                {
                    let v = getInputValue(group[g])
                    if(v === undefined || Array.isArray(v))
                    {
                        continue;
                    }
                    ret.push(v)
                }
                return ret
            }
            else
            {
                return getInputValue(this.$e[0])
            }
            
        }
        return ""
    }
    
    private getCheckboxGroupValues():FormValue
    {
        let ret:(string|boolean)[] = []
        let name = this.$e.attr("name") ?? ""
        let elmnts = this.getElementsWithName(name)
        for(let g=0;g<elmnts.length;g++)
        {
            let v = getSingleCheckboxValue(elmnts[g])
            if(v != false)
            {
                ret.push(v)
            }
        }
        return ret
    }
}


function getSingleCheckboxValue(e:HTMLElement):boolean|string
{
    let elmnt = $(e)
    let checked = elmnt.is(":checked")
    let value :boolean|string=false
    if(checked)
    {
        let v = elmnt.val()
        if( v=== undefined || v === "on")
        {
            value = true
        }
        else if( typeof(v) == "string")
        {
            value = v
        }
    }
    else
    {
        value = false
    }        
    return value
}

function isNumeric(value:string) {
    return /^-?[\d\.]+$/.test(value);
}
    
function getInputValue(e:HTMLElement)
{
    let val = $(e).val()
    if(val === undefined)
    {
        val =""
    }
    
    if(typeof val == "string" && isNumeric(val)){
        val = parseFloat(val)
    }
    return val
}