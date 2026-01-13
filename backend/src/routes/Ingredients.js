import { Router } from 'express';
import { IngredientController } from '../controllers/Ingredients.js';

const IngredientRouter = Router();

IngredientRouter.get('/api/ingredients', IngredientController.getAllIngredient);
IngredientRouter.get('/api/ingredients/:id', IngredientController.getIngredientById)
IngredientRouter.post(
  '/api/ingredients',
  IngredientController.postSingleIngredient
);
IngredientRouter.post(
  '/api/ingredients/bulk',
  IngredientController.postBulkIngredient
);
IngredientRouter.delete(
  '/api/ingredients/:id',
  IngredientController.deleteIngredient
);
IngredientRouter.patch(
  '/api/ingredients/:id',
  IngredientController.updateIngredientInformation
);
IngredientRouter.post(
  '/api/ingredients/:id/purchase',
  IngredientController.purchaseIngredient
);
IngredientRouter.post(
  '/api/ingredients/:id/adjust',
  IngredientController.adjustIngredient
);
IngredientRouter.get(
  '/api/ingredients/low-stock',
  IngredientController.getLowStockIngredient
);
export default IngredientRouter;
