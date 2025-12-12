import prisma from '../config/DBConnection.js';
import ProductService from './Product.js';

export default class OrderService {
	constructor() {
		this.countTotalPrice = this.countTotalPrice.bind(this);
		this.productService = new ProductService();
	}

	// Count total price of the selected items/products
	async countTotalPrice(items) {
		// Get price array from id
		const totalPrice = Promise.allSettled(
			items.map(async ({id, quantity}) => {
				const productData = await this.productService.getProductById(id);
				return productData.price * quantity; // Get the current price from database and times it with quantity
			})
		).then((result) => {
			return result
				.filter((value) => value.status === 'fulfilled') // filter only fulfilled promises
				.map((value) => value.value) // map a new array with only value ["2000","3000"] for count total price
				.reduce((acc, currentval) => acc + currentval, 0); // reduce new array and get total price = 5000
		}); // return totalPrice = 60000
		return await totalPrice;
	}
	// POST Create New Order
	async addOrder(item) {
		// Get id of the item
		const {customer_name, order_type, table_number, payment_method, items} = {
			...item,
		};

		// Get total price
		const totalPrice = await this.countTotalPrice(items);

		// check order_type ('dine_in' or 'take_out')
		const data = await prisma.order.create({
			data: {
				customer_name: customer_name,
				table_number: table_number,
				type: order_type,
				payment_method: payment_method,
				total_price: totalPrice,
				transaction_status: 'success', // forced to be success transaction
			},
			select: {
				id: true,
				customer_name: true,
				...(order_type === 'dine_in' && {table_number: true}), //  This make sure to return table number if dine_in
				payment_method: true,
				total_price: true,
				created_at: true,
				transaction_status: true,
			},
		});
		// Return data to controller
		return data;
	}

	// GET Get Order Detail (Uncompleted)
	async getOrderDetail(id) {
		// construct items[] consist of data product
		const data = await prisma.order.findFirst({
			where: {id: id},
			select: {},
		});
	}
	// GET Get all order detail
	// PATCH Update order detail
}
