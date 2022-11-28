import { DataTypes } from "sequelize"
import { sequelize } from "../database"

export const Task = sequelize.define('Task', {
task : {
    type : DataTypes.STRING,
    allowNull : false
}
},{
tableName: 'Tasks'
})