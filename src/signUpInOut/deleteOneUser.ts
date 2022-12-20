import { Express } from "express"
import bcrypt from "bcrypt"

import { User } from "../models"

export const deleteOneUser = (app: Express) => {
    app.delete(`/${User.tableName}/`, async (req, res) => {
        try {
            if (!req.body.username) throw { type: "validation", message: "Username can't be null." }
            if (!req.body.password) throw { type: "validation", message: "Password can't be null." }
            const id = req.body.UserId

            const user: any = await User.findOne({ where: { id: id } })

            if (user && bcrypt.compareSync(req.body.password, user.password)){
                const response = await User.destroy({ where: { id: id } })
                response ?
                    res.status(200).send(`${User.name} with id ${id} was deleted.`) :
                    res.status(400).send(`Did not find the ${User.name}.`)
            } else {
                throw {type : "validation", message: "Credentials aren't valid."}
            }
        } catch (error) {
            res.status(500).send({
                description: 'Sorry, something went wrong',
                error: error
            })
        }
    })
}