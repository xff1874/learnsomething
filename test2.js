
A()
B();

var A=function(){
    this.age="1";
    alert("A")
}

function B(name){
    this.name = name
    alert("B")
}

A.prototype= new B("zzz");
A.prototype.construcotr = A;
var a = new A();

var F=function(){};
F.prototype = B.prototype;
A.prototype = new F();
A.prototype.construcotr = A;
