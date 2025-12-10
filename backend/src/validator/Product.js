import {z} from 'zod';

const PRODUCT_TYPE = ['food', 'drink', 'snack'];
const STATUS = ['available', 'unavailable'];
const PRODUCT_OBJECT = {
	name: z.string(),
	image: z.url().nullable(),
	price: z.number().nonnegative(),
	type: z.enum(PRODUCT_TYPE),
};

const SingleProductValidator = z.object(PRODUCT_OBJECT);

const BulkProductValidator = z.array(z.object(PRODUCT_OBJECT));

const UpdateProductValidator = z.object({
	name: z.string().optional(),
	image: z.url().nullable().optional(),
	price: z.number().nonnegative().optional(),
	type: z.enum(PRODUCT_TYPE).optional(),
	status: z.enum(STATUS).optional(),
});

export {SingleProductValidator, BulkProductValidator, UpdateProductValidator};
