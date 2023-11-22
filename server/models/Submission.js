import { Sequelize, DataTypes } from 'sequelize';
import {sequelize} from '../services/database/db.js'

const Submission = sequelize.define('Submission', {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    assignment_id:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    submission_url: {
        type: DataTypes.STRING,
        allowNull: false
    },  
    submission_date: {
        type: DataTypes.STRING,
        allowNull: false
    },
    submission_updated: {
        type: DataTypes.STRING
    }
      
  }, {
    timestamps: false,
  });
  
  export default Submission;
