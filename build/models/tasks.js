"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
var sequelize_1 = require("sequelize");
var database_1 = require("../database");
exports.Task = database_1.sequelize.define('Task', {
    id: {
        type: sequelize_1.UUID,
        defaultValue: sequelize_1.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    userId: {
        type: sequelize_1.DataTypes.STRING
    },
    task: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'Tasks'
});
