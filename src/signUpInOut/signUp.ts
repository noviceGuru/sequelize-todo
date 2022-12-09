import bcrypt from 'bcrypt'
import { Express } from "express"
import { User } from '../models/user'

export const signUp = (app: Express) => {
    const saltRounds = 10

    app.post('/users/signup', async (req, res) => {
        if (!req.body.password) {
            res.status(400).send('Password is missing')
        } else {
            bcrypt
                .genSalt(saltRounds)
                .then(async hash => {
                    await User.create({ ...req.body, password: hash })
                    res.send('hash :' + hash)
                })
        }
    })
}