### Object-oriented Javascript
### Chapter1
三驾马车
1. HTML for content
2. CSS for presentation
3. Javascript for Behavior

ECMA-262
The core parts of Javascript programming Language without browser and web-specific Language.

Strict Mode is opt-in and not required inES5 and by default in ES6.
```
 use strict
```
ES5 2009, ES6 2015. ES6 == ES2015

Babel begin
```
var name ="John",mood="happy";
console.log(`Hey ${name}, are you feeling ${mood} today`)
```

#### Primitive Data Types,Arrays, Loops,and Condition
变量使用两部曲：
1. 声明
2. 赋值(初始化)
var a;
a=2;

变量大小写敏感
var case1="case";
var CASE1="case2";
console.log(case1 == "case")

操作符
% 取余 5%3 =2；
post++,++pre区别
一个是先返回，后++。
一个先++,后返回。
var a= 2;
var b = a++;
console.log(b ==2);
console.log(a==3)

var a=2;
var b= ++a;
console.log(a==3);
console.log(b==3);

八进制 vs 16进制 vs 2进制
八进制，数字前面加0;
16进制，数字前面加0x;
2进制，数字前面加0b;
var n3=0377;
var n5=0xff;
var n7= 0b111;

无限Infinity.
无限Infinity -Infinity NaN

Number.IsNaN的判断非常有意思。
Number.isNaN("test) false;

\ escape。对符号来时\' 不解析，对字母来说组合\t,\n,\r,\b,\v,\f;

字符串模板，不是以‘’或者""开头，而是以`${variable}`
var a=1;
`The number is ${a}`

!! 会把所有的类型转为boolean.判断时候可用。
var a = '';
!!a;
操作符优先级
!>&&>||

Symbol-> unique identifiers.唯一标识符？？？

var atom = Symbol();
var atom = Symbol("atomic symbol)

var a=[];
a[8]=8;
console.log(...a)

(function(){alert("ddd")}())

function sum(a,b){
    alert(arguments.length)
    return a+b;
}

sum(1,2,3)
a,b parameters.
1,2,3 arguments.

//for ...in used for checking property in object and array
i 是index.
var a = ["a","b","c","d","e","f"];

var r = "\n"
for(i in a){
    r = r+a[i];
}

console.log(r)

Functions that redefined themselves ?

function sumOnSteroids(){
    let r=0;
    for(var i=0;i< arguments.length;i++){
        r= arguments[i]+r;
    }
    return r;
}
sumOnSteroids(1,2,3,4,5)

ES6 rest paramters,allow destructing?

function render(i=2,j=3){
    return i+j;
}

render(undefined,3);

rest paramters.三个点的参数，表示数组，可以接受任意一串参数。
...，作为参数只能放在最后面。主要的作用是取代argments.length
function render(...names,age){} //错误
Uncaught SyntaxError: Rest parameter must be last formal parameter
function render(age,...name){
    console.log(`${age} is ${name}`)
}
render(24,'tt','dd')

function sumAll(a,b,c){
    return a+b+c;
}

var number=[5,6,7];
console.log(sumAll.apply(null,number))

sumAll(...number)

Spread Operator 和Rest paramters看上去一样都是...,结果却是完全相反，...array，是分割数组的意思。
var arr1=[2,3,4];
var t= ["t",...arr1]
console.log(t)

js的变量作用域只有function和global。function里面的可以访问global。而外面的不可以访问里面的变量作用域。定义用var。

var a=123

function render(){
  
    alert(a)
   var a = 1;
    alert(a)
       
}

render();

//变量提升
当js执行的时候，在函数内定义的所有变量都会提升到函数的顶部。上面的函数相当于
var a=123

function render(){
   var a;
    alert(a)
    a = 1;
    alert(a)
       
}

const data={};
data.type=4;

function multiplyByTwo(callback,...numbers){
    var i,arr=[];
    for(i=0;i<numbers.length;i++){
        arr[i]=callback(numbers[i] * 2);
    }
    return arr;
}

function addOne(a){
    return a + 1;
}

multiplyByTwo(addOne,1,2,3);
addOne(100)

(function(){
    alert("hhh")
})()

(function(){
    alert("dddd")
}())

立即执行函数(fn)().(fn()),只能执行一次，适合初始化。

function a(){
    alert("a")
    return function b(){
        alert("b")
    }
}

a()();

var r=a();
r();

a()(); //立即执行。

function a(){
    alert("A")
    a=function(){
        alert("B")
    }
}
a();a();

var a= (function(){
    function someUP(){
        var setup="done"
    }

    function actualWork(){
        alert("actwork")
    }
    someUP();
    return actualWork;
}())

a();

//js作用域和闭包
因为js的作用域可以访问parent的作用域，即使parent作用域消失了。js里面保存的只是link，不是正式的值，
需要获取的时候查询一下。

function F(){
    var arr=[],i;
    for(i=0;i<3;i++){
        arr[i]=(function(t){
            return function(){
                return t;
            };
        }(i))
    }
    return arr;
}

var t= F();
alert(t[0]())


function F(){

    var binder=function(o){
        return function(){
            return o;
        }
    }

    var arr=[],i;
    for(i=0;i<3;i++){
        arr[i] = binder(i)
    }
    return arr;
}

var t= F();
alert(t[0]())

闭包和数组的迭代器
var setup=function(arr){
    var i=0;
    return function(){
        return arr[i++]
    }
}

var next = setup(["2","5","7"])
next();
next();
next();


var a=1;
function f(){
    function n(){
        alert(a)

    }
   
    n();
     var a=2;
}
f();


