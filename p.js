function A() {}
A.prototype = {
    getName: function() {}
};

A.prototype.constructor = A;

function B(age) {
    this.age = age;
}

var b = new B();

b.getName();

b instanceof A;
