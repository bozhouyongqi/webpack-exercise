

// class Person {
//     constructor(name) {
//         this.name = name;
//     }

//     sayName() {
//         console.log(this.name);
//     }
// }

// let tom = new Person('Tom');
// tom.sayName();
import img from './public/img/fbb.jpg';
const imgElem = document.createElement('img');
imgElem.src = img;

document.body.appendChild(imgElem);
