"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Gameplay {
    constructor(current_id, current_profile) {
        this.cycle = 4;
    }
    checkGameStatus() {
        return 0;
    }
    updateData(cb) {
        cb("ouioui");
    }
    restart() {
        console.log("gameplay.restart");
    }
    createEnv(req) {
        connexion.query();
        console.log('gameplay.createEnv');
    }
}
exports.Gameplay = Gameplay;
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
