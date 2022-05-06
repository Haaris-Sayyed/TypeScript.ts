let TODO: string = "Pick up drycleaning";
let firstname: string = "John";

// ########################## ES6 Language Features ##########################

// Default parameters
var container = document.getElementById("container");

function countdown(initial, final = 0, interval = 1) {
  var current = initial;

  while (current > final) {
    container.innerHTML = current;
    current -= interval;
  }
}

countdown(10);

// template strings

var todoObject = {
  id: 123,
  name: "Pick up drycleaning",
  completed: true,
};

var displayName = `Todo #${todoObject.id}`;

container.innerHTML = `
<div todo='${todoObject.id}' class="class-list-item">
  <i class="${
    todoObject.completed ? "" : "hidden"
  } text-success glyphicon glyphicon-ok"></i> 
  <span class="name">${todoObject.name}</span>
</div>
`;

// let and const

for (var i = 0; i < 5; i++) {
  var counter = i; // var has global scope
  let counter1 = i; // let & const have block scope
}

console.log(counter);
// console.log(counter1) causes exception due to block scope

// for in loop

var array = ["Pick up drycleaning", "Clean Batcave", "Save Gotham"];

for (var index in array) {
  var value = array[index];
  console.log(`${index} : ${value}`);
}

// for of loop

for (var value of array) {
  console.log(`${value}`);
}

// Lambdas

function Counter(el) {
  this.count = 0;

  el.innerHTML = this.count;

  //   let _this=this;
  //   el.addEventListener("click", function () {

  //     // for event handler of an browser click event, this keyword refers to global browser scope
  //     _this.count += 1;
  //     el.innerHTML = _this.count;
  //   });

  el.addEventListener("click", () => {
    this.count += 1;
    el.innerHTML = this.count;
  });
}

new Counter(container);

// destructuring

var task = [123, "Pick up drycleaning", false];
var [id, title, completed] = task;
console.log(`
id: ${id}
title: ${title}
completed: ${completed}`);

var taskObject = {
  ID: 123,
  Title: "Pick up drycleaning",
  Completed: true,
};

var { ID, Title, Completed } = taskObject;

function getTask() {
  var taskObject = {
    ID: 123,
    Title: "Pick up drycleaning",
    Completed: true,
  };
  return taskObject;
}

// if wanted to reference object properties with different names

var { ID: taskId, Title: taskTitle, Completed: isCompleted } = getTask();

function countDown({
  initial,
  final: final = 0,
  inerval: interval = 1,
  initial: current,
}) {
  while (current > final) {
    container.innerHTML = current;
    current -= interval;
  }
}

// spread operator

// function add() {

//   // function that takes variable number of arguments

//   var values = Array.prototype.splice.call(arguments, [1]),
//     total = 0;
//   for (var value of values) {
//     total += value;
//   }
//   return total;
// }

function add(...values) {
  // function that takes variable number of arguments
  var total = 0;
  for (var value of values) {
    total += value;
  }
  return total;
}

console.log(add());
console.log(add(1, 2, 3, 4, 5));

function calculte(action, ...values) {
  var total = 0;
  for (var value of values) {
    switch (action) {
      case "add":
        total += value;
        break;
      case "subtract":
        total -= value;
        break;
    }
  }
  return total;
}

console.log(calculte("subtract", 1, 2, 3, 4, 5));

var source = [3, 4, 5];
var target = [1, 2, ...source, 6, 7, 8];
console.log(target);

// Computed properties

const osPrefix = "os_";

var support = {
  [osPrefix + "Windows"]: isSupported("Windows"),
  [osPrefix + "iOS"]: isSupported("iOS"),
  [osPrefix + "Android"]: isSupported("Android"),
};

function isSupported(os) {
  return Math.random() >= 0.5;
}
console.log(support);

// ########################## Type Fundamentals ##########################

function totalLength(x: string, y: string): number {
  let total = x.length + y.length;
  return total;
}

function addLengths(x: string | any[], y: string | any[]): number {
  let total = x.length + y.length;
  return total;
}

// overloading
function sumofLengths(x: string, y: string): number;
function sumofLengths(x: any[], y: any[]): number;
function sumofLengths(x: string | any[], y: string | any[]): number {
  let total = x.length + y.length;
  return total;
}

// ########################## Custom types ##########################

interface Todo {
  id: number;
  // used for compile time check only and has no effect on code at runtime
  name: string;
  completed?: boolean;
}

interface jQueryElement {
  data(name: string): any;
  data(name: string, data: any): jQueryElement;
}

interface jQueryElement {
  todo(): Todo;
  todo(todo: Todo): jQueryElement;
}
interface jQuery {
  (selector: string | any): jQueryElement;
  fn?: any;
  version?: number;
}

// var $ = <jQuery>function (selector: string) {
//   // Find DOM element
// };

// $.version = 1.18;

// $.fn.todo = function (todo?: Todo): Todo {
//   if (todo) {
//     $(this).data("todo", todo);
//   } else {
//     return $(this).data("todo");
//   }
// };

