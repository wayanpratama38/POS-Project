import {Router} from 'express';
import OrderController from '../controllers/Order.js';

const OrderRouter = new Router();
const Controller = new OrderController();

OrderRouter.post('/orders', Controller.addOrder);

export default OrderRouter;
