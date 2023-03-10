import $ from "@sisukas/jquery";

import faker from "faker";
import {attachCalcFields} from "../src/attach"


test("calc001: simple calculation", () => {
    document.body.innerHTML = `
          <form id="myform">
          <input type="number" id="qty_input" name="quantity" />
          <span id="calcres" r-calc="quantity*12"></span>
          </form>
          `;

    attachCalcFields()

    const input = <HTMLInputElement>$("#qty_input")[0];

    const inpx = faker.datatype.number(500)
    $(input).val(inpx).trigger('change')

    const res = parseFloat($("#calcres").text())

    expect(res).toEqual(inpx*12)

})



test("calc002: format currency USD en-US", () => {
    document.body.innerHTML = `
          <form id="myform">
          <input type="number" id="qty_input" name="quantity" />
          <span id="calcres" r-calc="quantity*10000" r-format="currency|usd|en-US" ></span>
          </form>
          `;

    attachCalcFields()

    const input = <HTMLInputElement>$("#qty_input")[0];

    $(input).val(300).trigger('change')

    const res = $("#calcres").text()

    expect(res).toBe("$3,000,000.00")
    
})

test("calc003: format currency INR en-IN", () => {
    document.body.innerHTML = `
          <form id="myform">
          <input type="number" id="qty_input" name="quantity" />
          <span id="calcres" r-calc="quantity*10000" r-format="currency| INR |en-IN" ></span>
          </form>
          `;

    attachCalcFields()

    const input = <HTMLInputElement>$("#qty_input")[0];

    $(input).val(300).trigger('change')

    const res = $("#calcres").text()

    expect(res).toBe("₹30,00,000.00")
    
})

test("calc004: format number en-IN", () => {
    document.body.innerHTML = `
          <form id="myform">
          <input type="number" id="qty_input" name="quantity" />
          <span id="calcres" r-calc="quantity*10000" r-format="number|en-IN" ></span>
          </form>
          `;

    attachCalcFields()

    const input = <HTMLInputElement>$("#qty_input")[0];

    $(input).val(300).trigger('change')

    const res = $("#calcres").text()

    expect(res).toBe("30,00,000")
    
})

test("calc005: format number en-US", () => {
    document.body.innerHTML = `
          <form id="myform">
          <input type="number" id="qty_input" name="quantity" />
          <span id="calcres" r-calc="quantity*10000" r-format="number|en-US" ></span>
          </form>
          `;

    attachCalcFields()

    const input = <HTMLInputElement>$("#qty_input")[0];

    $(input).val(300).trigger('change')

    const res = $("#calcres").text()

    expect(res).toBe("3,000,000")
    
})

test("calc006: global function for calc", () => {
    document.body.innerHTML = `
          <form id="myform">
          <input type="number" id="qty_input" name="quantity" />
          <span id="calcres" r-calc="calcFn" r-format="number|en-US" ></span>
          </form>
          `;

    window.calcFn = (fd:any)=>{
        return fd.quantity * 10000
    }

    attachCalcFields()

    const input = <HTMLInputElement>$("#qty_input")[0];

    $(input).val(300).trigger('change')

    const res = $("#calcres").text()

    expect(res).toBe("3,000,000")
    
})

test("calc007: global function for calc", () => {
    document.body.innerHTML = `
          <form id="myform">
          <input type="date" id="start_date" name="start_date" />
          <input type="date" id="end_date" name="end_date" />
          <span id="calcres" r-calc="daysBetween(start_date,end_date)" ></span>
          </form>
          `;

    window.calcFn = (fd:any)=>{
        return fd.quantity * 10000
    }

    attachCalcFields()

    const input1 = <HTMLInputElement>$("#start_date")[0];

    $(input1).val("2022-01-01")

    const input2 = <HTMLInputElement>$("#end_date")[0];

    $(input2).val("2022-02-01").trigger('change')

    const res = $("#calcres").text()

    expect(res).toBe("31")
    
})