// var todo = { name: "Pick up drycleaning" };
// var containerElement = $("#container");
// containerElement.data("todo", todo);
// var savedTodo = containerElement.data("todo");
// containerElement.todo(todo);

// enums

enum TodoState {
  New = 1,
  Active,
  Complete,
  Deleted,
}

// Anonymous type

var anonymousType: { name: string };

// ########################## Classes ##########################

// function TodoService(){
//   this.todos=[];
// }

// TodoService.prototype.getAll=function(){ // prototypical inheritance
//   return this.todos;
// }

class TodoService {
  static lastId: number = 0;
  constructor(private todos: Todo[]) {}

  add(todo: Todo) {
    let newId = TodoService.getNextId();
  }

  getAll() {
    return this.todos;
  }

  static getNextId() {
    return (TodoService.lastId += 1);
  }
}

class SmartTodo {
  _state: TodoState;

  name: string;

  get state() {
    return this._state;
  }

  set state(newState) {
    if (newState == TodoState.Complete) {
      var canBeCompleted =
        this.state == TodoState.Active || this.state == TodoState.Deleted;

      if (!canBeCompleted) {
        throw "Todo must be Active or Deleted in order to be marked Completed";
      }
    }

    this._state = newState;
  }

  constructor(name: string) {
    this.name = name;
  }
}

var todotask = new SmartTodo("Pick up drycleaning");

// todotask.state = TodoState.Complete;

todotask.state;

// property accessors

var todos = {
  name: "Pick up drycleaning",
  get state() {
    return this._state;
  },
  set state(newState) {
    this._state = newState;
  },
};

// inheriting behaviour from a base class

class TodoStateChanger {
  constructor(private newState: TodoState) {}

  canChangeState(todo: Todo): boolean {
    return !!todo;
  }

  changeState(todo: Todo): Todo {
    if (this.canChangeState(todo)) {
      todos.state = this.newState;
    }

    return todo;
  }
}

class CompleteTodoStateChanger extends TodoStateChanger {
  constructor() {
    super(TodoState.Complete);
  }

  canChangeState(todo: Todo): boolean {
    return (
      super.canChangeState(todo) &&
      (todos.state == TodoState.Active || todos.state == TodoState.Deleted)
    );
  }
}

// implementing an abstract class

abstract class BaseClass {
  abstract add(todo: Todo): Todo;

  abstract changeState(newState: TodoState);
}

// access modifiers

class AccessModifiers {
  public add(num: number): number {
    // accessible everywhere
    return 0;
  }

  protected subtract(n: number): number {
    // accessible to derived classes
    return 0;
  }

  private multiply(n: number): number {
    // accessible only in this particular class
    return 1;
  }
}

// implementing interfaces

interface Operations {
  add(m: number, n: number): number;
  multiply(m: number, n: number): number;
}
class Services implements Operations {
  add(m: number, n: number): number {
    return m + n;
  }
  multiply(m: number, n: number): number {
    return m * n;
  }
}

// ########################## Generics ##########################

function clone<T>(value: T): T {
  let serialized = JSON.stringify(value);
  return JSON.parse(serialized);
}

class KeyValuePair<Tkey, Tvalue> {
  constructor(public key: Tkey, public value: Tvalue) {}
}

let pair1 = new KeyValuePair<number, string>(1, "first");
let pair2 = new KeyValuePair<string, Date>("second", new Date(Date.now()));
let pair3 = new KeyValuePair<number, string>(3, "third");

class KeyValuePairPrinter<T, U> {
  constructor(private pairs: KeyValuePair<T, U>[]) {}

  print() {
    for (let p of this.pairs) {
      console.log(`${p.key}:${p.value}`);
    }
  }
}

var printer = new KeyValuePairPrinter([pair1, pair3]);
printer.print();

// generic constraints

function addParameterLengths<T extends { length: number }>(x: T, y: T) {
  return x.length + y.length;
}

let total = addParameterLengths("abc", "john");

// ########################## Modules ##########################

// namespaces (internal modules)

namespace TodoApp.Model {
  export enum TodoState {
    New = 1,
    Active,
    Complete,
    Deleted,
  }
}

namespace DataAccess {
  import model = TodoApp.Model;
  export interface ITodoService {
    add(todo: Todo): Todo;
    delete(todoId: number): void;
    getAll(): Todo[];
    getById(todoId: number): Todo;
  }
}

// ########################## Decorators ##########################

// method decorators (applied by adding @methodDecoratorName before method)

function log(
  target: Object,
  methodName: string,
  descriptor: TypedPropertyDescriptor<Function>
) {
  let originalMethod = descriptor.value;

  descriptor.value = function (...args) {
    console.log(`${methodName}(${JSON.stringify(args)})`);

    let returnValue = originalMethod.apply(this, args);

    console.log(
      `${methodName}(${JSON.stringify(args)}) => ${JSON.stringify(returnValue)}`
    );

    return returnValue;
  };
}

// other types of decorators are mentioned in Validators.ts file