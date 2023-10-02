import {sequelize, } from '../services/database/db.js'
import { Sequelize, DataTypes } from 'sequelize';

const AccountAssignmentMap = sequelize.define('AccountAssignmentMap', {

    account: {
      type: DataTypes.STRING,
      allowNull: false
    },
    assignment: {
      type: DataTypes.STRING,
      allowNull: false
    }
      
  });

export default AccountAssignmentMap;
  