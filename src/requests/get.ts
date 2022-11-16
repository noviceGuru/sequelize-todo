import { Express } from "express"

export const getOne = (User: any, app: Express) => {
    app.get('/users/:id', async (req, res) => {
        const user = await User.findOne({ where: { id: req.params.id } })
        res.send(user)
    })
}

export const getAll = (User: any, app: Express) => {
    app.get('/users', async (req, res) => {
        const users = await User.findAll()
        res.send(users)
    })
}