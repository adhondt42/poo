"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
//fct classique 
function salut(t, style_var, opt) {
    var out = [];
    for (var _i = 0, t_1 = t; _i < t_1.length; _i++) {
        var item = t_1[_i];
        out.push("Salut " + item);
    }
    for (var _a = 0, out_1 = out; _a < out_1.length; _a++) {
        var line = out_1[_a];
        console.log(line);
    }
    console.log("Style_var: ", style_var);
    if (opt)
        console.log("Opt: " + opt);
}
salut(['--1--', 'abc'], "Cette var est stylé");
salut(['--2--', 'def'], 22, 12);
console.log("\n------------------\nClass, extend management\n------------------\n");
var Demo = /** @class */ (function () {
    function Demo(num, name) {
        this.element = 100;
        this.element = num;
        console.log("number in constructor Demo:", num);
    }
    Demo.prototype.demo = function (a) {
        return this.comput_demo(a) + this.element;
    };
    Demo.prototype.comput_demo = function (a) {
        return (a * 2);
    };
    return Demo;
}());
var Demo2 = /** @class */ (function (_super) {
    __extends(Demo2, _super);
    function Demo2(num, name) {
        var _this = _super.call(this, num, name) // appel constructeur parent pour recuperer les this. Ne recupere pas les valeurs
         || this;
        _this.supertool = "x";
        _this.supertool = "hammer"; // super peux appeler les methodes statics
        _this.name = name;
        console.log("superconstructor d2 Named:" + name); // name est donc = au deuxieme param
        console.log("superconstructor d2 Named:" + _this.name); // name est donc = au deuxieme param
        console.log("\n\tthis.element (form use of super): " + _this.element); // this.element adopte comportement de parent race a super
        return _this;
    }
    Demo2.prototype.test = function () {
        console.log("Ici test de demo 2");
    };
    return Demo2;
}(Demo));
var d = new Demo(10, "Mire");
var d2 = new Demo2(1000, "First Magic");
console.log(d.demo(5));
d2.test();
console.log(d2.demo(600));
console.log("Test supertool in d2:", d2.supertool);
console.log("\n------------------\nInterfaces - Utiliser fct comme constructor\n------------------\n");
var Employee = /** @class */ (function () {
    function Employee(firstname, lastname, completeWeek, dayoff) {
        this.weekData = { completeWeek: completeWeek, dayoff: dayoff };
        this.fullname = this.fullName(firstname, lastname);
    }
    Employee.prototype.fullName = function (firstname, lastname) {
        var fullname;
        fullname = this.buildFullName(firstname, lastname);
        return fullname;
    };
    Employee.prototype.buildFullName = function (firstname, lastname) {
        return (firstname + ' ' + lastname);
    };
    return Employee;
}());
function weekShift(worker) {
    var total = 0;
    function weekSum(worker) {
        worker.weekData.completeWeek.forEach(function (dayTime) {
            total += dayTime;
        });
    }
    weekSum(worker);
    return total;
}
var Marcel = new Employee("Marcel", "Cecire", [0, 4, 5], 2);
console.log(Marcel.fullname);
console.log(Marcel.weekData);
console.log(Marcel.fullName("Jack", "Le voleur de fonction public"));
// console.log(Marcel.buildName("Jack", "Ne vole pas la fonction privee"))
console.log(weekShift(Marcel));
