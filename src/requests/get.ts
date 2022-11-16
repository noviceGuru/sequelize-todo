import { Express } from "express"

export const getOne = (User: any, app: Express) => {
    app.get('/users/:id', async (req, res) => {
        try {
            const user = await User.findOne({ where: { id: req.params.id } })
            console.log(user)
            user ?
                res.status(200).send(user) :
                res.status(404).send(`user not found.`)
        } catch (err) {
            res.status(500).send({ error: 'Something went wrong.' + err })
        }
    })
}

export const getAll = (User: any, app: Express) => {
    app.get('/users', async (req, res) => {
        try {
            const users = await User.findAll()
            res.send(users)
        } catch (err) {
            res.status(500).send({ error: 'Something went wrong.' + err })
        }
    })
}