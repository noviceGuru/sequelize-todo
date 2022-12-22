"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeSession = void 0;
var jwt_simple_1 = require("jwt-simple");
var decodeSession = function (secretKey, tokenString) {
    //Always use HS512 to decode the token
    var algorithm = "HS512";
    var result;
    try {
        result = (0, jwt_simple_1.decode)(tokenString, secretKey, false, algorithm);
    }
    catch (error) {
        var err = error;
        if (err.message === "No token supplied" || err.message === "Not enough or too many segments") {
            return {
                type: "invalid-token"
            };
        }
        if (err.message === "Signature verification failed" || err.message === "Algorithm not supported") {
            return {
                type: "integrity-error"
            };
        }
        // Handle json parse errors, thrown when the payload is nonsense
        if (err.message.indexOf("Unexpected token") === 0) {
            return {
                type: "invalid-token"
            };
        }
        throw err;
    }
    return {
        type: "valid",
        session: result
    };
};
exports.decodeSession = decodeSession;
