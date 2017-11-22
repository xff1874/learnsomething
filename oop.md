### Object-oriented Javascript

### Q

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

//Array
var a =new Array(1,2,3,4);
如果a.length = 10;大于目前的数组，则会用undefined填充
slice vs splice.
slice 不影响原来的数组
splice 修改原来的数组。
```js
var a= [1,3,5];
var b = a.slice(0,2);
console.log(b) //[1,3]
console.log(a) //[1,3,5]

var c = a.splice(0,1,7)
console.log(a) //[7,3,5]
```
Array.keys,Array.values,Array.entries.

```js
let arr=["a","b","c"];
for(const key of arr.keys()){
    console.log(key)
}

//报错
for(const val of arr.values()){
    console.log(val)
}

for(const [index,val] of arr.entries){
    console.log(index,val)
}
```

property的作用
1. property指向一个对象
2. 只有function为构造函数才起作用
3. 所有被function constructor创建的对象有link对象。

```js

var ninjia={
    name:"ninja",
    getName:function(){
        return this.name;
    }
}

var F=function(){};
F.prototype = ninjia;

var f = new F();
f.getName();
```

function的toString()返回整个定义。
var f = function(){
    console.log("wending")
}
console.log(f.toString())

call vs array.
call和array因为可以指定this,所以可以指定重用method.
```js
var ninjia={
    name:"ninjia",
    throw(...rest){
        return "I'm "+this.name+rest;
    }
}

var farmer= {
    name:"farmer"
}

ninjia.throw.call(farmer,1,2,3,4)
```

this 问题
```js
var greeter = {
    default:"Hello",
    greet:function(names){
        names.forEach(function(name){
            console.log(this.default+name)
        })
    }
}

greeter.greet(["World","King"])
```
This.
当一个函数调用this的时候，如果一个函数是一个object的method.那么则this,指向这个object.如果是一个不是，则指向全局，比如上面。arrow function 可破
箭头函数没有this,this is inherited from this enclosing scope.
```js

var greeter={
    default:"Hello",
    greet:function(names){
        names.forEach(name=>console.log(this.default+name))
    }
}

greeter.greet(["China","World"]);
```

__ThisOfArrowFunctio__ 
Arrow Function是lexical scope。即静态返回，inner function 可以访问outer function.在编译时期觉得，所以arrow function 的this指定正确。而传统的function this指定是动态的，运行时才判断。

Regex.

```js
function RegExpMultilineDemo(flag){
    // The flag paramter is a string that contains
    //g,i or m. The flags can be combined;

    // Check flags for validity.
    if(flag.match(/[^gim]/)){
        return ("Flag specified is not valid")
    }//Create the string on which to perform the replacement.

    var ss = "The man hit the ball with the bat";
    ss+= "\nwhile the fielder caught the ball with the glove."

    //Replace "while" with "and"
    var re= new RegExp("^while",flag);
    var r = ss.replace(re,"and")

    var s ="";
    s+="Result for multiline=" + re.multiline.toString();
    s +=": "+r;
    return s;
}

var sa = RegExpMultilineDemo("m");
var sb = RegExpMultilineDemo("");
``
multiline从名字上可以看出是包括换行符，多行.\n\r,而不是直接搜索。

test vs exec
test 只返回true 或者false
exec 返回结果。

match vs search vs replace vs split
match 返回所有的结果
search 返回第一个匹配的位置

错误处理
```js
try{}
catch(e){}
finally{}
```

```
function F(){
    function C(){
        return this;
    }
    return C();
}
var o = new F();
```

```
function C(){
    this.a = 1;
    return false;
}
console.log(typoef new C())
```

for...of vs for...in 没看出优势？

Iterators
```js
function iter(array){
    var nextId = 0;
    return {
        next:function(){
            if(nextId < array.length){
                return {value:array[nextId++],done:false}
            }else{
                return {done:true}
            }
        }
    }
}
let it = iter(["Hello","World"])
it.next().value
it.next().value
it.next().done
```

ES6 实现iterable接口
1.实现Symbol.iteraotr接口
2.返回next 函数。
```js
let iter={
    0:"Hello",
    1:"World of",
    2:"JS",
    length:3,
    [Symbol.iterator](){
        let index = 0;
        return {
            next:()=>{
                        let value = this[index];
                        let done = index >= this.length;
                        index++;
                        return {value,done}
                }
        }
    }
}

for(let i of iter){
    console.log(i)
}

