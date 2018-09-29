"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let express = require('express');
class Server {
    constructor(port) {
        this.port = port;
    }
    start(port) {
        const app = express();
        app.get('/', function (req, res) {
            res.send('Salut');
        });
        app.listen(this.port, function () {
            console.log("Serveur runned on port: ", port);
        });
    }
}
exports.default = Server;
