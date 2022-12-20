import express from 'express'
import { sequelize } from './database'

import { User } from './models/user'
import { signUp } from './signUpInOut/signUp'
import { getAll } from './crudRequests/get'
import { deleteOne } from './crudRequests/delete'
import { signIn } from './signUpInOut/singIn'
import { getAllTasks } from './tasksRequests/getAllTasks'
import { associateUsersAndTasks } from './associations'
import { requireJwtMiddleware } from './middlewares/checkToken'
import { createATask } from './tasksRequests/createATask'
import { editATask } from './tasksRequests/editATask'
import { deleteMultipleTasks, deleteOneTask } from './tasksRequests/deleteTask'
import { editUsersCredentials } from './signUpInOut/editOneUser'

const app = express()
app.use(express.json())

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


// User change password / name / sruname / password or delete account
editUsersCredentials(app)
getAll(User, app)
deleteOne(User, app)

sequelize.sync({ alter: true }).then(() => {
    associateUsersAndTasks()
    console.log('DB connected.')
})


// run the server
app.listen(3000, () => {
    console.log('server is running.')
})