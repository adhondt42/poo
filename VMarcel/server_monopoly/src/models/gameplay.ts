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




    var Monnaie = {
        pieces: 2,
        origine: {
            pays: "France",
            continents: 2
        }
    }

    export {Monnaie}
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

import { Request, Response } from 'express'
import {GameEnv, Player, Dev, Plateau, Monnaie} from "./models/gameplay"
import {pType, gameDOM} from "./models/interface"
// If default export, {} not needed

let express = require('express')
let bodyParser = require('body-parser')



export default class Server {
    
    readonly port: number
    
    constructor (port: number) {
        this.port = port
    }

    start (port: number) {
        const app = express()
        var p1: any
        var p2: any
        var GamEnv:any  // same as p1, to modify


        app.get('/start', function (req: Request, res:Response) {
            res.render('pages/start')
        }),

        // middlwares 
        app.set('view engine', 'ejs')
        app.use(express.static('public'))
        app.use(bodyParser.urlencoded({ extended: false }));



        app.get('/', function (req: Request, res: Response) {
            GamEnv.getDOM(function(DOM:gameDOM) {
                res.render('pages/index', {p1, p2, DOM})
            })
        }),

        app.post('/register_players', function (req: Request, res: Response) {
            GamEnv = new GameEnv(55)
            p1 = new Player({pId: 1, pName: req.body.p1_name, pCash: 400, pRevenu: 0, pRd: 0, pDevTeam: 0, pInvTeam: 0}, 55)
            p2 = new Player({pId: 2, pName: req.body.p2_name, pCash: 400, pRevenu: 0, pRd: 0, pDevTeam: 0, pInvTeam: 0}, 110)
            GamEnv.createEnv(req.body.p1_name, req.body.p2_name)


            console.log(p1.cycle)
            console.log(p2.cycle)
            p1.cycle = 34
            console.log(p1.cycle)
            console.log(p2.cycle)
            p1.__proto__.cycle = 5
            console.log(p1.cycle)
            console.log(p2.cycle)
            console.log(p1.pCash)
            var p3
            p3 = new Dev({pId: 2, pName: "el devo", pCash: 12400, pRevenu: 0, pRd: 0, pDevTeam: 0, pInvTeam: 0}, 12000)
            console.log("BEFORE AFTER MAKE RD")
            console.log(p1.cycle)
            console.log(p2.cycle)
            console.log(p3.cycle)
            p3.MakeRD()
            console.log("BEFORE AFTER MAKE RD")
            console.log(p1.cycle)
            console.log(p2.cycle)
            console.log(p3.cycle)
            console.log("sans modifier de valeur, mon nouvel objet va chercher la valeur chez ses parents ")
            console.log("p3.maincycle no modif", p3.originalcycle)
            console.log("p2.maincycle no modif", p2.maincycle)
            console.log("si valeur modifié, l'enfant prend sa propre valeur")
            p3.originalcycle = 12
            console.log("(p3.maincycle = 12) : ", p3.originalcycle)
            console.log("p2.maincycle no modif", p2.maincycle)
            console.log("De même si j'accède au père en graphikart (par objet) c'est pareil")
            console.log("p2.maindata.maincycle :", p2.maindata.maincycle)
            console.log("p3.maindata.maincycle :", p3.maindata.maincycle)
            console.log("p2.maindata.maincycle = 12")
            p1.maindata.maincycle = 12
            p1.maindata = 0
            console.log("p1.maindata.maincycle: ", p1.maindata.maincycle)
            console.log("p2.maindata.maincycle :", p2.maindata.maincycle)
            console.log("p3.maindata.maincycle :", p3.maindata.maincycle)


            console.log("========== Object.create tests sur class ========== ")
            var o1 = Object.create(Plateau)
            var o2 = Object.create(Plateau)
            console.log("objet o1:", o1)
            console.log("objet o1.cases :", o1.cases)
            console.log(o1.maindata)
            o1.test = 6
            console.log("o1.test = 6 : ", o1)
            var o3 = Object.create(o1)
            

            console.log("=============Object.create test sur var ============ ")
            var m1 = Object.create(Monnaie)
            console.log(m1)
            console.log(m1.pieces)
            console.log(m1.origine.pays)
            var m2 = Object.create(Monnaie)
            console.log(m2)
            m2.pieces = 5
            console.log("m2pieces = 5", m2.pieces )
            console.log("m1 piece: ")
            m2.origine.pays = "Belgique" 
            console.log("m2.origine.pays = Belgique", m2.origine.pays)
            console.log("m1.origine.pays : ", m1.origine.pays)


            res.redirect('/')
        })

        app.listen(this.port, function () {
            console.log("Serveur run on port : ", port)
            })



// Decouper le fichier ? 
        app.get('/action/:id', function (req: Request, res: Response) {
            var i = req.params.id
            GamEnv.getDOM(function(DOM:gameDOM) {
                if (DOM.pCurrent === p1.pName)
                    p1[i](p2.pName, function() {/* Keep it for future */ })
                else 
                    p2[i](p1.pName, function() {})
            })
            res.redirect('/')                
        })
    }
}