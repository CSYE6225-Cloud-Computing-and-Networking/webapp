import { Sequelize } from "sequelize";
// import dbConfig from '../../config/db-config.js'
import dbConfig from '../../config/db-condig-vm.js'

export const sequelize = new Sequelize({
    dialect: dbConfig.dialect,
    host: dbConfig.host,
    username: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database,
    // define: {
    //     timestamps: false
    // },
    logging: false
});
