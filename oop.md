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

```js
function Person(name){
    this.name=name;
}

Person.prototype.getName=function(){
    return this.name;
}

function China(name,area){
    this.area = area;
    Person.call(this,name)
}
// let p = new Person("p");
China.prototype = new Person();
China.prototype.constructor = China;

var zhejiang = new China("zwd","zhejiang");
console.log(zhejiang.getName());
```

```js
function Shape(){
    this.name = "Shape";
    this.toString= function(){
        return this.name;
    }
}

function TwoDShape(){
    this.name = '2D shape';
}

function Triangle(side,height){
    this.name = "Triangle";
    this.side = side;
    this.height = height;
    this.getArea = function(){
        return this.side * this.height /2;
    }
}

TwoDShape.prototype = new Shape();
Triangle.prototype = new TwoDShape();
TwoDShape.prototype.constructor = TwoDShape;
Triangle.prototype.constructor = Triangle;

var my = new Triangle(5,10);
my.getArea();

console.assert(my.constructor === Triangle,"my.constructor !== Triangle")
console.assert(my instanceof Triangle,"my is not Triangle")
console.assert(my instanceof TwoDShape,"my is not TwoDShape")
console.assert(my instanceof Shape,"my is not Shape")
console.assert(my instanceof Array,"my is not Array")

//isPrototypeOf
console.assert(Shape.prototype.isPrototypeOf(my),"Shape.prototype.is not PrototypeOf my")
console.assert(TwoDShape.prototype.isPrototypeOf(my),"TwoDShape.prototype.is not PrototypeOf my")
console.assert(Triangle.prototype.isPrototypeOf(my),"Triangle.prototype.is not PrototypeOf my")
console.assert(String.prototype.isPrototypeOf(my),"String.prototype.is not PrototypeOf my")

```
//属性不变和方法的移到prototype
```js
function Shape(){
    this.name = "Shape";
}
Shape.prototype.name  = "Shape"
Shape.prototype.toString = function(){
    return this.name;
}
```
//只继承prototype
```js
function Shape(){}
Shape.prototype.name = "Shape";
Shape.prototype.toString = function(){
    return this.name;
};

function TwoDShape(){};
TwoDShape.prototype = Shape.prototype;
TwoDShape.prototype.constructor = TwoDShape;
TwoDShape.prototype.name = "2D shape";

function Triangle(side,height){
    this.side = side;
    this.height = height;
}

Triangle.prototype = TwoDShape.prototype;
Triangle.prototype.constructor = Triangle;
Triangle.prototype.name = "Triangle";
Triangle.prototype.getArea=function(){
    return this.side * this.height/2;
}

var my = new Triangle(5,10);
my.getArea();
my.toString()
```
//副作用，指向同一个对象
```js
var s = new Shape();
s.toString(); //triangle
```
一个临时的构造函数
```js

function Shape(){}
Shape.prototype.name = "Shape";
Shape.prototype.toString = function(){
    return this.name;
};

function TwoDShape(){};


function Triangle(side,height){
    this.side = side;
    this.height = height;
}


function f2(){};
f2.prototype = Shape.prototype;
var f22 = new f2();
TwoDShape.prototype = f22;

TwoDShape.prototype.constructor = TwoDShape;
TwoDShape.prototype.name = "2D shape";

function f1(){};
f1.prototype = TwoDShape.prototype;//注意顺序，new 一个对象会__proto__指向之前的对象
var f11 =  new f1();
Triangle.prototype = f11;
Triangle.prototype.constructor = Triangle;
Triangle.prototype.name = "Triangle";
Triangle.prototype.getArea=function(){
    return this.side * this.height/2;
}

var t1 = new Triangle(4,2)
t1.toString();

```
#### A temporary constructor -- new F();
1.F()的prototype 指向constructor的prototype
2. new F() 没有任何属性
```js
function Shape(){}
Shape.prototype.name = "Shape";
Shape.prototype.toString = function(){
    return this.name;
}

function TwoDShape(){}
var F= function(){};
F.prototype = Shape.prototype;
TwoDShape.prototype = new F();
TwoDShape.prototype.constructor = TwoDShape;
TwoDShape.prototype.name = "2D shape";

function Triangle(side,height){
    this.side = side;
    this.height = height;
}

var F = function(){};
F.prototype = TwoDShape.prototype;
Triangle.prototype = new F();
Triangle.prototype.constructor = Triangle;
Triangle.prototype.name = "Triangle";
Triangle.prototype.getArea=function(){
    return this.side * this.height/2;
}

var my = new Triangle(5,10);
my.getArea();
my.toString();

console.assert(my.__proto__ === Triangle.prototype,"wrong")
console.assert(my.__proto__.__proto__ === TwoDShape.prototype,"wrong")
console.assert(my.__proto__.__proto__.__proto__.constructor === Shape,"wrong")

var s = new Shape();
s.name;
```

