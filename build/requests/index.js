"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requests = void 0;
var delete_1 = require("./delete");
var get_1 = require("./get");
var post_1 = require("./post");
var put_1 = require("./put");
var requests = function (Model, app) {
    [
        get_1.getOne,
        get_1.getAll,
        post_1.postOne,
        put_1.putOne,
        delete_1.deleteOne
    ].forEach(function (e) {
        e(Model, app);
    });
};
exports.requests = requests;
