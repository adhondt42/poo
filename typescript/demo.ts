import myconsoleLog from './display'

myconsoleLog("Class, extend management", 1)

class Demo {
	
	element:number = 100

	constructor (num:number, name:string) {				// executé quand instance cree
		
		this.element = num
		console.log("number in constructor Demo:", num)
	}
	public demo (a: number) {
		return this.comput_demo(a) + this.element
	}
	private comput_demo (a: number):number {
		return (a * 2)
	}

}

class Demo2 extends Demo {

	supertool: string = "x"
	name: string
	constructor (num:number, name:string) {
		super(num, name)								// appel constructeur parent pour recuperer les this. Ne recupere pas les valeurs
		this.supertool = "hammer"								// super peux appeler les methodes statics
		this.name = name
		console.log("superconstructor d2 Named:" + name)  		// name est donc = au deuxieme param
		console.log("superconstructor d2 Named:" + this.name)  		// name est donc = au deuxieme param
		console.log("\n\tthis.element (form use of super): " + this.element) // this.element adopte comportement de parent race a super
	}
	public test () {
		console.log("Ici test de demo 2")
	}

}

let d = new Demo(10, "Mire")
let d2 = new Demo2(1000, "First Magic")

console.log(d.demo(5))
d2.test()
console.log(d2.demo(600))
console.log("Test supertool in d2:", d2.supertool)


myconsoleLog("Interfaces + Class object & new", 1)

interface weekType {

	completeWeek: Array<number>
	dayoff: number
}

class Employee {
	
	fullname: string
	weekData: weekType

	constructor(firstname: string, lastname: string, completeWeek:Array<number>, dayoff:number) {
		this.weekData = {completeWeek, dayoff}
		this.fullname = this.fullName(firstname, lastname)
	}
	public fullName (firstname: string, lastname: string):string {
		let fullname:string

		fullname = this.buildFullName(firstname, lastname)
		return fullname
	}
	private buildFullName(firstname: string, lastname: string): string {
		return (firstname + ' ' + lastname)
	}
}

function weekShift(worker: Employee): number {

	let total:number = 0

	function weekSum(worker: Employee) {
		worker.weekData.completeWeek.forEach(function (dayTime) {
			total += dayTime
		})
	}
	weekSum(worker)
	return total
}

let Marcel = new Employee("Marcel", "Cecire", [0, 4, 5], 2)

console.log(Marcel.fullname)
console.log(Marcel.weekData)
console.log(Marcel.fullName("Jack", "Le voleur de fonction public"))
// console.log(Marcel.buildName("Jack", "Ne vole pas la fonction privee"))
console.log("Total Marcel's shift this week : ", weekShift(Marcel), '\n')


myconsoleLog("Function object & new", 1)


function createEmployee(firstname:string, lastname:string,  completeWeek:Array<number>, dayoff:number) {

	let newWorker = {
		fullname: "",
		weekData: {}

	}

	newWorker.weekData = {completeWeek, dayoff}
	newWorker.fullname = fullName()
	
	function fullName (): string {
		return (firstname + ' ' + lastname)
	
	}
	return newWorker
}

let Danny = createEmployee("Danny", "Dhondt", [12, 3, 0], 4)


console.log(Danny.fullname)
console.log(Danny.weekData)
// console.log(Danny.fullName("Jack", "ne peut pas voler les fct de Danny"))
// console.log(weekShift(Danny)) Impossible cause type 
