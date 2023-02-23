import {Calc, CalcType} from "./Calc"
import $ from "@sisukas/jquery";
export function attachCalcFields(){
    $("[r-calc]").each((_i, elm) => {
        let calccode = $(elm).attr("r-calc");
        if(!calccode){ return }
        calccode = calccode.trim()

        let calc = new Calc(calccode, elm)

        let format = $(elm).attr("r-format");
        if(format){
            const parts = format.split("|")
            if(parts.length > 0){

               if(parts[0]=="currency"){
                  let code = "USD"
                  if(parts.length > 1){
                     const currCode = parts[1].toUpperCase().trim()
                     if(currCode && currCode.length == 3){
                        code = currCode
                     }
                  }
                  calc.setFormatToCurrency(code)
                  if(parts.length > 2){
                     const locale = parts[2].trim()
                     if(locale && locale.length > 3){
                        calc.setLocale(locale)
                     }
                  }
               } else if(parts[0]== "number"){
                  calc.setFormatToNumber()

                  if(parts.length > 1){
                     const locale = parts[1].trim()
                     if(locale && locale.length > 3){
                        calc.setLocale(locale)
                     }
                  }
               }

            }
        }

        calc.attachToEvents()
        calc.run()
     })
     
     $("[r-show]").each((_i, elm) => {
        let calccode = $(elm).attr("r-show");
        if(!calccode){ return }
        calccode = calccode.trim()
  
        let calc = new Calc(calccode, elm, CalcType.CONDITION)
        calc.attachToEvents()
        calc.run()        
     })
     
}