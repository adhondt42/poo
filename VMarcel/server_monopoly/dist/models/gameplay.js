"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../db"));
class GameEnv {
    constructor(startcycle) {
        this.cycle = startcycle;
        this.originalcycle = 10;
        this.maindata = {
            maincycle: 0
        };
    }
    createEnv(n1, n2) {
        this.RmDB(n1, n2);
    }
    getDOM(cb) {
        var cyc;
        var current;
        this.getCyclepCurrent(function (cyc, current) {
            var DOM = {
                cycle: cyc,
                pCurrent: current
            };
            cb(DOM);
        });
    }
    RmDB(p1Name, p2Name) {
        db_1.default.query('DROP TABLE players');
        db_1.default.query('DROP TABLE market');
        db_1.default.query("CREATE TABLE players (id INT NOT NULL AUTO_INCREMENT, name VARCHAR(45) NOT NULL, revenu INT NOT NULL, cash INT NOT NULL, rd INT NOT NULL, devTeam INT NOT NULL, invTeam INT NOT NULL, PRIMARY KEY (id))");
        db_1.default.query('CREATE TABLE market (id INT NOT NULL AUTO_INCREMENT, cycle INT NOT NULL, pCurrent VARCHAR(45), PRIMARY KEY (id))');
        db_1.default.query('INSERT INTO market SET id = 0, cycle = 0, pCurrent = ?', [p1Name]);
    }
    getCyclepCurrent(cb) {
        db_1.default.query('SELECT cycle, pCurrent FROM market WHERE id = 1', (err, res) => {
            if (err) {
                console.log(err);
                throw (err);
            }
            else {
                cb(res[0].cycle, res[0].pCurrent);
            }
        });
    }
}
exports.GameEnv = GameEnv;
class Player extends GameEnv {
    constructor(player, cycle) {
        super(cycle);
        this.pId = player.pId;
        this.pName = player.pName;
        this.pCash = player.pCash;
        this.pRevenu = player.pRevenu;
        this.pRd = player.pRd;
        this.pDevTeam = player.pDevTeam;
        this.pInvTeam = player.pInvTeam;
    }
    applyRd(nextPlayer) {
        this.pRd += 1;
        this.pRevenu += 100;
        this.pCash += (this.pRevenu - 400);
        this.changeCurrentPlayer(nextPlayer);
    }
    applyHr(nextPlayer) {
        this.pDevTeam += 1;
        this.pRevenu += 400;
        this.pCash += (this.pRevenu - 1200);
        this.changeCurrentPlayer(nextPlayer);
    }
    applyHi(nextPlayer) {
        this.pInvTeam += 1;
        this.pRevenu += 3200;
        this.pCash += (this.pRevenu - 7500);
        this.changeCurrentPlayer(nextPlayer);
    }
    applyPass(nextPlayer) {
        this.pCash += this.pRevenu;
        this.changeCurrentPlayer(nextPlayer);
    }
    changeCurrentPlayer(nextPlayer) {
        db_1.default.query('UPDATE market SET pCurrent = ? WHERE id = 1', [nextPlayer], (err, res) => {
            if (err) {
                console.log(err);
                throw err;
            }
        });
    }
}
exports.Player = Player;
class Dev extends Player {
    MakeRD() {
        this.cycle += 50;
    }
}
exports.Dev = Dev;
class Plateau {
    constructor() {
        this.cases = 12;
        this.joueurs = 3;
        this.maindata = {
            tour: 4
        };
    }
}
exports.Plateau = Plateau;
var Monnaie = {
    pieces: 2,
    origine: {
        pays: "France",
        continents: 2
    }
};
exports.Monnaie = Monnaie;
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
