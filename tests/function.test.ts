import {Utils} from "../src/functions"
import faker from "faker";

test("fns001: daysBetween", () => {
    for(let i=0;i<100;i++){
        let today = new Date()
        let otherDate = new Date()
        const numdays = faker.datatype.number(500)
        otherDate.setTime(today.getTime() - numdays * (1000 * 60 * 60 * 24) )
        const days = Utils.daysBetween(otherDate, today)
        expect(days).toEqual(numdays)
    }

})

test("fns001: daysFromToday", () => {
    for(let i=0;i<100;i++){
        let today = new Date()
        let otherDate = new Date()
        const numdays = faker.datatype.number(500)
        otherDate.setTime(today.getTime() - numdays * (1000 * 60 * 60 * 24) )
        const days = Utils.daysFromToday(otherDate)
        expect(days).toEqual(-1 * numdays)
    }

})

test("fns003: daysFromToday in the future", () => {
    for(let i=0;i<100;i++){
        let today = new Date()
        let otherDate = new Date()
        const numdays = faker.datatype.number(500)
        otherDate.setTime(today.getTime() + numdays * (1000 * 60 * 60 * 24) )
        const days = Utils.daysFromToday(otherDate)
        expect(days).toEqual(numdays)
    }

})


test("fns004: calculateAge", () => {
    for(let i=0;i<100;i++){
        let date = new Date()
        const age = faker.datatype.number(90)
        date.setFullYear(date.getFullYear() - age)
        
        const ageCalc = Utils.calculateAge(date)
        expect(ageCalc).toEqual(age)
    }

})


