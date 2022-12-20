import { Express } from "express"
import bcrypt from 'bcrypt'
import { User } from "../models"
import { saltRounds } from "./utils"

export const editUsersCredentials = (app: Express) => {
    app.put(`/${User.tableName}/`, async (req, res) => {
        try {
            const id = req.body.UserId;

            if (!req.body.username) throw { type: "validation", message: "Username can't be null" }
            if (!req.body.password) throw { type: "validation", message: "Password can't be null" }

            const user: any = await User.findOne({ where: { id: req.body.UserId } })

            // Verify the password
            if (user && bcrypt.compareSync(req.body.password, user.password)) {
                if (req.body.newPassword) {
                    // Update password
                    await User.update({
                        password: (() => {
                            const salt = bcrypt.genSaltSync(saltRounds)
                            const hash = bcrypt.hashSync(req.body.newPassword, salt)
                            return hash
                        })()
                    }, { where: { id: req.body.UserId } })

                    res.status(200).send(`updated password of the user with id ${id}.`)

                } else {
                    // Change only the username
                    await User.update({ username: req.body.username }, { where: { id: id } })
                    res.status(200).send(`Updated username of the user with id ${id}.`)
                }
            } else {
                throw { type: "validation", message: "Credentials are wrong" }
            }

        } catch (error: any) {
            error.type === "validation" ?
                res.status(400).send({ error: error }) :
                res.status(500).send({
                    description: 'Sorry, something went wrong.',
                    error: error
                })
        }
    })
}