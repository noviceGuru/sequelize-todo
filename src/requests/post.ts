import { Express } from "express";

export const postOne = (User: any, app: Express) => {
    app.post('/users', async (req, res) => {
        try {
            await User.create(req.body)
            res.status(201).send('success')
        } catch (err) {
            res.status(500).send({ error: 'Something went wrong.' + err })
        }
    })
}