uber,类似super,指向某个parent。这里是直接写死，如何实现一个super？
```js
function extend(Child,Parent){
    var F = function(){}
    F.prototype = Parent.prototype;
    Child.prototype = new F();
    Child.prototype.constructor = Child;
    Child.uber = Parent.prototype;
}

function Shape(){}
Shape.prototype.name = "Shape";
Shape.prototype.toString=function(){
    return this.constructor.uber?this.constructor.uber.toString() + " "+this.name:this.name;
};

function TwoDShape(){}
extend(TwoDShape,Shape)
TwoDShape.prototype.name = "TwoDShape";

function Triangle(side,height){
    this.side  = side;
    this.height = height;
} 
extend(Triangle,TwoDShape);
Triangle.prototype.name = "Triangle";
Triangle.prototype.getArea=function(){
    return this.side * this.height/2;
}

new Triangle().toString();
```
```js
//更为简洁的版本，直接复制，避免了指向问题。只是这种方法只能继承方法，而不是类。但是
// c instanceOf 通不过。副作用 指向同个对象，Child.prototype指向变化会导致Parent.prototype变化。
//引用拷贝是对于基本的数据类似是复制，对于对象，指向同个对象，会有问题

function A(){};
function B(){};
B.prototype.name = "B"
function extends2(Child,Parent){
    var p = Parent.prototype;
    var c = Child.prototype;
    for(var i in p){
        c[i]=p[i]
    }
    c.uber = p;
}
extends2(A,B)
A.prototype.name;
```

对象继承另外一个对象
```js
function extendCopy(p){
    var c= {};
    for(var i in p){
        c[i]=p[i]
    }
    c.uber=p
    return c;
}
//问题对象类型只是引用
var shape = {
    name:"Shape",
    toString:function(){
        return this.name;
    }
}
var twoDee = extendCopy(shape);
twoDee.name = "2D shape";
twoDee.toString = function(){
    return this.uber.toString()+ " " + this.name;
}

var triangle = extendCopy(twoDee);
triangle.name = "Triangle";
triangle.getArea= function(){
    return this.side * this.height/2;
}
triangle.toString();

function deepCopy(p,c){
    var c = c||{};
    for(var i in p ){
        if(typeof p[i] === "object"){
           c [i] == Array.isArray(p[i])?[]:{}
           deepCopy(p[i],c[i]);
        }else{
            c[i]=p[i];
        }
    }
    return c;
}

var parent = {
    numbers:[1,2,3],
    obj:{
        props:1
    },
    bool:true
}

var mydeep = deepCopy(parent);
mydeep.numbers.push(4,5,6);
mydeep.obj.props
parent.numbers
```

```js
function deepCopy(p,c){
    var c = c||{};
    for(var i in p ){
        if(p.hasOwnProperty(i)){ //只拷贝对象本身的属性
            if(typeof p[i] === "object"){
                c [i] = Array.isArray(p[i])?[]:{}
                deepCopy(p[i],c[i]);
             }else{
                 c[i]=p[i];
             }
        }
       
    }
    return c;
}



var parent = {
    numbers:[1,2,3],
    obj:{
        props:1
    },
    getNumber:function(){
        return this.numbers;
    },
    bool:true
}

parent.getNumber.prototype.name="parent";
var mydeep = deepCopy(parent);
console.log(mydeep.numbers.push(4,5,6));
console.log(mydeep)
mydeep.getNumber.prototype.name="mydeep";
mydeep.getNumber=function(){
    return "2"
};
console.log(parent.getNumber.prototype.name)

1.hasOwnProperty 去掉杂志，只拷贝对象本身
2.Object.prototype.toString.call(candidate) == "[object Array]"
3.虽然指向同一个函数，但是基本无影响，因为是公用的。不会改变内部。但是会改变函数的属性。

var a = function(){
    alert("a")
}
a.prototype.name ="A";
var b = a;
b=function(){
    alert("b")
}

a();


```

```js 继承某个对象

 function eObject(o){
     function F(){};
     F.prototype = o;
     return new F();
 }


```

1. 继承Object,function有什么区别。
2. 深度拷贝和继承Object有什么区别。

如何继承相关属性，并添加一些额外的属性。
```js

function extend(o,suff){
   let obj;
   var F = function(){};
   F.prototyope = o;
   F.prototyope.constructor= F;
   obj = new F();
   obj.uber = o;

    for(var i in suff){
        obj[i]=suff[i]
    }
    return obj;
}

var shape ={
    name:"Shape",
    toString:function(){
        return this.name;
    }
}

var twoDee = extend(shape,{
    name:"2D shape",
    toString:function(){
        return this.uber.toString()+" "+this.name;
    }
})

twoDee.toString();
                                                                    
```
//multiple inhertiance 把属性全部拷贝到一个对象。
muti and Mixins就是同一个方法
```js
function muti(){
    var n = {},stuff,len = arguments.length;
    for(var i=0;i<len;i++){
        stuff = arguments[i];
        for(j in stuff)
        if(stuff.hasOwnProperty(j)){
            n[j] = stuff[j]
        }
    }
    return n;
}
var shape = {
    name:"shape",
    toString:function(){
        return this.name;
    }
}

var twoDee = {
    name:"2D shape",
    dimensions:2
}
var triangle = muti(shape,twoDee,{
    name:"Triangle",
    getArea:function(){
        return this.side * this.height/2;
    },
    side:5,
    height:10
})

triangle.dimensions;
triangle.toString();

```

