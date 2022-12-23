"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var helmet_1 = __importDefault(require("helmet"));
var dotenv_1 = __importDefault(require("dotenv"));
var morgan_1 = __importDefault(require("morgan"));
var database_1 = require("./database");
var signUp_1 = require("./signUpInOut/signUp");
var singIn_1 = require("./signUpInOut/singIn");
var getAllTasks_1 = require("./tasksRequests/getAllTasks");
var associations_1 = require("./associations");
var checkToken_1 = require("./middlewares/checkToken");
var createATask_1 = require("./tasksRequests/createATask");
var editATask_1 = require("./tasksRequests/editATask");
var deleteTask_1 = require("./tasksRequests/deleteTask");
var editOneUser_1 = require("./signUpInOut/editOneUser");
var deleteOneUser_1 = require("./signUpInOut/deleteOneUser");
dotenv_1.default.config();
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, helmet_1.default)()); // To protect the routes
app.use((0, morgan_1.default)('dev')); // To make logs more beautiful
// SIGNUP AND SIGNIN
// put before middlewares, since don't need a valid token.
(0, signUp_1.signUp)(app);
(0, singIn_1.signIn)(app);
// MIDDLEWARE to check the token.
app.use(checkToken_1.requireJwtMiddleware);
//Tasks crud for the authenticated user
(0, getAllTasks_1.getAllTasks)(app);
(0, createATask_1.createATask)(app);
(0, editATask_1.editATask)(app);
(0, deleteTask_1.deleteMultipleTasks)(app);
(0, deleteTask_1.deleteOneTask)(app);
// User change password, username or delete account
(0, editOneUser_1.editUsersCredentials)(app);
(0, deleteOneUser_1.deleteOneUser)(app);
database_1.sequelize.sync({ alter: true }).then(function () {
    (0, associations_1.associateUsersAndTasks)();
    console.log('DB connected.');
});
// Run the server
app.listen(3000, function () {
    console.log('server is running.');
});
