import database from '../../database/index.js'
import { DataTypes } from 'sequelize';

import Products from './Products.js';
import Categories from './Categories.js';

const CategoryProduct = database.define('CategoryProduct', {
  product_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Products,
      key: 'id',
    } 
  },
  category_id: {
    type: DataTypes.STRING,
    references: {
      model: Categories,
      key: 'id',
    }
  },
  createdAt: {
    type: DataTypes.DATE
  },
  updatedAt: {
    type: DataTypes.DATE
  }
}, {
  tableName: 'Category_Product'
})

export default CategoryProduct;