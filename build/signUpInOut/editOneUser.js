"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editUsersCredentials = void 0;
var bcrypt_1 = __importDefault(require("bcrypt"));
var models_1 = require("../models");
var utils_1 = require("./utils");
var editUsersCredentials = function (app) {
    app.put("/".concat(models_1.User.tableName, "/"), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var id, user, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 8, , 9]);
                    id = req.body.UserId;
                    if (!req.body.username)
                        throw { type: "validation", message: "Username can't be null" };
                    if (!req.body.password)
                        throw { type: "validation", message: "Password can't be null" };
                    return [4 /*yield*/, models_1.User.findOne({ where: { id: req.body.UserId } })
                        // Verify the password
                    ];
                case 1:
                    user = _a.sent();
                    if (!(user && bcrypt_1.default.compareSync(req.body.password, user.password))) return [3 /*break*/, 6];
                    if (!req.body.newPassword) return [3 /*break*/, 3];
                    // Update password
                    return [4 /*yield*/, models_1.User.update({
                            password: (function () {
                                var salt = bcrypt_1.default.genSaltSync(utils_1.saltRounds);
                                var hash = bcrypt_1.default.hashSync(req.body.newPassword, salt);
                                return hash;
                            })()
                        }, { where: { id: req.body.UserId } })];
                case 2:
                    // Update password
                    _a.sent();
                    res.status(200).send("updated password of the user with id ".concat(id, "."));
                    return [3 /*break*/, 5];
                case 3: 
                // Change only the username
                return [4 /*yield*/, models_1.User.update({ username: req.body.username }, { where: { id: id } })];
                case 4:
                    // Change only the username
                    _a.sent();
                    res.status(200).send("Updated username of the user with id ".concat(id, "."));
                    _a.label = 5;
                case 5: return [3 /*break*/, 7];
                case 6: throw { type: "validation", message: "Credentials are wrong" };
                case 7: return [3 /*break*/, 9];
                case 8:
                    error_1 = _a.sent();
                    error_1.type === "validation" ?
                        res.status(400).send({ error: error_1 }) :
                        res.status(500).send({
                            description: 'Sorry, something went wrong.',
                            error: error_1
                        });
                    return [3 /*break*/, 9];
                case 9: return [2 /*return*/];
            }
        });
    }); });
};
exports.editUsersCredentials = editUsersCredentials;
