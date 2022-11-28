import { Express } from "express"

export const putOne = (Model: any, app: Express) => {
    app.put(`/${Model.tableName}/:id`, async (req, res) => {
        try {
            const id = req.params.id;
            const updatingData = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                username: req.body.username,
                role: req.body.role
            }

            if (!updatingData.firstName) throw { type: 'validation', message: "First name can't be null" }
            if (!updatingData.lastName) throw { type: 'validation', message: "Last name can't be null" }

            await Model.update(updatingData, { where: { id: id } })

            res.status(200).send(`updated user with id ${req.params.id}`)
        } catch (error: any) {
            error.type === 'validation' ?
                res.status(400).send({ error: error }) :
                res.status(500).send({ error: 'Sorry, something went wrong.' })
        }
    })
}