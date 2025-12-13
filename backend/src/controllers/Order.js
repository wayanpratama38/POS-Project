import OrderService from '../services/Order.js';

export default class OrderController {
	constructor() {
		// bind
		this.addOrder = this.addOrder.bind(this);
		this.getOrderDetail = this.getOrderDetail.bind(this);
		this.getAllOrder = this.getAllOrder.bind(this);

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

	// GET Get Order Detail
	async getOrderDetail(req, res, next) {
		const {id} = {...req.params};

		//TODO validate id

		try {
			const data = await this.service.getOrderDetail(id);
			return res.status(200).json({
				status: 'success',
				message: 'Berhasil mendapatkan detail order',
				data: data,
			});
		} catch (err) {
			next(err);
		}
	}

	// GET Get all order
	async getAllOrder(req, res, next) {
		try {
			const data = await this.service.getAllOrder();
			return res.status(200).json({
				status: 'success',
				message: 'Berhasil mendapatkan semua informasi order',
				data: data,
			});
		} catch (err) {
			next(err);
		}
	}
}
