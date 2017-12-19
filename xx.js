function createValidator(target, validator) {
    return new Proxy(target, {
        _validator: validator,
        set(target, key, value, proxy) {
            if (target.hasOwnProperty(key)) {
                let validator = this._validator[key];
                if (!!validator(value)) {
                    return Reflect.set(target, key, value, proxy);
                } else {
                    throw Error(`Cannot set ${key} to ${value}.Invalid`);
                }
            } else {
                throw Error(`${key} is not a valid property`);
            }
        }
    });
}

const personValidator = {
    name(val) {
        return typeof val === "string";
    },
    age(val) {
        return typeof age === "number" && age > 18;
    }
};

class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
        return createValidator(this, personValidator);
    }
}

const bill = new Person("Bill", 22);

bill.name = 0;
bill.age = "Bill";
