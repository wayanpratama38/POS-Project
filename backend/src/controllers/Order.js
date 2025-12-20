import {OrderService} from '../services/Order.js';
import {AddNewOrderValidator} from '../validator/Order.js';

export const OrderController = {
	// POST Create New Order
	addOrder: async (req, res, next) => {
		const body = req.body;
		try {
			// Validate user input
			AddNewOrderValidator.parse(body);

			const data = await OrderService.addOrder(body);

			return res.status(201).json({
				status: 'success',
				message: 'Berhasil membuat pesanan baru',
				data: {...data},
			});
		} catch (err) {
			next(err);
		}
	},

	// GET Get Order Detail
	getOrderDetail: async (req, res, next) => {
		const {id} = {...req.params};
		try {
			const data = await OrderService.getOrderDetail(id);
			return res.status(200).json({
				status: 'success',
				message: 'Berhasil mendapatkan detail order',
				data: data,
			});
		} catch (err) {
			next(err);
		}
	},

	// GET Get all order
	getAllOrder: async (req, res, next) => {
		try {
			const data = await OrderService.getAllOrder();
			return res.status(200).json({
				status: 'success',
				message: 'Berhasil mendapatkan semua informasi order',
				data: data,
			});
		} catch (err) {
			next(err);
		}
	},
};
