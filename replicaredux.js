let obj = {};


function subscribe(event, callback) {
    var arr = obj[event]
    if (!arr)
        obj[event] = [];
    obj[event].push(callback);
}

function dispatch(event) {
    var arr = obj[event];
    for (var i = 0; i < arr.length; i++) {
        arr[i]();
    }
}

const a1 = function () {
    console.log("a1")
}

const a2 = function () {
    console.log('a2');
};

subscribe("clone", a1);
subscribe("clone", a2);
dispatch("clone")