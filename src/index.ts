import express from 'express'
import { sequelize } from './database'

import { crudRequests } from './crudRequests'

import models from './models'

sequelize.sync({ alter: true }).then(() => console.log('DB connected.'))

const app = express()
app.use(express.json());

// Crud requests for each model
models.forEach(model => crudRequests(model, app))

// run the server
app.listen(3000, () => {
    console.log('server is running.')
})