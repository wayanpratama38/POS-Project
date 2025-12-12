import OrderService from '../services/Order.js';

export default class OrderController {
	constructor() {
		// bind
		this.addOrder = this.addOrder.bind(this);

		// Service
		this.service = new OrderService();
	}

	// POST Create New Order
	async addOrder(req, res, next) {
		const body = req.body;

		//TODO Validate user input

		try {
			const data = await this.service.addOrder(body);

			return res.status(201).json({
				status: 'success',
				message: 'Berhasil membuat pesanan baru',
				data: {...data},
			});
		} catch (err) {
			next(err);
		}
	}
}
