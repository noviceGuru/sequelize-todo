import { NextFunction, Request, Response } from "express";
import { checkExpirationStatus } from "../tokenHanlders/checkExpiration";
import { decodeSession } from "../tokenHanlders/decode";
import { encodeSession } from "../tokenHanlders/encode";
import { SECRET_KEY } from "../tokenHanlders/secret";
import { DecodeResult, ExpirationStatus, Session } from "../types/types";

// This middlware checks if token is valid. If it's not valid and it's in 
// the grace period, it renews it automatically, and if it's
// out of the grace period, it returns 401 (unauthorized).

export const requireJwtMiddleware = (request: Request, response: Response, next: NextFunction) => {
    const unauthorized = (message: string) => response.status(401).json({
        ok: false,
        status: 401,
        message: message
    })

    const requestHeader = "X-JWT-Token"
    const responseHeader = "X-Renewed-JWT-Token"
    const header = request.header(requestHeader)

    if (!header) {
        unauthorized(`Required ${requestHeader} header not found.`)
        return
    }

    const decodedSession: DecodeResult = decodeSession(SECRET_KEY, header)

    if (decodedSession.type === "integrity-error" || decodedSession.type === "invalid-token") {
        unauthorized(`Failed to decode or validate authorization token. Reason : ${decodedSession.type}`)
        return
    }

    const expiration: ExpirationStatus = checkExpirationStatus(decodedSession.session)

    let session: Session

    if (expiration === "grace") {
        // Automatically renew the session and send it back with the response
        const { token, expires, issued } = encodeSession(SECRET_KEY, decodedSession.session)
        session = {
            ...decodedSession.session,
            expires: expires,
            issued: issued
        }

        response.setHeader(responseHeader, token)
    } else {
        session = decodedSession.session
    }

    //Set the session on response.locals object for routes to access
    response.locals = {
        ...response.locals,
        session: session
    }

    //Request has a valid or renewed session. Call next to continue to the authenticated route handler
    next()
}