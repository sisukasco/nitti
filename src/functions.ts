
type UtilsObject = {
    [K:string]:(...args:any)=>number
}

export const Utils:UtilsObject = {

    daysBetween: (date1:Date, date2:Date)=>{
        if(date1 instanceof Date && date2 instanceof Date){
            return Math.round((date2.getTime() - date1.getTime() ) / (1000 * 60 * 60 * 24))
        }else{
            return 0
        }
    },

    calculateAge: (bdate:Date)=>{
        if(bdate instanceof Date){
            return Math.floor(Utils.daysBetween(bdate, new Date)/365)
        }else{
            return 0
        }
    },

    daysFromToday: (other:Date)=>{
        return Utils.daysBetween(new Date, other)
    }
}

export function getUtilFunctionNames(){
  const propNames = Object.getOwnPropertyNames(Utils);

  // Filter out non-function properties
  const methodNames = propNames.filter((propName) => {
    return typeof Utils[propName] === 'function';
  });

  return methodNames;
}