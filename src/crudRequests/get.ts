import { Express } from "express"

export const getOne = (Model: any, app: Express) => {
    app.get(`/${Model.tableName}/:id`, async (req, res) => {
        try {
            const model = await Model.findOne({ where: { id: req.params.id } })
            model ?
                res.status(200).send(model) :
                res.status(404).send(`user not found.`)
        } catch (err) {
            res.status(500).send({ error: 'Something went wrong.' + err })
        }
    })
}

export const getAll = (Model: any, app: Express) => {
    app.get(`/${Model.tableName}`, async (req, res) => {
        try {
            const model = await Model.findAll()
            res.send(model)
        } catch (err) {
            res.status(500).send({ error: 'Something went wrong.' + err })
        }
    })
}