import { DataTypes } from "sequelize"
import { sequelize } from "../database"

export const User = sequelize.define('User', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING
    },
    // username: {
    //     type: DataTypes.STRING
    // },
    // isAdmin: {
    //     type: DataTypes.TINYINT
    // },
}, {
    tableName: 'Users',
    timestamps: false
})