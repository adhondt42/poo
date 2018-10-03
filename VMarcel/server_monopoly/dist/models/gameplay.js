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
class Player extends gameplay_1.GameEnv {
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
class Dev extends gameplay_1.Player {
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
const gameplay_1 = require("./models/gameplay");
// If default export, {} not needed
let express = require('express');
let bodyParser = require('body-parser');
class Server {
    constructor(port) {
        this.port = port;
    }
    start(port) {
        const app = express();
        var p1;
        var p2;
        var GamEnv; // same as p1, to modify
        app.get('/start', function (req, res) {
            res.render('pages/start');
        }),
            // middlwares 
            app.set('view engine', 'ejs');
        app.use(express.static('public'));
        app.use(bodyParser.urlencoded({ extended: false }));
        app.get('/', function (req, res) {
            GamEnv.getDOM(function (DOM) {
                res.render('pages/index', { p1, p2, DOM });
            });
        }),
            app.post('/register_players', function (req, res) {
                GamEnv = new gameplay_1.GameEnv(55);
                p1 = new gameplay_1.Player({ pId: 1, pName: req.body.p1_name, pCash: 400, pRevenu: 0, pRd: 0, pDevTeam: 0, pInvTeam: 0 }, 55);
                p2 = new gameplay_1.Player({ pId: 2, pName: req.body.p2_name, pCash: 400, pRevenu: 0, pRd: 0, pDevTeam: 0, pInvTeam: 0 }, 110);
                GamEnv.createEnv(req.body.p1_name, req.body.p2_name);
                console.log(p1.cycle);
                console.log(p2.cycle);
                p1.cycle = 34;
                console.log(p1.cycle);
                console.log(p2.cycle);
                p1.__proto__.cycle = 5;
                console.log(p1.cycle);
                console.log(p2.cycle);
                console.log(p1.pCash);
                var p3;
                p3 = new gameplay_1.Dev({ pId: 2, pName: "el devo", pCash: 12400, pRevenu: 0, pRd: 0, pDevTeam: 0, pInvTeam: 0 }, 12000);
                console.log("BEFORE AFTER MAKE RD");
                console.log(p1.cycle);
                console.log(p2.cycle);
                console.log(p3.cycle);
                p3.MakeRD();
                console.log("BEFORE AFTER MAKE RD");
                console.log(p1.cycle);
                console.log(p2.cycle);
                console.log(p3.cycle);
                console.log("sans modifier de valeur, mon nouvel objet va chercher la valeur chez ses parents ");
                console.log("p3.maincycle no modif", p3.originalcycle);
                console.log("p2.maincycle no modif", p2.maincycle);
                console.log("si valeur modifié, l'enfant prend sa propre valeur");
                p3.originalcycle = 12;
                console.log("(p3.maincycle = 12) : ", p3.originalcycle);
                console.log("p2.maincycle no modif", p2.maincycle);
                console.log("De même si j'accède au père en graphikart (par objet) c'est pareil");
                console.log("p2.maindata.maincycle :", p2.maindata.maincycle);
                console.log("p3.maindata.maincycle :", p3.maindata.maincycle);
                console.log("p2.maindata.maincycle = 12");
                p1.maindata.maincycle = 12;
                p1.maindata = 0;
                console.log("p1.maindata.maincycle: ", p1.maindata.maincycle);
                console.log("p2.maindata.maincycle :", p2.maindata.maincycle);
                console.log("p3.maindata.maincycle :", p3.maindata.maincycle);
                console.log("========== Object.create tests sur class ========== ");
                var o1 = Object.create(gameplay_1.Plateau);
                var o2 = Object.create(gameplay_1.Plateau);
                console.log("objet o1:", o1);
                console.log("objet o1.cases :", o1.cases);
                console.log(o1.maindata);
                o1.test = 6;
                console.log("o1.test = 6 : ", o1);
                var o3 = Object.create(o1);
                console.log("=============Object.create test sur var ============ ");
                var m1 = Object.create(Monnaie);
                console.log(m1);
                console.log(m1.pieces);
                console.log(m1.origine.pays);
                var m2 = Object.create(Monnaie);
                console.log(m2);
                m2.pieces = 5;
                console.log("m2pieces = 5", m2.pieces);
                console.log("m1 piece: ");
                m2.origine.pays = "Belgique";
                console.log("m2.origine.pays = Belgique", m2.origine.pays);
                console.log("m1.origine.pays : ", m1.origine.pays);
                res.redirect('/');
            });
        app.listen(this.port, function () {
            console.log("Serveur run on port : ", port);
        });
        // Decouper le fichier ? 
        app.get('/action/:id', function (req, res) {
            var i = req.params.id;
            GamEnv.getDOM(function (DOM) {
                if (DOM.pCurrent === p1.pName)
                    p1[i](p2.pName, function () { });
                else
                    p2[i](p1.pName, function () { });
            });
            res.redirect('/');
        });
    }
}
exports.default = Server;
