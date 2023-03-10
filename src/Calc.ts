import {
  getVariablesUsed,
  createFunctionFromCode,
  getGlobalFunction,
} from "./identifiers";
import $ from "@sisukas/jquery";
import { FormElement, FormDataValues } from "./FormElement";
import {CalculationFunction} from "./types"
import {Utils} from "./functions"
export enum CalcType {
  CALC = 1,
  CONDITION,
}

export enum FormatType{
  None =1,
  NUMBER,
  CURRENCY
}


export class Calc {
  private form: HTMLFormElement | Document;

  private elm: HTMLElement;
  private func: CalculationFunction;

  private vars: string[] = [];

  private calcType: CalcType = CalcType.CALC;

  private format = FormatType.None;
  private currencyCode:string = "USD"
  private locale:string = ""

  constructor(
    expression: string,
    elm: HTMLElement,
    type: CalcType = CalcType.CALC
  ) {

    this.elm = elm;
    let $form = $(elm).parents("form");
    if ($form.length > 0) {
      this.form = $form.get(0);
    } else {
      this.form = document;
    }

    let varsInForm:string[] = []
    $(":input",this.form).each((_i,elmnt)=>{
      const name = $(elmnt).attr("name")
      name && varsInForm.push(name)
    })
    
    const fnn = getGlobalFunction(expression);
    
    if (fnn) {
      this.func = fnn;
      this.vars = getVariablesUsed(fnn);
    } else {
      const { fn, vars } = createFunctionFromCode(expression, varsInForm);

      this.func = fn;
      this.vars = vars;
    }

    this.calcType = type;

    console.log(`NittiJS: attached to expression: "${expression}" \nvariables: ${JSON.stringify(this.vars) }`)
  }

  public setFormatToNumber(){
    this.format = FormatType.NUMBER
  }

  public setFormatToCurrency(currency:string){
    this.format = FormatType.CURRENCY
    if(currency && currency.length == 3){
      this.currencyCode = currency
    }
  }

  public setLocale(loc:string){
    this.locale = loc
  }

  public attachToEvents() {
    for (var v of this.vars) {
      $(`[name="${v}"]`, this.form).each((_idx, inp) => {
        $(inp).on("change keyup", () => this.run());
      });
    }
  }

  private getDefaultLocale(){
    const userLocale =
  navigator.languages && navigator.languages.length
    ? navigator.languages[0]
    : navigator.language;

    return userLocale
  }

  private getLocale(){
    if(this.locale && this.locale.length > 3){
      return this.locale
    }else{
      return this.getDefaultLocale()
    }
  }

  public run() {
    let fd = this.collectFormData();
    for(let v of this.vars){
      if(fd[v] === undefined){
        fd[v]=0;
      }
    }
    const fnn = this.func;
    let res:any;

    {
      try{
        res = fnn(fd, Utils);
      }catch(e){
        console.error("Error in calculation ",(e as Error).message)
        return;
      }
    }

    if(isNaN(res)){
        return;
    }
    if (this.calcType == CalcType.CALC) {
      let display = res

      if(this.format == FormatType.CURRENCY){
        const nf = new Intl.NumberFormat(this.getLocale(), { style: "currency", currency: this.currencyCode })
        display = nf.format(res)
      } else if(this.format == FormatType.NUMBER){
        const nf = new Intl.NumberFormat(this.getLocale())
        display = nf.format(res)
      }

      if ($(this.elm).prop("tagName") == "INPUT") {
        $(this.elm).val(display);
        $(this.elm).attr("bareval", res)
        $(this.elm).trigger("change");
      } else {
        $(this.elm).text(display);
      }
    } else if (this.calcType == CalcType.CONDITION) {
        if(res){
            $(this.elm).show()
        }else{
            $(this.elm).hide()
        }
    }
  }

  private collectFormData() {
    let ret: FormDataValues = {};
    $("input,select,textarea", this.form).each((_i: number, e: HTMLElement) => {
      const elmnt = new FormElement(e);
      const name = elmnt.getName();
      if (name in ret || name.length <= 0) {
        //captured already
        return;
      }

      ret[name] = elmnt.getValue();
    });

    return ret;
  }
}


