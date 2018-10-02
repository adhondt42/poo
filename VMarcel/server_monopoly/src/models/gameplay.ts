import connection from '../db'
import {pType, gameDOM} from "./interface"




export class GameEnv {
    public createEnv(n1: string, n2: string) {
        this.RmDB(n1, n2)
    }

    public getDOM(cb: (DOM: gameDOM) => void) {
        
        var cyc:number
        var current: string
        this.getCyclepCurrent(function(cyc, current) {
            var DOM = {
                cycle: cyc,
                pCurrent: current
            }
            cb(DOM)
        })
    }
    private RmDB(p1Name: string, p2Name:string) {
        connection.query('DROP TABLE players')
        connection.query('DROP TABLE market')
        connection.query("CREATE TABLE players (id INT NOT NULL AUTO_INCREMENT, name VARCHAR(45) NOT NULL, revenu INT NOT NULL, cash INT NOT NULL, rd INT NOT NULL, devTeam INT NOT NULL, invTeam INT NOT NULL, PRIMARY KEY (id))")
        connection.query('CREATE TABLE market (id INT NOT NULL AUTO_INCREMENT, cycle INT NOT NULL, pCurrent VARCHAR(45), PRIMARY KEY (id))')
        connection.query('INSERT INTO market SET id = 0, cycle = 0, pCurrent = ?', [p1Name])
    }
    private getCyclepCurrent(cb: (cyc: number, current: string) => void) {
        connection.query('SELECT cycle, pCurrent FROM market WHERE id = 1', (err, res) => {
            if (err) {
                console.log(err)
                throw (err);
            }
            else {
                cb(res[0].cycle, res[0].pCurrent)
            }
        })
    }

}


export class Player {
    pId: number
	pName: string
    pCash: number
    pRevenu: number
    pRd: number
    pDevTeam: number
    pInvTeam: number

    constructor(player: pType) {
        this.pId = player.pId
        this.pName = player.pName
        this.pCash = player.pCash
        this.pRevenu = player.pRevenu
        this.pRd = player.pRd
        this.pDevTeam = player.pDevTeam
        this.pInvTeam = player.pInvTeam
    }

    public applyRd(nextPlayer: string) {
        this.pRd += 1
        this.pRevenu += 100
        this.pCash += (this.pRevenu - 400)
        this.changeCurrentPlayer(nextPlayer)
    }
    public applyHr(nextPlayer: string) {
        this.pDevTeam += 1
        this.pRevenu += 400
        this.pCash += (this.pRevenu - 1200)
        this.changeCurrentPlayer(nextPlayer)

    }
    public applyHi(nextPlayer: string) {
        this.pInvTeam += 1
        this.pRevenu += 3200
        this.pCash += (this.pRevenu - 7500)
        this.changeCurrentPlayer(nextPlayer)
    }
    public applyPass(nextPlayer: string) {
        this.pCash += this.pRevenu
        this.changeCurrentPlayer(nextPlayer)
    }
    private changeCurrentPlayer(nextPlayer: string) {
        connection.query('UPDATE market SET pCurrent = ? WHERE id = 1', [nextPlayer], (err, res) => {
            if (err) {
                console.log(err)
                throw err
            } 
        })
    }
}

export class Investor extends Player {

}

// export class Dev extends Player {
//     currentJob:string
    
//     constructor(pId:number, pName:string, pCash:number) {
//         super({pId: pId, pName: pName, pCash: pCash})
//         this.currentJob = "typescript"
//     }
// }
//         // public actionHR() {

        // }
        // public actionHI() { // Hire Investor 
    
        // }
        // public registerPlayer() {
        //     let sql = 'INSERT INTO players SET name = ?, job = ?, cash = ?, dev_unit = ?, inv_unit = ?, marketShare = ?';
        //     connection.query(sql, [this.pId, this.pName, this.pJob, this.pCash, this.dev_unit, this.inv_unit, this.marketShare], function (err, result) {
        //         if (err) {
        //             console.log(err)
        //             return 0
        //         }
        //     })
            
        // }
        // private executeAction(method: 'actionRD' | 'actionHR' | 'actionHI') { 
        //     this.p1cycle += 50
        // }


// export class Market {
//     cycle: number
//     p1cycle : number
//     p2cycle : number

//     constructor () {
//         this.cycle = 0
//         this.p1cycle = 0
//         this.p2cycle = 0
//     }
//     public getData () {
//         console.log("Les chiffres du jour sont :", this.cycle)
//         return this // to add other method after collecting the return
//     }
// }