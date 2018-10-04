"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
            app.get('/action/:id', function (req, res) {
                var i = req.params.id;
                GamEnv.getDOM(function (DOM) {
                    if (DOM.pCurrent === p1.pName) {
                        p1[i](p2.pName, function () { });
                    }
                    else {
                        p2[i](p1.pName, function () { });
                    }
                });
                res.redirect('/');
            });
        app.get('/start', function (req, res) {
            res.render('pages/start');
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
                console.log("BEFORE AFTER MAKE R-D");
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
                var m1 = Object.create(gameplay_1.Monnaie);
                console.log(m1);
                console.log(m1.pieces);
                console.log(m1.origine.pays);
                var m2 = Object.create(gameplay_1.Monnaie);
                console.log(m2);
                m2.pieces = 5;
                console.log("m2pieces = 5", m2.pieces);
                console.log("m1 piece: ");
                m2.origine.pays = "Belgique";
                console.log("m2.origine.pays = Belgique", m2.origine.pays);
                console.log("m1.origine.pays : ", m1.origine.pays);
                console.log("CALL M1, PLAYER");
                // m1.call(null, {pieces: 5}) FALSE, not a fun 
                console.log("After call false: ", m1);
                // function getm1(this:any, pieces: number) {
                //     var pesos:number 
                //     console.log("ooook")
                //     return this
                // }
                // m1 = getm1(5)
                console.log("After function like proto: ", m1);
                // var m3 = Object.create(Monnaie, (pieces))
                console.log("=============== create obj with fun ==========================");
                function Forme() {
                    this.x = 0;
                    this.y = 0;
                }
                // Méthode de la classe parente
                Forme.prototype.déplacer = function (x, y) {
                    this.x += x;
                    this.y += y;
                    console.info('Forme déplacée.');
                };
                // Rectangle - classe fille
                function Rectangle() {
                    // on appelle le constructeur parent
                    Forme.call(this);
                }
                // La classe fille surcharge la classe parente
                Rectangle.prototype = Object.create(Forme.prototype);
                Rectangle.prototype.constructor = Rectangle;
                var top = Object.create(Rectangle);
                console.log("-------------------_____triaining______-----------");
                //   var a = {
                //       b: 12,
                //       c: 13
                //   }
                // function removeProperty(obj: any, prop: any) {
                //     console.log("obj before : ", obj)
                //    for (let key in obj) {
                //     console.log("key: ", key, "prop :", prop)
                //         if (key === prop){
                //             delete obj[prop]
                //         }
                //    }
                //    console.log("obj after : ", obj)
                // }
                // removeProperty(a, "b")
                // var t1 = Object.create(tasse)
                // console.log(t1)
                // tasse.call(t1, "Hervé", 4)
                // console.log(t1)
                // function createTasse(this:any, name:string, number:number) {
                //     tasse.call(this, name, number)
                //     this.style = "old"
                // }
                // var t1 = createTasse("chou", 3)
                // console.log(t1)
                // function Product(this:any, name:string, price: number) {
                //     this.name = name;
                //     this.price = price;
                //   }
                //   function Food(this: any, name:string , price: number) {
                //     Product.call(this, name, price);
                //     this.category = 'food';
                //   }
                //   let b1 = (new Food('cheese', 5) as any)
                // function newTasse(this:any, name:string, number:number, placard:{}) {
                // }
                console.log("========= Modif parent par method parent ======= ");
                var moulin = new gameplay_1.Ferme();
                console.log(moulin);
                var pig = new gameplay_1.Cochon("Eric", 4);
                console.log(pig);
                pig.addAnimal(moulin);
                console.log("Appel fct parente");
                console.log(moulin);
                console.log(pig);
                res.redirect('/');
            });
        app.listen(this.port, function () {
            console.log("Serveur run on port : ", port);
        });
    }
}
exports.default = Server;
