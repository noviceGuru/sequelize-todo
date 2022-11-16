import { Express } from "express"

export const deleteOne = (User: any, app: Express) => {
    app.delete('/users/:id', async (req, res) => {
        try {
            const response = await User.destroy({ where: { id: req.params.id } })
            response ?
                res.status(200).send(`User with id ${req.params.id} was deleted.`) :
                res.status(400).send(`Did not find the User.`)
        } catch (error) {
            res.status(500).send('Sorry, something went wrong' + error)
        }
    })
}