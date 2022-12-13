import { DataTypes, UUID, UUIDV4 } from "sequelize"
import { sequelize } from "../database"

export const User = sequelize.define('User', {
    id: {
        type: UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    firstName: {
        type: DataTypes.STRING,
    },
    lastName: {
        type: DataTypes.STRING,
    },
    username: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'Users',
    timestamps: false
})