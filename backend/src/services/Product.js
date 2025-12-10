import prisma from '../config/DBConnection.js';
import HTTPError from '../utils/HTTPError.js';

export default class ProductService {
	// POST Add New Product (singular)
	async addSingleProduct({name, image, price, status, type}) {
		const productData = await prisma.product.create({
			data: {
				name: name,
				image: image,
				price: price,
				status: status,
				type: type,
			},
			select: {
				id: true,
				name: true,
				image: true,
				price: true,
				status: true,
				type: true,
			},
		});

		return {...productData};
	}

	// POST Add New Product (bulk)
	async addBulkProduct(productList) {
		const productsData = await prisma.product.createManyAndReturn({
			data: productList,
			select: {
				id: true,
				name: true,
				image: true,
				price: true,
				status: true,
				type: true,
			},
		});

		return productsData;
	}

	// GET Get All Product
	async getAllProduct() {
		const productsData = await prisma.product.findMany({
			select: {
				id: true,
				name: true,
				image: true,
				price: true,
				type: true,
				status: true,
			},
		});

		if (!productsData) {
			throw new HTTPError('Produk belum ada', 400);
		}

		return productsData;
	}

	// GET Get Certain Product
	async getProductById(id) {
		const productData = await prisma.product.findFirst({
			where: {
				id: id,
			},
			select: {
				name: true,
				image: true,
				price: true,
				type: true,
				status: true,
			},
		});

		if (!productData) {
			throw new HTTPError('Produk dengan ID tersebut tidak ditemukan', 400);
		}

		return {...productData};
	}

	// PATCH Update Product Information
	async updateProductInformation(id, newInformation) {
		// Check if product data is available
		await this.getProductById(id);

		const productData = await prisma.product.update({
			where: {
				id: id,
			},
			data: {...newInformation},
			select: {
				name: true,
				image: true,
				price: true,
				type: true,
				status: true,
			},
		});

		return {...productData};
	}

	// DELETE Delete Certain Product
	async deleteProduct(id) {
		await prisma.product.delete({
			where: {id: id},
		});
	}
}
