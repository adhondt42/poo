"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = require("mysql");
const connection = mysql_1.createConnection({
    host: '192.168.99.100',
    password: 'root',
    database: 'monopolesql',
    user: 'root',
});
connection.connect();
exports.default = connection;
// CREATE TABLE players (id INT NOT NULL AUTO_INCREMENT, name VARCHAR(45) NOT NULL, job VARCHAR(45) NOT NULL, cash INT NOT NULL, dev_unit INT NOT NULL, inv_unit INT NOT NULL, PRIMARY KEY (id));
