import authMiddleware from '../middlewares/AuthMiddleware.js';
import OrderRouter from './Order.js';
import ProductRouter from './Product.js';
import RefreshRouter from './Refresh.js';
import {Router} from 'express';
import AnalyticRouter from './Analytic.js';
import IngredientRouter from './Ingredients.js';

const IndexedRoute = new Router();
IndexedRoute.use(authMiddleware);
IndexedRoute.use([
	OrderRouter,
	ProductRouter,
	RefreshRouter,
	AnalyticRouter,
	IngredientRouter,
]);

export default IndexedRoute;
