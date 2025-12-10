import ProductService from '../services/Product.js';
import HTTPError from '../utils/HTTPError.js';
import {
	BulkProductValidator,
	SingleProductValidator,
} from '../validator/Product.js';

export default class ProductController {
	constructor() {
		// binding function
		this.addSingleProduct = this.addSingleProduct.bind(this);
		this.addBulkProduct = this.addBulkProduct.bind(this);
		this.getAllProduct = this.getAllProduct.bind(this);
		this.getProductById = this.getProductById.bind(this);

		this.service = new ProductService();
	}

	// POST Add New Product (singluar)
	async addSingleProduct(req, res, next) {
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
			const data = await this.service.addSingleProduct({...validatedData});

			// Response
			return res.status(201).json({
				status: 'success',
				message: 'Berhasil menambahkan produk baru',
				data: {...data},
			});
		} catch (err) {
			next(err);
		}
	}

	// POST Add New Product (bulk)
	async addBulkProduct(req, res, next) {
		// Get request body
		const body = req.body;

		try {
			// Validate request body
			const validatedData = BulkProductValidator.parse(body);

			// Service
			const allData = await this.service.addBulkProduct(validatedData);

			// Response
			return res.status(201).json({
				status: 'success',
				message: 'Berhasil menambahkan banyak produk',
				data: allData,
			});
		} catch (err) {
			next(err);
		}
	}

	// GET Get All Product
	async getAllProduct(req, res, next) {
		try {
			// Service
			const allData = await this.service.getAllProduct();

			// Response
			return res.status(200).json({
				status: 'success',
				message: 'Berhasil mendapatkan semua data produk',
				data: allData,
			});
		} catch (err) {
			next(err);
		}
	}

	// GET Get Certain Product
	async getProductById(req, res, next) {
		// Get request param
		const {id} = req.params;

		try {
			// Service
			const data = await this.service.getProductById({id});

			// Response
			return res.status(200).json({
				status: 'success',
				message: 'Berhasil mendapatkan data produk',
				data: data,
			});
		} catch (err) {
			next(err);
		}
	}
}
