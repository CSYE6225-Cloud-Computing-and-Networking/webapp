import { Sequelize } from "sequelize";
import dbConfig from '../../config/db-config.js'
//import dbConfig from '../../config/db-condig-vm.js'

import dotenv from 'dotenv';

dotenv.config();

let dialect = process.env.dialect || dbConfig.dialect;
let host = process.env.host || dbConfig.host;
let user = process.env.user || dbConfig.user;
let password = process.env.password || dbConfig.password;
let database = process.env.database || dbConfig.database;

console.log('db dialect '+dialect)
console.log('db host '+host)
console.log('db user '+user)
console.log('db password '+password)
console.log('db database '+database)

export const sequelize = new Sequelize({
    dialect: dialect,
    host: host,
    username: user,
    password: password,
    database: database,
    // define: {
    //     timestamps: false
    // },
    logging: false
});
