import { Express } from "express"

export const deleteOne = (User: any, app: Express) => {
    app.delete('/users/:id', async (req, res) => {
        await User.destroy({where: {id: req.params.id}})
        res.send(`User with id ${req.params.id} was deleted.`)
    })
}