test("calc008: calculate age from date picker", () => {
    document.body.innerHTML = `
          <form id="myform">
          <input type="date" id="birth_date" name="birth_date" />
          
          <span id="calcres" r-calc="calculateAge(birth_date)" ></span>
          </form>
          `;

    attachCalcFields()

    const input = <HTMLInputElement>$("#birth_date")[0];

    let d = new Date()
    let y = d.getFullYear() - 16
    d.setFullYear(y)

    const dateStr = d.toISOString().split('T')[0]

    $(input).val(dateStr).trigger('change')

    const res = $("#calcres").text()

    expect(res).toBe("16")
    
})

test("calc009: Use single checkbox in a calculation", () => {
    document.body.innerHTML = `
          <form id="myform">
          <input type="checkbox" id="option" name="option" />
          
          <span id="calcres" r-calc="option * 10" ></span>
          </form>
          `;

    attachCalcFields()

    const input = <HTMLInputElement>$("#option")[0];

    $(input).trigger("click")


    const res = $("#calcres").text()

    expect(res).toBe("10")
    
})


test("calc010: Math.pow", () => {
    document.body.innerHTML = `
          <form id="myform">
          <input type="number" id="param" name="param" />
          <input type="number" id="po" name="po" />
          <span id="calcres" r-calc="Math.pow(param, po)" ></span>
          </form>
          `;

    attachCalcFields()

    const input1 = <HTMLInputElement>$("#param")[0];

    $(input1).val("10")

    const input2 = <HTMLInputElement>$("#po")[0];

    $(input2).val("2").trigger('change')

    const res = $("#calcres").text()

    expect(res).toBe("100")
    
})

test("calc011: Math.pow multiple times", () => {
    document.body.innerHTML = `
          <form id="myform">
          <input type="number" id="param" name="param" />
          <input type="number" id="po" name="po" />
          <span id="calcres" r-calc="Math.pow(param, po) + 2*Math.pow(param, po)" ></span>
          </form>
          `;

    attachCalcFields()

    const input1 = <HTMLInputElement>$("#param")[0];

    $(input1).val("10")

    const input2 = <HTMLInputElement>$("#po")[0];

    $(input2).val("2").trigger('change')

    const res = $("#calcres").text()

    expect(res).toBe("300")
    
})


test("calc012: Math.pow multiple times", () => {
    document.body.innerHTML = `
          <form id="myform">
          <input type="number" id="amount" name="amount" />
          <input type="number" id="rate" name="rate" />
          <span id="calcres" r-calc="calcFunc" r-format="number"></span>
          </form>
          `;

    window.calcFunc = function({amount,rate, raxx}) {
          let amount2 = amount * 100;
          
          let monthlyPayment = Math.sqrt(amount2) * rate + raxx;
      
          return monthlyPayment;
      }

    attachCalcFields()

    const input1 = <HTMLInputElement>$("#amount")[0];

    $(input1).val("10")

    const input2 = <HTMLInputElement>$("#rate")[0];

    $(input2).val("2").trigger('change')

    const res = $("#calcres").text()

    expect(res).toBe("63.246")
    
})


test("calc013: Math.pow multiple times", () => {
    document.body.innerHTML = `
          <form id="myform">
          <input type="number" id="amount" name="amount" />
          <input type="number" value="12" id="rate" name="rate" />
          <input type="number" value="1" id="term" name="term" />
          <span id="calcres" r-calc="calcFunc" r-format="currency|usd"></span>
          </form>
          `;

    window.calcFunc = function({amount, rate, term}) {
          let interestRate = rate / 100 / 12;
          let loanTerm = term * 12;
      
          let monthlyPayment = (amount * interestRate * Math.pow(1 + interestRate, loanTerm)) / (Math.pow(1 + interestRate, loanTerm) - 1);
      
          return monthlyPayment;
      }

    attachCalcFields()

    const input1 = <HTMLInputElement>$("#amount")[0];

    $(input1).val("100000")

    const input2 = <HTMLInputElement>$("#term")[0];

    $(input2).val("2").trigger('change')

    const res = $("#calcres").text()

    expect(res).toBe("$4,707.35")
    
})

//TODO: test cascading calculation fields

