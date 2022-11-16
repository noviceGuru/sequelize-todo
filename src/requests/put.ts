import { Express } from "express"

export const putOne = (User: any, app : Express) => {
    app.put('/users/:id', async (req, res) => {
        const id = req.params.id;
        const user = await User.update({ lastName: req.body.lastName }, { where: { id: id } })
        res.send(`updated ${user}`);
    })
}