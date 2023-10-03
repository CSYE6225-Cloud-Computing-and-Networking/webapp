import { Sequelize } from "sequelize";
import dbConfig from '../../config/db-config.js'


export const sequelize = new Sequelize({
    dialect: dbConfig.dialect,
    host: dbConfig.host,
    username: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.database,
});

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch((err) => {
//     console.error('Unable to connect to the database:', err);
//   });
