var connection = require('../db')

export class Gameplay {
    cycle: number
        constructor(current_id:number, current_profile:number) {
            this.cycle = 4
        }
    public checkGameStatus ():number {
        return 0
    }
        public updateData(cb: (str: string) => void) {
        cb("ouioui")
    }
    public restart() {
        console.log("gameplay.restart")
    }
    public createEnv(req: Request) {
        ///connection.query()
        console.log('gameplay.createEnv')
    }

}


// class Employee {
	
// 	fullname: string
// 	weekData: weekType

// 	constructor(firstname: string, lastname: string, completeWeek:Array<number>, dayoff:number) {
// 		this.weekData = {completeWeek, dayoff}
// 		this.fullname = this.fullName(firstname, lastname)
// 	}
// 	public fullName (firstname: string, lastname: string):string {
// 		let fullname:string

// 		fullname = this.buildFullName(firstname, lastname)
// 		return fullname
// 	}
// 	private buildFullName(firstname: string, lastname: string): string {
// 		return (firstname + ' ' + lastname)
// 	}
// }