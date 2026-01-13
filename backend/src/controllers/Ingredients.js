import { IngredientService } from '../services/Ingredients.js';

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

  // GET get ingredient by Id
  async getIngredientById(req, res, next) {
    const { id } = req.params;

    try {
      const data = await IngredientService.getIngredientById(id);
      return res.status(200).json({
        status: "success",
        message: "Berhasil mendapatkan informasi bahan",
        data: data
      })
    } catch (err) {
      next(err)
    }
  },
  // POST post new single ingredient into database
  async postSingleIngredient(req, res, next) {
    const body = req.body;

    try {
      const data = await IngredientService.addSingleIngredient({ ...body });

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
      const data = await IngredientService.addBulkIngredient(body);

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
    const { id } = req.params;
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
    const { id } = req.params;
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

  // POST purchase new ingredient and update ingredient table
  async purchaseIngredient(req, res, next) {
    const { quantity, reference_id, note } = req.body;
    const { id } = req.params;

    try {
      const dataLog = await IngredientService.purchaseIngridient({ ingredientId: id, quantity: quantity, referenceId: reference_id, note: note });
      return res.status(201).json({
        status: 'success',
        message: 'Berhasil membeli bahan',
        data: dataLog,
      });
    } catch (err) {
      next(err);
    }
  },

  // POST doing adjusment for real situation and system, for syncrhonizing
  async adjustIngredient(req, res, next) {
    console.log(req.body);
    const { type, input_quantity, reason } = req.body;

    const userId = req.user.id;
    const { id } = req.params;
    // ingredientId, userId, type, inputQuantity, reason
    try {
      const dataLog = await IngredientService.adjustIngridient({ ingredientId: id, userId: userId, type: type, inputQuantity: input_quantity, reason: reason });
      return res.status(201).json({
        status: 'success',
        message: 'Berhasil mengadjust bahan',
        data: dataLog,
      });
    } catch (err) {
      next(err);
    }
  },

  // GET get information about ingredient with stock lower than minimum stock
  async getLowStockIngredient(req, res, next) {
    try {
      const data = await IngredientService.getLowStockIngredient();
      return res.status(200).json({
        status: 'success',
        message: 'Berhasil mendapatkan bahan yang kurang dari minimum_stock',
        data: data,
      });
    } catch (err) {
      next(err);
    }
  },
};
