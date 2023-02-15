# Nitti
Create online calculators easily.  


## Simple formulae

Suppose you have two fields x and y. You want to calculate $x^2 + y^2$
```html
<form id="calc_form">
<div>
<label for="num_x">X:</label>
<input type="number" name="x" id="num_x" />
</div>

<div>
<label for="num_y">Y:</label>
<input type="number" name="y" id="num_y" />
</div>

<div>
Result: <span r-calc="x*x + y*y"></span>
</div>

</form>

```

Enter the formula for the calculation in an attribute `r-calc` and the script will automatically calculate the results when you change the inputs.

## Calculation function with logic 

When the calculation involves more complex logic, you can separate it into a function and provide the function name in the `r-calc` attribute.



```html
<form id="calc_form">
<div>
<label for="num_x">X:</label>
<input type="number" name="x" id="num_x" />
</div>

<div>
<label for="num_y">Y:</label>
<input type="number" name="y" id="num_y" />
</div>

<div>
Result: <span r-calc="calcFactor"></span>
</div>

</form>
<script>
    function calcFactor(values){
        if(values.x <= 0 || values.y <=0){
            return 1
        }

        return values.x*values.x + values.y * values.y;
    }
</script>

```

## When there is a list or selection
If you have a dropdown list or a radio group so that the user can select an option, you may want to provide a value for the options

For example, if the shipping method is "One day shipping" you may want to charge a premium. 
You can add an r-value attribute to the options here is an example:

```html
<form id="calc_form">
    <div>
    <label for="qty">Quantity:</label>
    <input type="number" name="qty" id="qty"  />
    </div>
    
    <div>
    <label for="shipping_method">Shipping Method</label>
    <select name="shipping" id="shipping_method">
        <option r-value="0">Select ...</option>
        <option r-value="10">One week</option>
        <option r-value="20">Two days</option>
        <option r-value="30">Overnight</option>
    </select>
    </div>
    
    <div class="mt-3">
    Price Total: <span r-calc="qty*100 + shipping"></span>
    </div>
    
</form> 
```

When the user selects "Two days" the `shipping` gets a value of 20. 


