"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function myconsoleLog(message, space) {
    for (var i = 0; i < space; i++) {
        console.log('\n');
    }
    console.log("--------", message, "--------");
    for (i = 0; i < space; i++) {
        console.log('\n');
    }
}
exports.default = myconsoleLog;
