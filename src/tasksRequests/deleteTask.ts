import { Express } from "express"
import { Task } from "../models"

export const deleteOneTask = (app: Express) => {
    app.delete(`/${Task.tableName}/:id`, async (req, res) => {
        try {
            const response = await Task.destroy({ where: { id: req.params.id } })
            response ?
                res.status(200).send(`${Task.name} with id ${req.params.id} was deleted.`) :
                res.status(400).send(`Did not find the ${Task.name}.`)
        } catch (error) {
            res.status(500).send('Sorry, something went wrong' + error)
        }
    })
}

export const deleteMultipleTasks = (app: Express) => {
    app.delete(`/${Task.tableName}/delete`, async (req, res) => {
        console.log(req.body)
        try {
            const response = await Task.destroy({ where: { id: req.body.idsToDelete } })
            response ?
                res.status(200).send(`${Task.tableName} with ids ${req.body.idsToDelete} were deleted.`) :
                res.status(400).send(`Did not find the ${Task.tableName}.`)
        } catch (error) {
            res.status(500).send({
                description: 'Sorry, something went wrong',
                error: error
            })
        }
    })
}