"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkExpirationStatus = void 0;
var checkExpirationStatus = function (token) {
    var now = Date.now();
    if (token.expires > now)
        return "active";
    //Find timestamp for the end of the tonken's grace period
    var threeHoursInMs = 3 * 60 * 60 * 1000;
    var threeHoursAfterExpiration = token.expires + threeHoursInMs;
    if (threeHoursAfterExpiration > now)
        return "grace";
    return "expired";
};
exports.checkExpirationStatus = checkExpirationStatus;
