"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = require("mysql");
let connection = mysql_1.createConnection({
    host: '192.168.99.100',
    user: 'root',
    password: 'root',
    database: 'monopolesql'
});
exports.connection = connection;
connection.connect();
