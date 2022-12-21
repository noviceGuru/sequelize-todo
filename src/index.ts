import express from 'express'
import helmet from 'helmet'
import dotenv from 'dotenv'
import { sequelize } from './database'

import { signUp } from './signUpInOut/signUp'
import { signIn } from './signUpInOut/singIn'
import { getAllTasks } from './tasksRequests/getAllTasks'
import { associateUsersAndTasks } from './associations'
import { requireJwtMiddleware } from './middlewares/checkToken'
import { createATask } from './tasksRequests/createATask'
import { editATask } from './tasksRequests/editATask'
import { deleteMultipleTasks, deleteOneTask } from './tasksRequests/deleteTask'
import { editUsersCredentials } from './signUpInOut/editOneUser'
import { deleteOneUser } from './signUpInOut/deleteOneUser'

dotenv.config()

const app = express()
app.use(express.json())
app.use(helmet()) // To protect the routes

// SIGNUP AND SIGNIN
// put before middlewares, since don't need a valid token.
signUp(app)
signIn(app)

// MIDDLEWARE to check the token.
app.use(requireJwtMiddleware)

//Tasks crud for the authenticated user
getAllTasks(app)
createATask(app)
editATask(app)
deleteMultipleTasks(app)
deleteOneTask(app)


// User change password, username or delete account
editUsersCredentials(app)
deleteOneUser(app)

sequelize.sync({ alter: true }).then(() => {
    associateUsersAndTasks()
    console.log('DB connected.')
})


// Run the server
app.listen(3000, () => {
    console.log('server is running.')
})