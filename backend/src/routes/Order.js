import {Router} from 'express';
import {OrderController} from '../controllers/Order.js';

const OrderRouter = new Router();

OrderRouter.post('/api/orders', OrderController.addOrder);
OrderRouter.get('/api/orders/:id', OrderController.getOrderDetail);
OrderRouter.get('/api/orders', OrderController.getAllOrder);

export default OrderRouter;