继承主要有2类
1.function,class 类继承。new Child.可以获得所有的Parent方法。
2.copy object.可以用deepclone或者protptoye及augment.
   1.deepclone.
   2.prototype inheritance
   3.extend and augment 这个最好，即利用2，又可以添加自己的相关属性。
3.muti inheritance。多重继承。      

#### Chapter8 ES6 Classes
```js
 class Logger{
     static log(level,message){
         console.log(`${level}:${message}`)
     }
 }

 Logger.log("ERROR","The end is near")

 const logger = new Logger("ERROR");
 logger.log("The end is near");

```     

ES6的模块系统是一个文件一个模块。
模块的暴露用expose.
```js
    
   export const port = 8080;
   export function startServer(){}
   export class Config(){};

   import * from "server"

    //默认类，暴露了一个默认的类
   export default class{}
    import Server from "server" //Server名字随便取
```     
1. 模块单根，无论引用多少次，只是一个对象
2. 变量，函数只有明确export，才会暴露，否则是模块本身的。
3. import的时候，js后缀可以省略。


### chapter 9
多线程：多cpu或者一个cpu调度现场。
多线程问题：相互通信。
有immutable thread?
异步模型：
1. 只有一个线程。
2. 如果有个任务有阻塞，会执行第二个任务。

```js                                                                 
      function b(){
          console.log("b")
      }               
      function c(){
          b();
          console.log("c")
      }

      function a(n){
          c();
      }
      a();   
```

1. stack 里面创建第一个frame 包括a及变量
2. stack 里面创建第二个frame，包括c()
3. stack 里面创建第三个frame,包括b();

event loop: 一个浏览器tab
message queue. 所有回调。

setTimeout(fn,timer);
经过timer将fn添加到message queue.

CPS:上一个的结果是下一个函数的输入参数。

Promise的三种状态，状态互斥
1. pending. 初始化。
2. fulfilled. result is ready.
3. rejected. 错误

then,表示的是promise执行后的状态，包括成功和失败两种。

```js
function loadImage(url){
    return new Promise(function(resolve,reject){
        const image = new Image();
        image.onload = function(){
            resolve(image)
        }

        image.onerror= function(){
            reject(new Error('Could not load image at ' + url));
        }
        image.src = url;
    })
}
loadImage("www.163.com").then(function(){},function(err){
    console.log(err)
})
```

Promise then有时候只有一个fn,因为第一个是resolve.
catch  == then(undefined,reject).
chain.
then. 如果返回一个普通的值，第二个then接受。
如果返回一个promise-like对象，会等到promise状态变化才返回，也就是会等到异步请求回来。
```js
var promise = new Promise(function(resolve,reject){
    resolve(1)
})

promise.then(function(val){
    return val+2;
}).then(function(val){
    console.log(val)
}) //返回3
```

```js

Promise.resolve("foo").then(function(string){
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            string += "bar";
            resolve(string)//如果去掉resolve，一直pending。因此也没有结果。
        },1)
    }).then(function(string){
        setTimeout(function(){
            string += "baz";
            console.log(string)
        },1)
        return string;
    }).then(function(string){
         console.log("Last Then:  oops... didn't bother to instantiate and return " +
                "a promise in the prior then so the sequence may be a bit " +
                "surprising");
        console.log(string)
    })
})
```
虽然第一个用setTimeout调用了异步的一个函数。但是任然等到他结束。而第二个setTimout.最后才执行。

代理作用非常强，可以对属性的访问（set/get）,函数调用做拦截，比自身用set/get，一无侵入。二，可以复用。

```js
var handler = {
    get:function(target,name){
        if(name in target){
            return target[name]
        }else
            return " sorry"
    },
    construct: function(target, argumentsList, newTarget) {
        console.log("cc",target,argumentsList,newTarget)
    },
    set:function(obj,prop,value){
        if(prop == "age"){
            if(!Number.isInteger(value)){
                throw new Error("age must be number")
            }
        }
         obj[prop]=value;
    }
}

function Person(name){
    this.name = name;
}
var obj = new Proxy(new Person("ttt"),handler);

// var proxy = new Proxy({},handler)
// proxy.age="100"

// proxy.a = 1;
// console.log(proxy.a);
// console.log(proxy.b)

```

//todo:了解一下
MDN proxy,revocalbe,https://www.w3cplus.com/javascript/use-cases-for-es6-proxies.html的作用
