function isArray(obj) {
    return Object.prototype.toString.call(obj) == "[object Array]"
}

function deepclone(obj) {
    if (typeof obj != "object" || obj == null)
        return obj;
    var target = isArray(obj) ? [] : {};
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            typeof obj[key] == "obj" ? clone(obj[key]) : target[key] = obj[key]

        }
    }
    return target;
}



function deep2(obj) {
    if (obj == null || typeof (obj) != "object")
        return obj;
    var temp = new obj.constructor();
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            temp[key] = deep2(obj[key])
        }
    }
    return temp;

}

function deep3(obj) {
    return JSON.parse(JSON.stringify(obj))
}

var a1 = function () {
    console.log("hello a1")
}
var b1 = deepclone(a1);
console.log(b1);

var a2 = ["1", "2"]
var b2 = deep2(a2);
console.log(b2)


var a3 = { name: "a3", address: { isLocal: true } }
var b3 = deep3(a3);
console.log(b3)
