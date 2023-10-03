import {sequelize, } from '../services/database/db.js'
import { Sequelize, DataTypes } from 'sequelize';

const Account = sequelize.define('Account', {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    account_created: {
        type: DataTypes.STRING
    },
    account_updated: {
        type: DataTypes.STRING
    }
      
  });

export default Account;
  