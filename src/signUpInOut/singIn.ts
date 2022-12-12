import { Express } from "express"
import bcrypt from 'bcrypt'
import { User } from "../models/user"
import { encode, TAlgorithm } from "jwt-simple"
import { SECRET_KEY } from "../tokenHanlders/secret"

export const signIn = (app: Express) => {
    app.post('/users/signin', async (req, res) => {
        //Find the user by username
        try {
            let user: any = await User.findOne({
                where: { username: req.body.username }
            })

            //Check if the password is correct, send a token.
            if (user && bcrypt.compareSync(req.body.password, user.password)) {
                const algorithm: TAlgorithm = "HS512"
                const issued = Date.now()
                const fifteenMinutesInMs = 15 * 60 * 1000
                const expires = issued + fifteenMinutesInMs

                let newSession = {
                    username: user.username,
                    dateCreated: Date.now(),
                    firstName: user.firstName,
                    lastName: user.lastName,
                    issued: issued,
                    expires: expires,
                }

                let token = encode(newSession, SECRET_KEY, algorithm)
                res.send({
                    status: 'Signin successfull',
                    token: token
                })
            } else {
                res.status(401).send('The credentials do not match any user.')
            }
        } catch (error) {
            res.status(500).send({
                whatHappened: 'Something went wrong',
                error: error
            })
        }
    })
}