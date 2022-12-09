import { DataTypes } from "sequelize"
import { sequelize } from "../database"

export const User = sequelize.define('User', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull : false,
    },
    username: {
        type: DataTypes.STRING
    },
    role: {
        type: DataTypes.STRING
    },
    password:{
        type: DataTypes.STRING
    }
}, {
    tableName: 'Users',
    timestamps: false
})