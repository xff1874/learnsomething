function A(){}
function B(name){
    this.name= name;
}

B.prototype.getName=function (){
    return this.name;
}

A.prototype = new B("bbb");
A.prototype.constructor=A;
var a = new A();

var F =function(){};
F.prototype = B.prototype;
F.prototype.constructor = F;
A.prototype = new F();
A.prototype.constructor = A;

var obj = {
    name:"zwd",
    numbers:[1,2],
    address:{
        city:"hz"
    }
}

function copyObj(o){
    var c = {};
    for(var i in o){
        //判断对象。
        
        c[i] = o[i];
    }
    return c;
}

