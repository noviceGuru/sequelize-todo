"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var sequelize_1 = require("sequelize");
var database_1 = require("../database");
exports.User = database_1.sequelize.define('User', {
    id: {
        type: sequelize_1.UUID,
        defaultValue: sequelize_1.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    firstName: {
        type: sequelize_1.DataTypes.STRING,
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING,
    },
    username: {
        type: sequelize_1.DataTypes.STRING
    },
    password: {
        type: sequelize_1.DataTypes.STRING
    }
}, {
    tableName: 'Users',
    timestamps: false
});
