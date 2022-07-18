import database from '../../database/index.js'
import { DataTypes } from 'sequelize';

const Manufacturers = database.define('Manufacturers', {
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
  tableName: 'Fabricantes'
});

export default Manufacturers;
