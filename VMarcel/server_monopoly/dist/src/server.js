"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gameplay_1 = require("../models/gameplay");
// If default export, {} not needed
let express = require('express');
let bodyParser = require('body-parser');
class Server {
    constructor(port) {
        this.port = port;
    }
    start(port) {
        const app = express();
        let gameplay = new gameplay_1.Gameplay(1, 2);
        app.set('view engine', 'ejs');
        app.use(express.static('public')); // dossier contient les statics
        app.use(bodyParser.urlencoded({ extended: false })); // bodyparder pour req.xxxxx
        app.get('/', function (req, res) {
            let status;
            console.log("GET /");
            status = gameplay.checkGameStatus();
            if (status === 0)
                res.redirect('/start');
            else {
                gameplay.updateData(function (domData) {
                    res.render('pages/index', { domData }); // retourne le template
                });
            }
        }),
            app.get('/start', function (req, res) {
                // console.log("GET /start")
                // res.render('pages/start')
            }),
            app.post('/register_players', function (req, res) {
                // console.log("Post /register_players")
                // gameplay.createEnv(req.body)
                // res.redirect('/')
            });
        app.listen(this.port, function () {
            console.log("Serveur runned on poooort: ", port);
        });
    }
}
exports.default = Server;
