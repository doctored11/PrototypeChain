const btn = document.getElementById("button");
btn.addEventListener("click", showPrototypeChain);

function showPrototypeChain() {
  const input = document.getElementById("classInput");
  const output = document.getElementById("output");

  output.innerHTML = "";

  const constructor = window[input.value.trim()];
  if (typeof constructor !== "function") {
    input.classList.add("error");
    output.textContent = "Ошибка: Класс не найден.";
    return;
  }

  input.classList.remove("error");

  let prototypeChain = [];
  let prototype = constructor.prototype;
  while (prototype) {
    prototypeChain.push(prototype);
    prototype = Object.getPrototypeOf(prototype);
  }

  const ol = document.createElement("ol");

  for (let i = 0; i < prototypeChain.length; i++) {
    const listItem = document.createElement("li");
    const constructorName =
      prototypeChain[i].constructor.name || "Без названия";
    const consType = typeof constructorName
    listItem.textContent = `${constructorName} : ${consType} `;

    const protoMethods = Object.getOwnPropertyNames(prototypeChain[i]);
    if (protoMethods.length > 0) {
      const nestedOl = document.createElement("ol");
      for (const method of protoMethods) {
        const nestedListItem = document.createElement("li");
        const methodType = typeof method;
        nestedListItem.textContent = `${method}: ${methodType}`;
        nestedOl.appendChild(nestedListItem);
      }
      listItem.addEventListener("click", () => {
        if (nestedOl.style.display === "none") {
          nestedOl.style.display = "block";
        } else {
          nestedOl.style.display = "none";
        }
      });

      
      nestedOl.style.display = "none";

      listItem.appendChild(nestedOl);
    }

    

    ol.appendChild(listItem);
  }

  output.appendChild(ol);
}
//
//Проверочные классы присвоенные в window, не относится к заданию. Для проверки: Person Teacher Student
//
window.Person = class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  sayHello() {
    console.log(`Привет, меня зовут ${this.name} и мне ${this.age} лет.`);
  }

  get occupation() {
    return "Неизвестно";
  }
};

window.Teacher = class Teacher extends Person {
  constructor(name, age, subject) {
    super(name, age);
    this.subject = subject;
  }

  sayHello() {
    console.log(
      `Привет, меня зовут ${this.name}, мне ${this.age} лет и я преподаю ${this.subject}.`
    );
  }
};

window.Student = class Student extends Person {
  constructor(name, age, grade) {
    super(name, age);
    this.grade = grade;
  }

  sayHello() {
    console.log(
      `Привет, меня зовут ${this.name}, мне ${this.age} лет и я учусь в ${this.grade} классе.`
    );
  }

  get hobbies() {
    return ["Чтение", "Спорт", "Готовка"];
  }
  get ageCategory() {
    if (this.age < 12) {
      return "Ребенок";
    } else if (this.age >= 12 && this.age < 18) {
      return "Подросток";
    } else {
      return "Взрослый";
    }
  }
};

const person = new Person("Иван", 30);
const teacher = new Teacher("Алиса", 40, "Математика");
const student = new Student("Боб", 18, 12);
