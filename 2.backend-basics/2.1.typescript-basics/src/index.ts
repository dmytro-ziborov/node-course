//why? idk, it's all task : describe types for functions
type Sentence = string;
function getFirstWord(a: Sentence): number {
  return a.split(/ +/)[0].length;
}

console.log(getFirstWord("Hello it's me"));
//task 2
interface User{
    name:string;
    surname:string;
}

interface UserInitial{
    fullname:string,
    initials:string
}
function getUserNamings(a: User):UserInitial {
  return {
    fullname: a.name + " " + a.surname,
    initials: a.name[0] + "." + a.surname[0],
  };
}

console.log(getUserNamings({ name: "Test", surname: "Wtf" }));
//task 3
interface Product{
    name:string;
}
interface ProductList{
    products?:Product[];
}
function getAllProductNames(a?: ProductList) :string[]{
  return a?.products?.map((prod) => prod?.name) || [];
}
console.log(getAllProductNames());
console.log(
  getAllProductNames({
    products: [],
  })
);
console.log(
  getAllProductNames({
    products: [{ name: "Apple" }],
  })
);
//task 4.1
interface Person{
    name():string;
    cuteness?:number;
    coolness?:number;
}
// easy way is using 'as' keyword
// hard way is ?...
function hey(a: Person):string {
  return "hey! i'm " + a.name();
}
hey({ name: () => "roma", cuteness: 100 });
hey({ name: () => "vasya", coolness: 100 });
//task 4.2

abstract class Pet{
    private _name:string;
    constructor(name:string){
        this._name = name;
    }
    name():string{
        return this._name;
    }
}

class Cat extends Pet{
    private _isLazy:boolean;
    constructor(name:string,isLazy:boolean){
        super(name)
        this._isLazy = isLazy;
    }
    isLazy():boolean{
        return this._isLazy;
    }
}

class Dog extends Pet{
    private _cuteness:number;
    
    constructor(name:string,cuteness:number){
        super(name);
        this._cuteness = cuteness;
    }

    cutness():number{
        return this._cuteness;
    }
}

function heyPet(abstractPet:Pet) {
    return "hey! i'm " + abstractPet.name();
}
let a = new Cat("myavchik", true)
let b = new Dog("gavchik", 333)
console.log(heyPet(a));
console.log(heyPet(b));

//task 4.3
interface Animal{
    name():string;
    type:string;
    cuteness?:number;
    coolness?:number;
}
function heyAnimal(a: Animal) {
    return "hey! i'm " + a.name()
		 + (a.type === "cat" ? ("cuteness: "+a.cuteness) : ("coolness: "+a.coolness))
}
heyAnimal({name: () => "roma", type: "cat", cuteness: 100})
heyAnimal({name: () => "vasya", type: "dog", coolness: 100})

//5

function stringEntries(a:string[]|Record<string,any>):string[] {
    return Array.isArray(a) ? a : Object.keys(a)
 }

 //6

 async function world(a:number):Promise<string> {
    return "*".repeat(a)
}
const hello = async ():Promise<string> => {
   return await world(10)
}
hello().then(r => console.log(r)).catch(e => console.log("fail"))

//alternative

// const world = (a:number) : Promise<string> => {
//     return new Promise((resolve, reject) => {
//         try{
//             resolve("*".repeat(a))
//         } catch(e) {
//             reject ("fail")
//         }
//     })
// }

// const hello = async () => {
//    return await world(10)
// }

// hello().then(r => console.log(r)).catch(e => console.log(e))