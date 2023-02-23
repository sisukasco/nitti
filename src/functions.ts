

export const Utils = {

    daysBetween: (date1:Date, date2:Date)=>{
        return Math.round((date2.getTime() - date1.getTime() ) / (1000 * 60 * 60 * 24))
    }
}