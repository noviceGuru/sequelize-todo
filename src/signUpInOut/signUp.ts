import bcrypt from 'bcrypt'
import { Express } from "express"
import { encode, TAlgorithm } from 'jwt-simple'
import { User } from '../models/user'
import { SECRET_KEY } from '../tokenHanlders/secret'

export const signUp = (app: Express) => {
    const saltRounds = 10

    // Always use HS512 to sign the token
    const algorithm: TAlgorithm = "HS512"

    app.post('/users/signup', async (req, res) => {
        if (!req.body.password) {
            res.status(400).send('Password is missing')
        } else {
            // Generate a token
            const issued = Date.now()
            const fifteenMinutesInMs = 15 * 60 * 1000
            const expires = issued + fifteenMinutesInMs

            let newSession = {
                username: req.body.username,
                dateCreated: Date.now(),
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                issued: issued,
                expires: expires,
            }

            let token = encode(newSession, SECRET_KEY, algorithm)
            // Save the user and the hashed password to the DB
            bcrypt
                .genSalt(saltRounds)
                .then(async hash => {
                    await User.create({ ...req.body, password: hash })
                    res.send({token: token})
                })
        }
    })
}