import bcrypt from 'bcrypt'
import { Express } from "express"
import { User } from '../models/user'
import { saltRounds } from './utils'

export const signUp = (app: Express) => {

    app.post('/users/signup', async (req, res) => {
        if (!req.body.password) {
            res.status(400).send('Password is missing')
        } else if (!req.body.username) {
            res.status(400).send('Username is missing')
        } else {
            //Create the requested user, if username is not already taken.
            try {
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
            } catch (error) {
                res.status(500).send({
                    message: 'Something went wrong',
                    error: error
                })
            }
        }
    })
}