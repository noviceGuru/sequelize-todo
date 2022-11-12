import { Sequelize } from "sequelize"

const sequelize = new Sequelize('test-db', 'user', 'password', {
    dialect: 'sqlite',
    host: './dev.sqlite'
})

export { sequelize }