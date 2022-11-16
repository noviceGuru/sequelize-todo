import express from 'express'
import { sequelize } from './database'
import { User } from './models/user'
import { postOne, getOne, getAll, putOne, deleteOne } from './requests'

sequelize.sync({ alter: true }).then(() => console.log('DB connected.'))


const app = express()
app.use(express.json());

// post
postOne(User, app)

// get all
getAll(User, app)

// get one
getOne(User, app)

// edit
putOne(User, app)

// delete
deleteOne(User, app)

// run the server
app.listen(3000, () => {
    console.log('server is running.')
})