import {Router} from 'express';
import {IngredientController} from '../controllers/Ingredients.js';

const IngredientRouter = Router();

IngredientRouter.get('/api/ingredients', IngredientController.getAllIngredient);
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
export default IngredientRouter;
