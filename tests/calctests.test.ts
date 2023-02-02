import $ from "@sisukas/jquery";
import faker from "faker";
import {attachCalcFields} from "../src/attach"


test("calc001: simple calculation", () => {
    document.body.innerHTML = `
          <form id="myform">
          <input type="number" id="qty_input" name="quantity" />
          <span id="calcres" r-calculated="quantity*12"></span>
          </form>
          `;

    attachCalcFields()

    const input = <HTMLInputElement>$("#qty_input")[0];

    const inpx = faker.datatype.number(500)
    $(input).val(inpx).trigger('change')

    const res = parseFloat($("#calcres").text())

    expect(res).toEqual(inpx*12)

})