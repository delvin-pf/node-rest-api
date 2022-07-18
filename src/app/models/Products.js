import database from '../../database/index.js'

import { DataTypes } from 'sequelize';
import Manufacturers from './Manufacturers.js';

const Products = database.define('Products', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  price: {
    type: DataTypes.INTEGER,
  },
  quantity: {
    type: DataTypes.INTEGER,
  },
  fabricante_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Manufacturers,
      key: 'id'
    }
  },
  createdAt: {
    type: DataTypes.DATE,
  },
  updatedAt: {
    type: DataTypes.DATE
  }
}, {
  tableName: 'Products'
});

export default Products;
