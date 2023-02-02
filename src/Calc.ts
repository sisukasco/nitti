import {
  getVariablesUsed,
  createFunctionFromCode,
  getGlobalFunction,
} from "./identifiers";
import $ from "@sisukas/jquery";
import { FormElement, FormDataValues } from "./FormElement";
import {CalculationFunction} from "./types"

export enum CalcType {
  CALC = 1,
  CONDITION,
}


export class Calc {
  private form: HTMLFormElement | Document;

  private elm: HTMLElement;
  private func: CalculationFunction;

  private vars: string[] = [];

  private calcType: CalcType = CalcType.CALC;

  constructor(
    expression: string,
    elm: HTMLElement,
    type: CalcType = CalcType.CALC
  ) {
    const fnn = getGlobalFunction(expression);
    if (fnn) {
      this.func = fnn;
      this.vars = getVariablesUsed(fnn);
    } else {
      const { fn, vars } = createFunctionFromCode(expression);

      this.func = fn;
      this.vars = vars;
    }

    this.elm = elm;
    let $form = $(elm).parents("form");

    if ($form.length > 0) {
      this.form = $form.get(0);
    } else {
      this.form = document;
    }

    this.calcType = type;

    this.attachToEvents()

    this.run()
  }

  private attachToEvents() {
    for (var v of this.vars) {
      $(`[name="${v}"]`, this.form).each((_idx, inp) => {
        $(inp).on("change keyup", () => this.run());
      });
    }
  }

  public run() {
    let fd = this.collectFormData();
    const fnn = this.func;
    let res = fnn(fd);
    if(isNaN(res)){
        return;
    }
    if (this.calcType == CalcType.CALC) {
      if ($(this.elm).prop("tagName") == "INPUT") {
        $(this.elm).val(res);
        $(this.elm).trigger("change");
      } else {
        $(this.elm).text(res);
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


