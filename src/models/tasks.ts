import { DataTypes, UUID, UUIDV4 } from "sequelize"
import { sequelize } from "../database"

export const Task = sequelize.define('Task', {
    id: {
        type: UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    userId: {
        type: DataTypes.STRING
    },
    task: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'Tasks'
})