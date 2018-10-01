"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = require("mysql");
let connection = mysql_1.createConnection({
    host: '192.168.99.100',
    password: 'root',
    database: 'monopolesql',
    user: 'root',
});
exports.connection = connection;
connection.connect();
//     VM: '192.168.99.100',
// container : IP:172.17.0.2 || Gateway:172.17.0.1
