import {Calc, CalcType} from "./Calc"

export function attachCalcFields(){
    $("[r-calculated]").each((_i, elm) => {
        let calccode = $(elm).attr("r-calculated");
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