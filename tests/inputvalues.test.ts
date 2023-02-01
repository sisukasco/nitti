import { FormElement } from "../src/FormElement";
import faker from "faker";
import $ from "@sisukas/jquery";

test("inp001: getting text input value", () => {
  const text_name = faker.random.word();
  document.body.innerHTML = `
        <form id="myform">
        <input type="text" name="${text_name}" />
        </form>
        `;

  const form = <HTMLFormElement>$("#myform")[0];
  const fd = new FormElement(<HTMLElement>form.elements[0]);
  const inp = form.elements[0];
  const v = faker.random.word();
  $(inp).val(v);
  expect(fd.getValue()).toEqual(v);
});

test("inp002: getting select (dropdown list) value", () => {
  const name = faker.random.word();
  document.body.innerHTML = `
        <form id="myform">
        <select name="${name}">
          <option>Item1</option>
          <option>Item2</option>
          <option>Item3</option>
          <option>Item4</option>
          <option>Item5</option>
        </select>
        </form>
        `;

  const form = <HTMLFormElement>$("#myform")[0];
  const fd = new FormElement(<HTMLElement>form.elements[0]);
  const inp = form.elements[0];
  $('option:eq(0)',inp).prop('selected', true)
  expect(fd.getValue()).toEqual('Item1')

  $('option:eq(1)',inp).prop('selected', true)
  expect(fd.getValue()).toEqual('Item2')
});

test("inp003: getting select (dropdown list) value with r-value", () => {
  const name = faker.random.word();
  document.body.innerHTML = `
        <form id="myform">
        <select name="${name}">
          <option r-value="235">Item1</option>
          <option r-value="236">Item2</option>
          <option>Item3</option>
          <option>Item4</option>
          <option>Item5</option>
        </select>
        </form>
        `;

  const form = <HTMLFormElement>$("#myform")[0];
  const fd = new FormElement(<HTMLElement>form.elements[0]);
  const inp = form.elements[0];
  $('option:eq(0)',inp).prop('selected', true)
  expect(fd.getValue()).toEqual(235)

  $('option:eq(1)',inp).prop('selected', true)

  expect(fd.getValue()).toEqual(236)
  
});

test("test004: getting radio group value",()=>
{
    const radio_name = faker.random.word()
    const values:number[]=[]
    values.push(faker.datatype.number(500))
    values.push(faker.datatype.number(500))
    values.push(faker.datatype.number(500))
    
    document.body.innerHTML =`
    <form id="myform">
    <input class="form-check-input" value="${values[0]}" type="radio" name="${radio_name}">
    <input class="form-check-input" value="${values[1]}" type="radio" name="${radio_name}">
    <input class="form-check-input" value="${values[2]}" type="radio" name="${radio_name}">
    </form>
    `;
    
    const form = <HTMLFormElement>$("#myform")[0]
    const inpx = form.elements[1]
    $(inpx).trigger('click')
    
    const fd = new FormElement(<HTMLElement>inpx)
    const res = fd.getValue()
    expect(res).toEqual(values[1])
    
})

test("test005: getting radio group value with r-value",()=>
{
    const radio_name = faker.random.word()
    const values:string[]=[]
    values.push(faker.random.word())
    values.push(faker.random.word())
    values.push(faker.random.word())

    const rvalues:number[]=[]
    rvalues.push(faker.datatype.number(1000))
    rvalues.push(faker.datatype.number(1000))
    rvalues.push(faker.datatype.number(1000))
    
    document.body.innerHTML =`
    <form id="myform">
    <input class="form-check-input" r-value="${rvalues[0]}" value="${values[0]}" type="radio" name="${radio_name}">
    <input class="form-check-input" r-value="${rvalues[1]}" value="${values[1]}" type="radio" name="${radio_name}">
    <input class="form-check-input" r-value="${rvalues[2]}" value="${values[2]}" type="radio" name="${radio_name}">
    </form>
    `;
    
    const form = <HTMLFormElement>$("#myform")[0]
    const inpx = form.elements[1]
    $(inpx).trigger('click')
    
    const fd = new FormElement(<HTMLElement>inpx)
    const res = fd.getValue()
    expect(res).toEqual(rvalues[1])

    $(form.elements[2]).trigger('click')
    expect(fd.getValue()).toEqual(rvalues[2])

    $(form.elements[0]).trigger('click')
    expect(fd.getValue()).toEqual(rvalues[0])
    
})

