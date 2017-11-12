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

对于Object来说，key有没有""区别不大，直到：
1. 数字key
2. 特殊字符
3. 保留关键字。

对于对象属性值的访问，1.dot 2.[]// 后者可以是个变量或者表达式
var key="name"
obj[key]

//构造函数，类的作用，this,首字符大写。如果不 new.只是作为普通的函数调用，就不会产生新对象。

function Hero(name){
    this.name= name;
    this.occupation = "Nijia";
    this.whoAreYou = function(){
        return "I'm "+ this.name + this.occupation ;
    }
}

var h1 = new Hero("Batman")
var h2 = new Hero("Superman")
h1.whoAreYou();
h2.whoAreYou();


var h3 = Hero("Leno")
// constructor 关键字，对象的构造函数,可以赋值。可以在不知道构造函数的时候动态调用构造函数
var h4= new h1.constructor("Thor")
h4.whoAreYou();

//有了构造函数，才有了instanceOf，来判断对象是由哪个构造函数创建的。
function factory(name){
    return {
        name:name
    }
}

var b1= factory("Jane")
b1.constructor //Object() { [native code] }

//构造函数，如果return {},则会返回对象，constructor也会变成Object.
```js
function Factory(name){
    this.name = name;
    return {
        age:12
    }
}

var b1 = new Factory("Tim"); //Object() { [native code] }
b1.name;
b1.age;
b1.constructor
```

//传值
对象的传值，只是引用的变动。因此如果重新赋值会影响原来的值。

```js

var o1={
    age:12
}

var o2 = o1;
o2.age=15;
console.log(o1.age) //15

function changeAge(obj){
    obj.age= 8;
}

changeAge(o1)
o1.age //8
```

//ES6 字面量。如果key和value相同，可以简写，method可以忽略function
```js
let name = 1;
let my ={
    name,
    getName(){
        return this.name
    }
};

my.getName()
```
ES6的key，可以计算。这个ES5也可以啊,用[]
function car(){
    return "car"
}
let my2={
    [car()]:"Jeep"
};
my2.car
上面是property.下面是method
let getCar=()=>"car"

let my3={
    [getCar()](){
        return "BMW"
    }
}
my3.car();

//对象属性的特征。Object property attribute
1. 是否可以枚举.for in.
2. 是否可以管理,delete
如何判断
```js
Object.getOwnPropertyDescritpor();
let obj = {
    name:"12"
}
console.log(Object.getOwnPropertyDescriptor(obj,"name"))
//{value: "12", writable: true, enumerable: true, configurable: true}
//可以用Object.defineProperty(obj,property,value)
Object.defineProperty(obj,"name",{configurable:false})
//用这个函数可以改变property的值
```

Object.assign(traget,source1,source2)
只会拷贝enumerable的值。
```js
let a = {name:"hello"}
Object.defineProperty(obj,"age",{enumerable:false,value:"34"})

var b = Object.assign({},a)
console.log(b)//{name: "hello"}
```

//destructuring
```js
let person = {
    name:"Herry",
    age:32
}
let {name:nickname} =person;
console.log(nickname)
```
```js
let config = {
    server:"localhost",
    port :"8080"
}
let server = "127.0.0.1"
let port = "80";
({server,port} = config)
console.log(server,port)
```
同样适用于数组
```js
const arr = ["a","b"]
const [x,y] =arr;//这里是2个变量,注意这里不是{}，而是[]
console.log(x,y,z)
```
swap
```js
let a = 1,b=2;
[a,b]=[b,a]
console.log(a)
```
结合rest operator?
let [t,...y] = ["a","b","c"];
console.log(y)

Object.toString 返回字符串代表某种类型
"[object Object]"
"[object Date]"