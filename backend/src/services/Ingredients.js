import prisma from '../config/DBConnection.js';

export const IngredientService = {
	// GET get all ingredient information
	getAllIngredient: async () => {
		return await prisma.ingredient.findMany();
	},
	// POST post new ingredient into database
	addSingleIngredient: async ({
		name,
		unit,
		currentStock,
		minimumStock,
		costPerUnit,
	}) => {
		const data = await prisma.ingredient.create({
			data: {
				name: name,
				unit: unit,
				current_stock: currentStock,
				minimum_stock: minimumStock,
				cost_per_unit: costPerUnit,
			},
			select: {
				id: true,
				name: true,
				unit: true,
				current_stock: true,
				minimum_stock: true,
				cost_per_unit: true,
			},
		});

		return data;
	},

	// POST add bulk ingredients into database
	addBulkIngredient: async (ingredientList) => {
		const data = await prisma.ingredient.createManyAndReturn({
			data: ingredientList,
			select: {
				id: true,
				name: true,
				unit: true,
				current_stock: true,
				minimum_stock: true,
				cost_per_unit: true,
			},
		});

		return data;
	},

	// PATCH update ingredient information
	async updateIngredientInformation(id, newInformation) {
		// TODO check if ingredient available or not

		const data = await prisma.ingredient.update({
			where: {id: id},
			data: {...newInformation},
			select: {
				name: true,
				unit: true,
				current_stock: true,
				minimum_stock: true,
				cost_per_unit: true,
			},
		});

		return data;
	},

	// DELETE delete ingredient from database
	async deleteIngredient(id) {
		await prisma.ingredient.delete({where: {id: id}});
	},
};
