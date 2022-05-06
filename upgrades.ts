// ########################## Upgrades And Features ##########################

// null and undefined types
let myvar = null;
let myVar = undefined;

console.log(myvar);
console.log(myVar);

// tagged union

interface Archer {
  kind: "archer";
  lastName: string;
}

interface Samurai {
  kind: "samurai";
  lastName: string;
}

interface Magician {
  kind: "magician";
  lastName: string;
}

type WarriorChoice = Archer | Samurai | Magician;

function selectWarrior(warrior: WarriorChoice) {
  switch (warrior.kind) {
    case "archer":
      return `Our warrior is ${warrior.kind}`;

    case "samurai":
      return `Our warrior is ${warrior.kind}`;

    case "magician":
      return `Our warrior is ${warrior.kind}`;
  }
}

// control-flow analysis and read-only properties

let myControlFlow: string | number;

myControlFlow = "Hello I'm a string";
console.log(typeof myControlFlow);

myControlFlow = 4;
console.log(typeof myControlFlow);

interface Creature {
  readonly height: number;
  readonly widht: number;
  readonly ocean: string;
}

let vreeg: Creature = { height: 100, widht: 50, ocean: "Pacific" };
console.log(vreeg);

//  vreeg.ocean = "Atlantic"; causes error as we try to change read-only property
console.log(vreeg);

// Learn about baseURL, paths, include, exclude
// Learn about tslib
// tsc --module commonjs --importHelpers fileName.ts    # command for external library support

// Mapped types and object spread and rest

interface warrior {
  name: string;
  weapon: string;
  strength: number;
}

type Category<T> = {
  [p in keyof T]?: T[p];
};

type samurai = Category<warrior>;

let samurai1: samurai = {
  name: "samurai1",
  weapon: "staff",
};

console.log(samurai1);

let vreegking = {
  size: 250,
  ocean: "Pacific",
  snout: "Big",
};
console.log(vreegking);

// rest

let { snout, ...vreegQueen } = vreegking;
vreegQueen.ocean = "Atlantic";
console.log(vreegQueen);

// spread

let monsters = { ...vreegking, ...vreegQueen };
console.log(monsters); // {size:250, ocean:'Atlantic', snout:'Big'}

// Object type

const ninjas: object = {};
console.log(typeof ninjas);

// new.target

class Warrior {
  constructor() {
    console.log(new.target);
  }
}

const newWarrior = new Warrior(); // information about targeted class

// Iterators
let myArray = [1, 2, 3, 4, 5, 6];

for (let num of myArray) {
  // provides values in iterable item
  console.log(num);
}

for (let index in myArray) {
  // provides keys in iterable item
  console.log(index);
}

// Generators
// tsc upgrades.ts --downlevelIteration
function* fruitGenerator() {
  yield "Orange";
  yield "Mango";
  yield "Watermelon";
}

for (let fruit in fruitGenerator()) {
  // provides values in iterable item
  console.log(fruit);
}

// tsc --init    command to initialize a tsconfig.ts file through command prompt

// catch clause

let input = "...";

try {
  JSON.parse(input);
} catch {
  console.log(`Invalid json given with ${input}`);
}

// defined assignment assertions (putting exclamation mark at declaration time)

let numberWarriors!: number;
applyWarriors();
console.log(numberWarriors);

function applyWarriors() {
  numberWarriors = 20;
}

// type guards inferred with in operator

interface First {
  x: number;
}

interface Second {
  y: string;
}

function selectType(q: First | Second) {
  if ("x" in q) {
    console.log("I belong to interface first");
  } else {
    console.log("I belong to interface second");
  }
}

// ES numeric separators

const million = 1_000_000;
const phone = 555_734_2252;
const bytes = 0xff_0c_00_ff;
const word = 0b1100_0011_1101_0001;

console.log(million, phone, bytes, word);
