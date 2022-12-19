import { Express } from "express"
import { Task } from "../models"

export const createATask = (app: Express) => {
    app.post(`/${Task.tableName}`, async (req, res) => {
        try {
            let newTask = {...req.body}
            // delete newTask.userId
            await Task.create(newTask)
            res.status(201).send('success')
        } catch (err) {
            res.status(500).send({ error: 'Something went wrong.' + err })
        }
    })
}