import prisma from '../config/DBConnection.js';
import HTTPError from '../utils/HTTPError.js';

export default class ProductService {
	// POST Add New Product (singular)
	async addSingleProduct({name, image, price, status, type}) {
		// check product is available or not
		const isAvailable = await prisma.product.findFirst({
			where: {name: name},
		}); // return object if find one

		// Check is item available
		if (isAvailable) {
			throw new HTTPError('Produk dengan nama yang sama sudah ada!', 401);
		}

		// add new product
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
		// check product input is already in database or not
		const checkProductDuplicate = await Promise.all(
			productList.map(async (product) => {
				const data = await prisma.product.findFirst({
					where: {name: product.name},
				});
				if (data !== null) return data.name;
			})
		);

		// filter the only the duplicated product founded
		const checkProductDuplicateResult = checkProductDuplicate.filter(
			(val) => val !== undefined
		);

		// check if there is product duplicated founded, and if founded throw error
		if (checkProductDuplicateResult) {
			throw new HTTPError(
				`Terjadi duplikat produk dengan nama : ${checkProductDuplicateResult}`,
				401
			);
		}

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
		// Check if product data is available
		await this.getProductById(id);

		// Delete data
		await prisma.product.delete({
			where: {id: id},
		});
	}
}
