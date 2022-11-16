import { Express } from "express";

export const postOne = (User: any, app : Express ) => {
    app.post('/users', async (req, res) => {
        await User.create(req.body)
        res.send('success')
    })
}