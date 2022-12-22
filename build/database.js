"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
var sequelize_1 = require("sequelize");
exports.sequelize = new sequelize_1.Sequelize('test-db', 'user', 'password', {
    dialect: 'sqlite',
    host: './dev.sqlite'
});
