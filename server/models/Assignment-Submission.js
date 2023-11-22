import {sequelize, } from '../services/database/db.js'
import { Sequelize, DataTypes } from 'sequelize';

const AssignmentSubmissiontMap = sequelize.define('AssignmentSubmission', {
    
    account: {
        type: DataTypes.STRING,
        allowNull: false
      },
    assignment: {
      type: DataTypes.STRING,
      allowNull: false
    },
    submission: {
      type: DataTypes.STRING,
      allowNull: false
    }
      
  });

export default AssignmentSubmissiontMap;
  