

class Person {
    constructor(name) {
        this.name = name;
    }

    sayName() {
        console.log(this.name);
    }
}

let tom = new Person('Tom');
tom.sayName();