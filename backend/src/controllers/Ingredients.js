import {IngredientService} from '../services/Ingredients';

export const IngredientController = {
	// GET get all ingredient information
	async getAllIngredient(req, res, next) {
		try {
			const data = await IngredientService.getAllIngredient();
			return res.status(200).json({
				status: 'success',
				message: 'Berhasil mendapatkan semua informasi bahan-bahan',
				data: data,
			});
		} catch (err) {
			next(err);
		}
	},
	// TODO GET get ingredient by id
	// POST post new single ingredient into database
	async postSingleIngredient(req, res, next) {
		const body = req.body;

		try {
			const data = await IngredientService.addSingleIngredient({...body});

			return res.status(201).json({
				status: 'success',
				message: 'Berhasil menambahkan bahan baru',
				data: data,
			});
		} catch (err) {
			next(err);
		}
	},
	// POST post bulk ingredients into datbaase
	async postBulkIngredient(req, res, next) {
		const body = req.body;
		try {
			const data = await IngredientService.addBulkIngredient(...body);

			return res.status(201).json({
				status: 'success',
				message: 'Berhasil menambahkan bahan-bahan baru',
				data: data,
			});
		} catch (err) {
			next(err);
		}
	},
	// PATCH update ingredient information in database
	async updateIngredientInformation(req, res, next) {
		const {id} = req.params;
		const body = req.body;

		try {
			const data = await IngredientService.updateIngredientInformation(id, {
				...body,
			});

			return res.status(200).json({
				status: 'success',
				message: 'Berhasil merubah data bahan',
				data: data,
			});
		} catch (err) {
			next(err);
		}
	},
	// DELETE delete ingredient from database
	async deleteIngredient(req, res, next) {
		const {id} = req.params;
		try {
			await IngredientService.deleteIngredient(id);

			return res.status(201).json({
				status: 'success',
				message: 'Berhasil menghapus bahan dari database',
			});
		} catch (err) {
			next(err);
		}
	},
};
