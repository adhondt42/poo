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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var display_1 = __importDefault(require("./display"));
display_1.default("Class, extend management", 1);
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
display_1.default("Interfaces + Class object & new", 1);
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
console.log("Total Marcel's shift this week : ", weekShift(Marcel), '\n');
display_1.default("Function object & new", 1);
function createEmployee(firstname, lastname, completeWeek, dayoff) {
    var newWorker = {
        fullname: "",
        weekData: {}
    };
    newWorker.weekData = { completeWeek: completeWeek, dayoff: dayoff };
    newWorker.fullname = fullName();
    function fullName() {
        return (firstname + ' ' + lastname);
    }
    return newWorker;
}
var Danny = createEmployee("Danny", "Dhondt", [12, 3, 0], 4);
console.log(Danny.fullname);
console.log(Danny.weekData);
// console.log(Danny.fullName("Jack", "ne peut pas voler les fct de Danny"))
// console.log(weekShift(Danny)) Impossible cause type 
