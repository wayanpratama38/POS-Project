import {Router} from 'express';
import OrderController from '../controllers/Order.js';

const OrderRouter = new Router();
const Controller = new OrderController();

OrderRouter.post('/orders', Controller.addOrder);
OrderRouter.get('/orders/:id', Controller.getOrderDetail);
OrderRouter.get('/orders', Controller.getAllOrder);

export default OrderRouter;
