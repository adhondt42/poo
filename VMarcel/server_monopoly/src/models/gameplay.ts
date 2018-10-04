import connection from '../db'
import {pType, gameDOM} from "./interface"




export class GameEnv {
    cycle:number
    originalcycle: number
    maindata: {
        maincycle:number
    }


    constructor(startcycle: number) {
        this.cycle = startcycle
        this.originalcycle = 10
        this.maindata = {
            maincycle: 0
        }
    }
    public createEnv(n1: string, n2: string) {
        this.RmDB(n1, n2)
    }

    public getDOM(cb: (DOM: gameDOM) => void) {
        
        var cyc: number
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

export class Player extends GameEnv {
    pId: number
	pName: string
    pCash: number
    pRevenu: number
    pRd: number
    pDevTeam: number
    pInvTeam: number

    constructor(player: pType, cycle: number) {
        super(cycle)
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

export class Dev extends Player {
    public MakeRD() {
        this.cycle += 50
    }
}


export class Plateau {
    cases: number
    joueurs: number
    maindata: {
        tour: number
    }
    constructor () {
        this.cases = 12
        this.joueurs = 3
        this.maindata = {
            tour: 4
        }
    }
}


export class Ferme { 
    animalscount: number
    obj: {
        nombre:number
    }
    constructor() {
        this.animalscount = 0
        this.obj = {
            nombre: 0
        }
    }
    addAnimal(ferme:any) {
        ferme.animalscount += 1
        ferme.obj.nombre += 1
    }
}

export class Cochon extends Ferme { 
    
    name:string 
    pattes:number
    constructor (name:string, pattes:number) {
        super()
        this.pattes = pattes
        this.name = name
    }
}

    var Monnaie = {
        pieces: 2,
        origine: {
            pays: "France",
            continents: 2
        }
    }

    function tasse(this:any, name:string, nb:number, placard:{}) {
        this.name = name
        this.number = 3
        // this.placard = {
        //     verre: 3,
        //     assietes: 5,
        //     writable: true
        // }
    }

    export {Monnaie, tasse}
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