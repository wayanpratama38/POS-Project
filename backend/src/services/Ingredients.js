import prisma from '../config/DBConnection.js';

export const IngredientService = {
	// GET get all ingredient information
	getAllIngredient: async () => {
		return await prisma.ingredient.findMany();
	},

	// GET get ingredient by id
	async getIngredientById(id) {
		// TODO check if ingredient is available or not

		return await prisma.ingredient.findFirst({where: {id: id}});
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

	// POST purchase new ingredient and update ingridient table
	async purchaseIngridient({ingredientId, quantity, referenceId, note}) {
		// TODO make sure ingredient valid

		return await prisma.$transaction(async (tx) => {
			// 1. Create the purchase log for the IngredientTransaction table
			const purchaseLog = await tx.ingredientTransaction.create({
				data: {
					ingredient_id: ingredientId,
					type: 'purchase',
					quantity: quantity,
					reference_id: referenceId || null,
					note: note || '',
				},
			});

			// 2. After log created, update the Ingredient.current_stock
			await tx.ingredient.update({
				where: {id: ingredientId},
				data: {
					current_stock: {
						increment: quantity,
					},
				},
			});

			// 3. Return with the purchase log data
			return purchaseLog;
		});
	},

	// POST adjustment into ingridient table
	async adjustIngridient({ingredientId, userId, type, inputQuantity, reason}) {
		// TODO make sure ingridient valid

		return prisma.$transaction(async (tx) => {
			let delta = 0;
			let finalStock = 0;

			// 0.5 Get the current stock
			const currentStock = (await this.getIngredientById(ingredientId))
				.current_stock;

			if (type === 'adjustment') {
				finalStock = Number(currentStock);
				delta = inputQuantity - Number(currentStock);
			} else {
				const wastedAmount = Number(inputQuantity);
				delta = -Math.abs(wastedAmount);
				finalStock = currentStock + delta;
			}
			// 1.  Create Stock Adjusment log
			await tx.stockAdjusment.create({
				data: {
					ingredient_id: ingredientId,
					adjusted_by: userId,
					quantity_delta: delta,
					reason: reason,
				},
			});

			// 2. Create Ingredient Transaction log
			await tx.ingredientTransaction.create({
				data: {
					ingredient_id: ingredientId,
					type: type,
					quantity: delta,
					note: reason,
				},
			});

			// 3.  Update Ingredient Table
			await tx.ingredient.update({
				where: {id: ingredientId},
				data: {
					current_stock: finalStock,
				},
			});

			return {
				type: type,
				previous_stock: currentStock,
				current_stock: finalStock,
				delta: delta,
			};
		});
	},

	// GET get low stock from ingredient
	async getLowStockIngredient() {
		const ingredientData = await prisma.ingredient.findMany();

		return ingredientData.filter((ingredient) => {
			return ingredient.current_stock.lte(ingredient.minimum_stock);
		});
	},
};
