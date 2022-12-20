import { Sequelize } from "sequelize"

export const sequelize = new Sequelize('test-db', 'user', 'password', {
    dialect: 'sqlite',
    host: './dev.sqlite'
})