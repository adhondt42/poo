"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let express = require('express');
class Server {
    constructor(port) {
        this.port = port;
    }
    start(port) {
        const app = express();
        app.set('view engine', 'ejs');
        app.use(express.static('public')); // dossier contient les statics
        app.get('/', function (req, res) {
            res.render('pages/index'); // retourne le template
        }),
            app.get('/add', function (req, res) {
                res.send('Salut Toi /add ');
            }),
            app.listen(this.port, function () {
                console.log("Serveur runned on port: ", port);
            });
    }
}
exports.default = Server;
