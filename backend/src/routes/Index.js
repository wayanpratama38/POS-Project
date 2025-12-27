import authMiddleware from '../middlewares/AuthMiddleware.js';
import OrderRouter from './Order.js';
import ProductRouter from './Product.js';
import RefreshRouter from './Refresh.js';
import {Router} from 'express';

const IndexedRoute = new Router();
IndexedRoute.use(authMiddleware);
IndexedRoute.use([OrderRouter, ProductRouter, RefreshRouter]);

export default IndexedRoute;
