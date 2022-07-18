import Users from './User.js';
import Categories from './Categories.js';
import Products from './Products.js';
import CategoryProduct from './CategoryProduct.js';
import Manufacturers from './Manufacturers.js';


Products.belongsTo(Manufacturers, {
  foreignKey: 'fabricante_id',
  as: 'manufacturer'
});

Manufacturers.hasMany(Products, {
  foreignKey: 'fabricante_id'
});

Products.belongsToMany(Categories, {
  foreignKey: 'product_id',
  as: 'categories',
  through: CategoryProduct
});

Categories.belongsToMany(Products, {
  foreignKey: 'category_id',
  through: CategoryProduct
});

export  {
  Users,
  Categories,
  Products,
  Manufacturers
};
