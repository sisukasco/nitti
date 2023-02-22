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