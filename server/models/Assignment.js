import { Sequelize, DataTypes } from 'sequelize';
import {sequelize} from '../services/database/db.js'

const Assignment = sequelize.define('Assignment', {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    points: {
        type: DataTypes.INTEGER,
        allowNull: false,
        max: 10,
        min:1
    },
    num_of_attemps: {
        type: DataTypes.INTEGER,
        allowNull: false,
        max: 100,
        min:1
    },
    deadline: {
        type: DataTypes.STRING,
        allowNull: false
    },
    assignment_created: {
        type: DataTypes.STRING
    },
    assignment_updated: {
        type: DataTypes.STRING
    }
      
  });
  
  export default Assignment;
