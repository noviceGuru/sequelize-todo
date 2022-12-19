import { User, Task } from "../models"

export const associateUsersAndTasks = () => {
    User.hasMany(Task, {foreignKey : 'userId'})
    Task.belongsTo(User)
}