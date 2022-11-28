"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var database_1 = require("./database");
var crudRequests_1 = require("./crudRequests");
var models_1 = __importDefault(require("./models"));
database_1.sequelize.sync({ alter: true }).then(function () { return console.log('DB connected.'); });
var app = (0, express_1.default)();
app.use(express_1.default.json());
models_1.default.forEach(function (model) { return (0, crudRequests_1.crudRequests)(model, app); });
// run the server
app.listen(3000, function () {
    console.log('server is running.');
});
