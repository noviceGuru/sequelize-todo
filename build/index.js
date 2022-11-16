"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var database_1 = require("./database");
var user_1 = require("./models/user");
var requests_1 = require("./requests");
database_1.sequelize.sync({ alter: true }).then(function () { return console.log('DB connected.'); });
var app = (0, express_1.default)();
app.use(express_1.default.json());
// post
(0, requests_1.postOne)(user_1.User, app);
// get all
(0, requests_1.getAll)(user_1.User, app);
// get one
(0, requests_1.getOne)(user_1.User, app);
// edit
(0, requests_1.putOne)(user_1.User, app);
// delete
(0, requests_1.deleteOne)(user_1.User, app);
// run the server
app.listen(3000, function () {
    console.log('server is running.');
});
