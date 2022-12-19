import { Express } from "express"
import { Task } from "../models";

export const editATask = (app: Express) => {
    app.put(`/${Task.tableName}/:id`, async (req, res) => {
        try {
            const id = req.params.id;
            const updatingTask = { ...req.body, id: id }
            await Task.update(updatingTask, { where: { id: id } })

            res.status(200).send(`updated Task with id ${id}`)
        } catch (error: any) {
            error.type === 'validation' ?
                res.status(400).send({ error: error }) :
                res.status(500).send({
                    description: 'Sorry, something went wrong.',
                    error: error
                })
        }
    })
}