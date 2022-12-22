"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.associateUsersAndTasks = void 0;
var models_1 = require("../models");
var associateUsersAndTasks = function () {
    models_1.User.hasMany(models_1.Task, { foreignKey: 'userId' });
    models_1.Task.belongsTo(models_1.User);
};
exports.associateUsersAndTasks = associateUsersAndTasks;
