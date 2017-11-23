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
f1.prototype = TwoDShape.prototype;
var f11 =  new f1();
Triangle.prototype = f11;
Triangle.prototype.constructor = Triangle;
Triangle.prototype.name = "Triangle";
Triangle.prototype.getArea=function(){
    return this.side * this.height/2;
}

var t1 = new Triangle(4,2)
t1.toString();