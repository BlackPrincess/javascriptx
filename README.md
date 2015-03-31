# JavascriptX

An extension to the core javascript libray.  

## Created On a Whim.
I don't know, but there is probably a better one out there. :)

## Browser

Insert the following code into the HTML file you want include JavascriptX in:

``` html
<script src="/javascriptx/build/javascriptx.min.js type="text/javascript"></script>
```

## Examples

``` javascript
"0123".toInt()      // 123
"0123".toIntOrZero() // 123
"NaN".toIntOrZero() // 0

"The {0} is {1}".format("cat", "cute")    // The cat is cute
"０１２３．４５".toHalfNumber()     // 123.45 
"ｑｗｒｔｙ".toHalfAlphabet()     // qwrty

var f = (function(a,b,c,d){
    return a + b + c + d;
}).curried(); // f(1)(2)(3)(4);

(new Date(2013, 0, 1)).dateDiff("month", new Date(2014, 2, 1)); // 12
```

You can see more in [`/test`](https://github.com/BlackPrincess/javascriptx/tree/master/test)

## TODO
anything!!  