```

Generators 生成器。
```js
 function *generatorFunc(){
 console.log("1");
 yield;
 console.log("2")
 }
 var gen = generatorFunc();
 gen.next();
 ```
生成器 
1：*号。2，yield关键字。

1：generator 函数，调用之后不像普通的函数，而是返回一个generator对象。
2. generator对象调用next函数。结果为一个{value,done:false}对象。碰到yield暂停。
再次调用generatorObj.next(),结束的时候{done:true,value:xxx}

```js

function * logger(){
    console.log("start")
    console.log(yield);
    console.log(yield)
    console.log(yield)
    return ("end");
}

var log = logger();
log.next();

```

generator 也是iterator.

```js

function * logger(){
    yield 'a';
    yield "b";
}

var  log = logger();
log.next();
log.next();

```

抄一遍
```js
function * logger(){
    yield 'a';
    yield 'b'
}

for(const i of logger()){
    console.log(i)
}
const arr = [...logger()];
console.log(arr)

const [x,y] = logger();
console.log(x,y)
```

ES6集合 Collections

### Map
```js
const m = new Map();
m.set("first",1);
m.get("first")
```
标准的set/get。而不像以前用object，有什么用？
可以判断,删除，大小,清除等参数。

```js
const m = new Map();
m.set("first",1);
m.get("first")
m.has("first")
m.delete("first");
m.has("first")
m.size;
m.clear();
```
创建二维数组。
```js
const m2 = new Map([
    [1,"one"],
    [2,"two"],
    [3,"three"]
])

const m3 = new Map().set(1,"one").set(2,"two").set(3,"three");
```
Map iterator

```js
const m = new Map([
    [1,"one"],
    [2,"two"],
    [3,"three"]
])

for(const k of m.keys()){
    console.log(k)
}

for(const v of m.values()){
    console.log(v)
}

for(const entry of m.entries()){
    console.log(entry)
}
for(const [k,v] of m.entries()){
    console.log(k,v)
}
// map转为数组
const keys = [...m.keys()];
console.log(keys)

const arr = [...m];
console.log(arr)
```

Set
类似Map，只能拥有一个唯一的value
```js
const s = new Set();
s.add("first");
s.has("first");
s.delete("first");
s.has("first")
```
WeakMap.WeakSet vs Map,Set
1. 支持的操作的api有限
2. 对key和value的数据类型有限制。
3. 无法iterator

WeakMap vs Map
WeakMap的key必须是obj。
WeakMap对key只是引用，当删除后，垃圾回收立马执行。

```js
var k1 = {a:1};
var k2= {b:2};
var map = new Map();
var wm = new WeakMap();
map.set(k1,"k1");
wm.set(k2,"k2");
k1 = null;
map.forEach((k1,val)=>{
    console.log(k1,val)
})
k2=null;
wm.get(k2)
```
### prototype

每个函数都有prototype,默认是个有construcor 指向自己的对象。
```js
function foo(a,b){
    return a * b;
}

typeof foo.prototype == "object"

可以赋值
foo.prototype = {};
```

```js
function Gadget(name,color){
    this.name = name;
    this.color = color;
    // this.whatAreYou = function(){
    //     return "I am a " + this.color + " " + this.name;
    // }
}

var g1 = new Gadget("g1","red")
var g2 = new Gadget("g2","black")


Gadget.prototype.whatAreYou = function(){
        return "I am a " + this.color + " " + this.name;
    }
Gadget.prototype.color="blue" ;
Gadget.prototype.name="gadget" ;
Gadget.prototype.price = 100;
Gadget.prototype.rating = 3;
Gadget.prototype.getInfo = function(){
    return "Rating: " + this.rating + ", price: "+ this.price;
};
//这种方式，少了constructor
// Gadget.prototype = {
//     price:100,
//     rating:3
//     constructor:Gadget
// }
g1.whatAreYou();
g2.whatAreYou();
```
所有new的对象都可以访问函数prototype上的值
var g3 = new Gadget("g3","yellow");
g3.name;
g3.price;
g3.getInfo();

对prototoye是引用，所以即使是对象在之前创建，任然可以用新的方法。

```js
function Gadget(name,color){
    this.name = name;
    this.color = color;
    // this.whatAreYou = function(){
    //     return "I am a " + this.color + " " + this.name;
    // }
}




Gadget.prototype.whatAreYou = function(){
        return "I am a " + this.color + " " + this.name;
    }
