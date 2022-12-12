import bcrypt from 'bcrypt'
import { Express } from "express"
import { encode, TAlgorithm } from 'jwt-simple'
import { User } from '../models/user'
import { SECRET_KEY } from '../tokenHanlders/secret'
import { saltRounds } from './utils'

export const signUp = (app: Express) => {

    // Always use HS512 to sign the token
    const algorithm: TAlgorithm = "HS512"

    app.post('/users/signup', async (req, res) => {
        if (!req.body.password) {
            res.status(400).send('Password is missing')
        } else {
            //Create the requested user, if username is not already taken.
            const [user, created] = await User.findOrCreate({
                where: { username: req.body.username },
                defaults: {
                    ...req.body,
                    password: (() => {
                        const salt = bcrypt.genSaltSync(saltRounds)
                        const hash = bcrypt.hashSync(req.body.password, salt)
                        return hash
                    })()
                }
            })

            if (created) {
                res.status(201).send(`User ${req.body.username} was created.`)
            } else {
                res.status(400).send(`Username already taken.`)
            }

        }
    })
}