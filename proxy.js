let api = {
    _apiKey: "dsdfsf",
    getUser() {},
    getUser(userId) {},
    setUser(userId, config) {}
};

function logMethodAsync(timestamp, method) {
    setTimeout(function() {
        console.log(`${timestamp} - Loggin ${method} request asynchronously`);
    }, 0);
}

api = new Proxy(api, {
    get(target, key, proxy) {
        var val = target[key];
        return function(...arguments) {
            var args = arguments;
            logMethodAsync(new Date(), key);
            return Reflect.apply(val, target, args);
        };
    }
});

api.getUser(2222);