var g1 = new Gadget("g1","red")


Gadget.prototype.price = 100;
Gadget.prototype.rating = 3;
Gadget.prototype.getInfo = function(){
    return "Rating: " + this.rating + ", price: "+ this.price;
};

var g2 = new Gadget("g2","black");
g1.getInfo();
g1.price;
g2.getInfo();

console.log(g2.constructor.prototype.rating) 
//每个对象都有一个construcotr指向当前的构造函数，prototoype函数的prototype对象，也有constructor属性。

```
//owner property vs prototype property
```js
function Gadget(name){
    this.name = name;
}

Gadget.prototype.name = "mirror"

var  g1 = new Gadget("Hello")
g1.name;
delete g1.name;
g1.name;
g1.hasOwnProperty("name") //对象维度是否有这个属性
g1.toString()
g1.hasOwnProperty('toString')
g1.constructor.prototype.hasOwnProperty("toString")
Object.hasOwnProperty('toString')
Object.prototype.hasOwnProperty('toString')
```

```js
var params = {
    productid:666,
    section:"products"
}

var url = "http://example.org/page.php?",i,query=[];

for(i in params){
    query.push(i+ '=' + params[i])
}

url += query.join("&");
```
1. for ...in 数组长度和constructor属性没有出现。
2. 可枚举的可以用propertyIsEnumerable()来判断。
3. hasOwnProperty来判断对象自己的属性。

```js
function Gadget(name,color){
    this.name = name;
    this.color = color;
    this.getName = function(){
        return this.name;
    }
}

Gadget.prototype.price = 100;
Gadget.prototype.rating = 3;

var newtoy = new Gadget("webcam","black");

for(var prop in newtoy){
    console.log(prop + '=' + newtoy[prop])
}//输出了所有的，包括prototype的对象

newtoy.hasOwnProperty("name");//true;
newtoy.hasOwnProperty("price") //false

for(var prop in newtoy){
    if(newtoy.hasOwnProperty(prop)){
        console.log(prop+'='+ newtoy[prop])
    }
}
//然后用propertyIsEnumerable来判断，属性是否属于自己可枚举的
newtoy.propertyIsEnumerable("name");
newtoy.propertyIsEnumerable("price")
newtoy.constructor.prototype.propertyIsEnumerable("price")
```
判断对象的Prototype.isPrototypeOf

```js
var monkey = {
    hair:true,
    feeds:"bananas",
    breathes:"air"
}
function Human(name){
    this.name = name;
}
Human.prototype = monkey

var goose = new Human("goose")

monkey.isPropertyOf(goose)//判断某个对象是否是另外一个对象的原型
Object.getPrototypeOf(goose)//根据某个对象获取它的原型对象
ES5里面通过__proto__来判断。
var developer = new Human ("developer");
console.log(developer.__proto__)
console.log(developer.__proto__ == monkey)

typeof developer.__proto__
typeof developer.prototype;
typeof developer.constructor.prototype;
```

__proto__ vs prototype
__proto是对象的属性
prototype是构造函数的属性。

扩展
```js
Array.prototype.inArray = function(needle){
    for(var i=0,len = this.length;i<len;i++){
        if(this[i] == needle)
        return true;
    }
    return false;
}
var colors = ["red","blue","purple"];
colors.inArray("red")
colors.inArray("yellow")
```
```js
String.prototype.reverse=function(){
    return Array.prototype.reverse.apply(this.split("")).join("")
}
"blue".reverse();
```
```js
 if(typeof String.prototype.trim != "function"){
     String.prototype.trim = function(){
         return this.replace(/^\s+|\s+$/g,'')
     }
 }
 " hello ".trim();
```

Prototype problem
1. 原型链是动态的
2. constructor不可靠

```js
function Dog(){
    this.tail = true;
}

var benji = new Dog();
var rusty = new Dog();

benji.__proto__
Object.getPrototypeOf(rusty)

Dog.prototype.say = function(){
    return "wolf"
}

benji.say();
rusty.say();
//overwrite prototype
Dog.prototype = {
    paws:4,
    hair:true
}
tyoepf benji.paws;
// 这里是undefine 即使prototype 已经变了，但是benji还是指向之前的prototype
//constructor 也变了。
benji.__proto__
Object.getPropertyOf(benji) 都一样还是指向创建时候的那个Prototype对象

var lucy = new Dog();
lucy.paws //4;
```


