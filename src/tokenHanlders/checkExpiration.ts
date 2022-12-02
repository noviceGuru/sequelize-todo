import { ExpirationStatus, Session } from "../types/types"

export const checkExpirationStatus = (token: Session): ExpirationStatus => {
    const now = Date.now()

    if (token.expires > now) return "active"

    //Find timestamp for the end of the tonken's grace period
    const threeHoursInMs = 3 * 60 * 60 * 1000
    const threeHoursAfterExpiration = token.expires + threeHoursInMs

    if(threeHoursAfterExpiration> now) return "grace"

    return "expired"
}