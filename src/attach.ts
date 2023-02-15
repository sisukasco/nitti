import {Calc, CalcType} from "./Calc"
import $ from "@sisukas/jquery";
export function attachCalcFields(){
    $("[r-calc]").each((_i, elm) => {
        let calccode = $(elm).attr("r-calc");
        if(!calccode){ return }
        calccode = calccode.trim()
  
        new Calc(calccode, elm)

     })
     
     $("[r-show]").each((_i, elm) => {
        let calccode = $(elm).attr("r-show");
        if(!calccode){ return }
        calccode = calccode.trim()
  
        new Calc(calccode, elm, CalcType.CONDITION)

     })
     
}