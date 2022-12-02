import { decode, TAlgorithm } from "jwt-simple"
import { DecodeResult, Session, Error } from "../types/types"

export const decodeSession = (secretKey: string, tokenString: string): DecodeResult => {
    //Always use HS512 to decode the token
    const algorithm: TAlgorithm = "HS512"

    let result: Session

    try {
        result = decode(tokenString, secretKey, false, algorithm)
    } catch (error) {
        const err = error as Error
        if (err.message === "No token supplied" || err.message === "Not enough or too many segments") {
            return {
                type: "invalid-token"
            }
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

        throw err
    }

    return {
        type: "valid",
        session: result
    }

}