import prisma from '../config/DBConnection.js';
import {ProductService} from './Product.js';

export const OrderService = {
	// Count total price of the selected items/products
	countTotalPrice: (items) => {
		return items.reduce((sum, item) => sum + item.sub_total_price, 0);
	},

	// Get the product information, and return id, quantity, note, current price, and sub total price
	getProductInformation: async (items) => {
		return Promise.all(
			items.map(async (item) => {
				const data = await ProductService.getProductById(item.id);

				return {
					id: item.id,
					quantity: item.quantity,
					note: item.notes || '',
					current_price: data.price,
					sub_total_price: data.price * item.quantity,
				};
			})
		);
	},

	// POST Create New Order
	addOrder: async (item) => {
		// 1.Get id of the item
		const {customer_name, order_type, table_number, payment_method, items} = {
			...item,
		};

		// 2.Get Product information and total price
		const productInformations = await this.getProductInformation(items);
		const totalPrice = this.countTotalPrice(productInformations);

		return prisma.$transaction(async (tx) => {
			// 3.create new order
			const order = await tx.order.create({
				data: {
					customer_name: customer_name,
					table_number: table_number,
					type: order_type,
					payment_method: payment_method,
					total_price: totalPrice,
					transaction_status: 'success',
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

			// 4. Create order detail
			await Promise.all(
				productInformations.map(async (item) => {
					await tx.orderDetail.create({
						data: {
							order_id: order.id,
							product_id: item.id,
							// employee_id: user.id, none for now, cause we need to make authentication hehe
							current_price: item.current_price,
							sub_total_price: item.sub_total_price,
							note: item.note,
							quantity: item.quantity,
						},
					});
				})
			);

			// 5. Return created order
			return order;
		});
	},

	getOrderDetail: async (order_id) => {
		// 1. Get the order data from order table
		const orderData = await prisma.order.findUnique({
			where: {id: order_id},
			select: {
				customer_name: true,
				total_price: true,
				payment_method: true,
				transaction_status: true,
				created_at: true,
			},
		});

		// 2. Get the orderDetail data from orderDetail table
		const orderDetailData = await prisma.orderDetail.findMany({
			where: {order_id: order_id},
			select: {
				product_id: true,
				quantity: true,
				current_price: true,
				sub_total_price: true,
				note: true,
			},
		});

		// 3. Mapping from orderDetailData to API Contract wanted
		const finalOrderData = await Promise.all(
			orderDetailData.map(async (item) => {
				const productData = await ProductService.getProductById(item.product_id);

				return {
					product_name: productData.name,
					quantity: item.quantity,
					current_price: item.current_price,
					sub_total_price: item.sub_total_price,
					note: item.note,
				};
			})
		);

		// 4. Return data
		return {...orderData, items: finalOrderData};
	},

	// GET Get all order
	getAllOrder: async () => {
		return await prisma.order.findMany();
	},

	// PATCH Update order detail
};
