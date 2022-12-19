import { Express } from "express"

import { User, Task } from "../models"

export const getAllTasks = (app: Express) => {
    app.get(`/${Task.tableName}`, async (req, res) => {
        try {
            const user : any = await User.findAll({where: {id : req.body.UserId}, include: { model: Task } })
            res.send(user[0][`${Task.tableName}`])
        } catch (err) {
            res.status(500).send({ error: 'Something went wrong.' + err })
        }
    })
}