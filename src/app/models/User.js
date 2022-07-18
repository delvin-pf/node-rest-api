import database from '../../database/index.js'

import { DataTypes } from 'sequelize';

const Users = database.define('Users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  email: { 
    type: DataTypes.STRING
  },
  password: {
    type: DataTypes.STRING
  },
  createdAt: {
    type: DataTypes.DATE,
  },
  updatedAt: {
    type: DataTypes.DATE
  }
}, {
  tableName: 'Users'
});

export default Users;

