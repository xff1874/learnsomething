var MYAPP = {};
MYAPP.namespace = function(name) {
    var parts = name.split(".");
    var current = MYAPP;
    for (var i = 0; i < parts.length; i++) {
        if (!current[i]) current[parts[i]] = {};
        current = current[parts[i]];
    }
};

MYAPP.namespace("event");
MYAPP.namespace("dom.style");
