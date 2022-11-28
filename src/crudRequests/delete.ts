import { Express } from "express"

export const deleteOne = (Model: any, app: Express) => {
    app.delete(`/${Model.tableName}/:id`, async (req, res) => {
        try {
            const response = await Model.destroy({ where: { id: req.params.id } })
            response ?
                res.status(200).send(`${Model.name} with id ${req.params.id} was deleted.`) :
                res.status(400).send(`Did not find the User.`)
        } catch (error) {
            res.status(500).send('Sorry, something went wrong' + error)
        }
    })
}