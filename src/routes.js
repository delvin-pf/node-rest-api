import { Router } from 'express';
// Controllers
import UserController from './app/controllers/UserController.js';
import CategoryController from './app/controllers/CategoryController.js';
import ProductController from './app/controllers/ProductController.js';

// Validations
import userValidation from './app/validations/users.js';  // Users
import productValidation from './app/validations/products.js'; // Products
import categoryValidation from './app/validations/categories.js'; // Categories

// Middelwares
import auth from './app/middelwares/authenticate.js';

const routes = new Router();

routes.get('/users', auth, UserController.store);
routes.post('/login', userValidation.login, UserController.login);
routes.post('/users', userValidation.create, UserController.create);
routes.put('/users/:id', auth, userValidation.update, UserController.update);
routes.delete('/users/:id', auth, userValidation.destroy, UserController.delete);

routes.get('/categories', CategoryController.store);
routes.post('/categories', auth, categoryValidation.create, CategoryController.create);
routes.put('/categories/:id', auth, categoryValidation.update, CategoryController.update);

routes.get('/products', ProductController.store);
routes.get('/products/:id', productValidation.index, ProductController.index);
routes.post('/products', auth, productValidation.create, ProductController.create);
routes.put('/products/:id',auth, productValidation.update, ProductController.update);
routes.delete('/products/:id', auth, productValidation.destroy, ProductController.delete)


export default routes;