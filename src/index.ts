import express from 'express'
import { sequelize } from './database'
import { User } from './models/user'

sequelize.sync({ force: true }).then(() => console.log('DB connected.'))


const app = express()
app.use(express.json());

// post
app.post('/users', async (req, res) => {
    await User.create(req.body)
    res.send('success')
})

// get all
app.get('/users', async (req, res) => {
    const users = await User.findAll()
    res.send(users)
})

// get one
app.get('/users/:id', async (req, res) => {
    const user = await User.findOne({ where: { id: req.params.id } })
    res.send(user)
})

// edit
app.put('/users/:id', async (req, res) => {
    const id = req.params.id;
    const user = await User.findOne({ where: { id: id } });
    user.lastName = req.body.lastName;
    await user.save();
    res.send('updated');
})

// delete
app.delete('/users/:id', async (req, res) => {
    await User.destroy({ where: { id: req.params.id } })
    res.send(`User with id ${req.params.id} was deleted.`)
})

// run the server
app.listen(3000, () => {
    console.log('server is running.')
})