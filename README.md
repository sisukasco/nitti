# Nitti
Script for adding calculations in HTML forms


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

## A list or selection where we have to map from the selection to a numeric value
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


## Date fields 
When you have a date field in the form, the value you receive is the Javascript `Date` Object. 
So you can use the Date object functions in the calculation.

```html
<form method="post" id="myform">  
    <div class="mb-3">  
        <label class="form-label" for="start_date">Start Date:</label>
        <input class="form-control" type="date" novalidate="novalidate" name="start_date" id="start_date"/>
    </div>
    
    <div class="mb-3">  
        Price: <span r-calc="(start_date.getDay() == 0)?100:50"></span>
        <div>Price is 100 on Sundays and 50 on other days</div>
    </div>
</form>
```

The calculation uses [getDay()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getDay) function of the `Date` object to find the weekday.   
`getDay()` function returns 0 for Sunday , 1 for Monday, and so on.  
  
So if the selected date is Sunday, the price is 100 else the price is 50.

## Utility functions
There are a few utility functions to make the calculations easier.

#### daysBetween
Find the number of days between two dates. Example: `daysBetween(date1, date2)`

#### daysFromToday
Find the number of days from today. Example: `daysFromToday(other)`  
If the other date is in the past, the returned value is negative.

#### calculateAge
Given a date picker for birth date, the utility function returns the age.

### Using the utility functions 

```html
<form method="post" id="myform">  
    <div class="mb-3">  
        <label class="form-label" for="birth_date">Start Date:</label>
        <input class="form-control" type="date" name="birth_date" id="birth_date"/>
    </div>
    
    <div class="mb-3">  
        Age: <span r-calc="calculateAge(birth_date)"></span>
    </div>
</form>
```
We can use  utility functions directly in the `r-calc` attribute.

When you have a calculator function separately, the second parameter contains the utility functions.

```html
<form method="post" id="myform">  
    <div class="row mb-3">  
    <div class="col">  
        <label class="form-label" for="start_date">Start Date:</label>
        <input class="form-control" type="date"  name="start_date" id="start_date"/>
    </div>
    <div class="col">  
        <label class="form-label" for="end_date">End Date</label>
        <input class="form-control" type="date" name="end_date" id="end_date"/>
    </div>
    </div>
    <div class="mb-3">  
        Calculation: <span r-calc="doCalc"></span>
    </div>
    <div class="row mb-3"></div>
</form>
<script>
    function doCalc(fd, { daysBetween }){
            return daysBetween(fd.start_date,fd.end_date);
    }
</script>
```


