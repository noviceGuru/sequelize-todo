import { Express } from "express";

export const postOne = (Model: any, app: Express) => {
    app.post(`/${Model.tableName}`, async (req, res) => {
        try {
            await Model.create(req.body)
            res.status(201).send('success')
        } catch (err) {
            res.status(500).send({ error: 'Something went wrong.' + err })
        }
    })
}