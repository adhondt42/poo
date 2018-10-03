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
        var p1; //define interface later
        var p2;
        var GamEnv; // same as p1
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
                GamEnv = new gameplay_1.GameEnv();
                p1 = new gameplay_1.Player({ pId: 1, pName: req.body.p1_name, pCash: 400, pRevenu: 0, pRd: 0, pDevTeam: 0, pInvTeam: 0 });
                p2 = new gameplay_1.Player({ pId: 2, pName: req.body.p2_name, pCash: 400, pRevenu: 0, pRd: 0, pDevTeam: 0, pInvTeam: 0 });
                GamEnv.createEnv(req.body.p1_name, req.body.p2_name);
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
