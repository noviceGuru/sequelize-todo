"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var sequelize_1 = require("sequelize");
var database_1 = require("../database");
exports.User = database_1.sequelize.define('User', {
    firstName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING
    },
    // username: {
    //     type: DataTypes.STRING
    // },
    // isAdmin: {
    //     type: DataTypes.TINYINT
    // },
}, {
    tableName: 'Users',
    timestamps: false
});