test("test006: getting single checkbox with custom value",()=>
{
    const chk_name1 = faker.random.word()
    const chk_name2 = faker.random.word()

    const chk1_value = faker.datatype.number()
    const chk2_value = faker.datatype.number()
    
    document.body.innerHTML =`
    <form id="myform">
    <input class="form-check-input" value="${chk1_value}" type="checkbox" id="${chk_name1}">
    <input class="form-check-input" value="${chk2_value}" type="checkbox" id="${chk_name2}">
    </form>
    `;
    
    const form = <HTMLFormElement>$("#myform")[0]
    const inp1 = form.elements[0]
    $(inp1).trigger("click")
    
    const fd1 = new FormElement(<HTMLElement>inp1)
    const res1 = fd1.getValue()
    expect(res1).toEqual(chk1_value)
    
    const inp2 = form.elements[1]
    const fd2 = new FormElement(<HTMLElement>inp2)
    const res2 = fd2.getValue()
    expect(res2).toEqual(false)
    
})

test("test007: getting single checkbox with  r-value",()=>
{
    const chk_name1 = faker.random.word()
    const chk_name2 = faker.random.word()

    const chk1_value = faker.datatype.number()
    const chk2_value = faker.datatype.number()

    const chk1_rvalue = faker.datatype.number()
    const chk2_rvalue = faker.datatype.number()
    
    document.body.innerHTML =`
    <form id="myform">
    <input class="form-check-input" r-value="${chk1_rvalue}" value="${chk1_value}" type="checkbox" id="${chk_name1}">
    <input class="form-check-input" r-value="${chk2_rvalue}" value="${chk2_value}" type="checkbox" id="${chk_name2}">
    </form>
    `;
    
    const form = <HTMLFormElement>$("#myform")[0]
    const inp1 = form.elements[0]
    $(inp1).trigger("click")
    
    const fd1 = new FormElement(<HTMLElement>inp1)
    const res1 = fd1.getValue()
    expect(res1).toEqual(chk1_rvalue)
    
    const inp2 = form.elements[1]
    const fd2 = new FormElement(<HTMLElement>inp2)
    const res2 = fd2.getValue()
    expect(res2).toEqual(false)
    
})

test("test008: getting checkbox group with custom value",()=>
{
    const chk_name = faker.random.word()+[]
    
    document.body.innerHTML =`
    <form id="myform">
    <input class="form-check-input" value="121" type="checkbox" name="${chk_name}">
    <input class="form-check-input" value="122" type="checkbox" name="${chk_name}">
    <input class="form-check-input" value="123" type="checkbox" name="${chk_name}">
    </form>
    `;
    
    const form = <HTMLFormElement>$("#myform")[0]
    const inp1 = form.elements[0]
    $(inp1).trigger("click")
    const inp2 = form.elements[1]
    $(inp2).trigger("click")
    
    const fd1 = new FormElement(<HTMLElement>inp1)
    const res = fd1.getValue()
    expect(res).toEqual([121,122])
})

test("test009: getting checkbox group with r-value",()=>
{
    const chk_name = faker.random.word()+[]
    
    document.body.innerHTML =`
    <form id="myform">
    <input class="form-check-input" r-value="88" value="red" type="checkbox" name="${chk_name}">
    <input class="form-check-input" r-value="89" value="green" type="checkbox" name="${chk_name}">
    <input class="form-check-input" r-value="90" value="blue" type="checkbox" name="${chk_name}">
    </form>
    `;
    
    const form = <HTMLFormElement>$("#myform")[0]
    const inp1 = form.elements[0]
    $(inp1).trigger("click")
    const inp2 = form.elements[1]
    $(inp2).trigger("click")
    
    const fd1 = new FormElement(<HTMLElement>inp1)
    const res = fd1.getValue()
    expect(res).toEqual([88,89])
})