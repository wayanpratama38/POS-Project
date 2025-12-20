import {ProductService} from '../services/Product.js';
import {
	BulkProductValidator,
	SingleProductValidator,
	UpdateProductValidator,
} from '../validator/Product.js';

export const ProductController = {
	// POST Add New Product (singluar)
	addSingleProduct: async (req, res, next) => {
		// Get request body
		const {name, image, price, type} = req.body;

		try {
			// Validate request body
			const validatedData = SingleProductValidator.parse({
				name,
				image,
				price,
				type,
			});

			// Service
			const data = await ProductService.addSingleProduct({...validatedData});

			// Response
			return res.status(201).json({
				status: 'success',
				message: 'Berhasil menambahkan produk baru',
				data: {...data},
			});
		} catch (err) {
			next(err);
		}
	},

	// POST Add New Product (bulk)
	addBulkProduct: async (req, res, next) => {
		// Get request body
		const body = req.body;

		try {
			// Validate request body
			const validatedData = BulkProductValidator.parse(body);

			// Service
			const allData = await ProductService.addBulkProduct(validatedData);

			// Response
			return res.status(201).json({
				status: 'success',
				message: 'Berhasil menambahkan banyak produk',
				data: allData,
			});
		} catch (err) {
			next(err);
		}
	},

	// GET Get All Product
	getAllProduct: async (req, res, next) => {
		try {
			// Service
			const allData = await ProductService.getAllProduct();

			// Response
			return res.status(200).json({
				status: 'success',
				message: 'Berhasil mendapatkan semua data produk',
				data: allData,
			});
		} catch (err) {
			next(err);
		}
	},

	// GET Get Certain Product
	getProductById: async (req, res, next) => {
		// Get request param
		const {id} = req.params;

		try {
			// Service
			const data = await ProductService.getProductById(id);

			// Response
			return res.status(200).json({
				status: 'success',
				message: 'Berhasil mendapatkan data produk',
				data: data,
			});
		} catch (err) {
			next(err);
		}
	},

	// PATCH Update Product Information
	updateProductInformation: async (req, res, next) => {
		// Get request parameter and body
		const {id} = req.params;
		const newInformation = req.body;

		try {
			// Validate request body
			const validatedData = UpdateProductValidator.parse(newInformation);
			// Service
			const productData = await ProductService.updateProductInformation(
				id,
				validatedData
			);

			return res.status(200).json({
				status: 'success',
				message: 'Berhasil merubah informasi dari produk',
				data: productData,
			});
		} catch (err) {
			next(err);
		}
	},

	// DELETE Delete Certain Product
	deleteProduct: async (req, res, next) => {
		const {id} = req.params;
		try {
			await ProductService.deleteProduct(id);
			return res.status(200).json({
				status: 'success',
				message: 'Berhasil menghapus produk',
			});
		} catch (err) {
			next(err);
		}
	},
};
