import express from 'express'
import { sequelize } from './database'

import { crudRequests } from './crudRequests'

import { Task } from './models/tasks'
import { User } from './models/user'
import { signUp } from './signUpInOut/signUp'
import { getAll } from './crudRequests/get'

sequelize.sync({ alter: true }).then(() => console.log('DB connected.'))

const app = express()
app.use(express.json());

// Crud Users
signUp(app)

getAll(User, app)
// Crud requests for each model
// models.forEach(model => crudRequests(model, app))


// Crud tasks
crudRequests(Task, app)


// run the server
app.listen(3000, () => {
    console.log('server is running.')
})