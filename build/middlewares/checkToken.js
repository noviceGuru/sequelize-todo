"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireJwtMiddleware = void 0;
var checkExpiration_1 = require("../tokenHanlders/checkExpiration");
var decode_1 = require("../tokenHanlders/decode");
var encode_1 = require("../tokenHanlders/encode");
var secret_1 = require("../tokenHanlders/secret");
// This middlware checks if token is valid. If it's not valid and it's in 
// the grace period, it renews it automatically, and if it's
// out of the grace period, it returns 401 (unauthorized).
var requireJwtMiddleware = function (request, response, next) {
    var unauthorized = function (message) { return response.status(401).json({
        ok: false,
        status: 401,
        message: message
    }); };
    var requestHeader = "X-JWT-Token";
    var responseHeader = "X-Renewed-JWT-Token";
    var header = request.header(requestHeader);
    if (!header) {
        unauthorized("Required ".concat(requestHeader, " header not found."));
        return;
    }
    var decodedSession = (0, decode_1.decodeSession)(secret_1.SECRET_KEY, header);
    if (decodedSession.type === "integrity-error" || decodedSession.type === "invalid-token") {
        unauthorized("Failed to decode or validate authorization token. Reason : ".concat(decodedSession.type));
        return;
    }
    var expiration = (0, checkExpiration_1.checkExpirationStatus)(decodedSession.session);
    var session;
    if (expiration === "grace") {
        // Automatically renew the session and send it back with the response
        var _a = (0, encode_1.encodeSession)(secret_1.SECRET_KEY, decodedSession.session), token = _a.token, expires = _a.expires, issued = _a.issued;
        session = __assign(__assign({}, decodedSession.session), { expires: expires, issued: issued });
        response.setHeader(responseHeader, token);
    }
    else {
        session = decodedSession.session;
    }
    //Set the session on response.locals object for routes to access
    response.locals = __assign(__assign({}, response.locals), { session: session });
    //Request has a valid or renewed session. Call next to continue to the authenticated route handler
    //Also the user id is put in the request to be used for the other calls.
    request.body.UserId = session.id;
    // request.body.userId = "66608b89-6183-415a-a1c9-82609c416147"
    next();
};
exports.requireJwtMiddleware = requireJwtMiddleware;
