import database from '../../database/index.js'

import { DataTypes } from 'sequelize';

const Categories = database.define('Categories', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  createdAt: {
    type: DataTypes.DATE,
  },
  updatedAt: {
    type: DataTypes.DATE
  }
}, {
  tableName: 'Categories'
});

export default Categories;

