import {z} from 'zod';

const PRODUCT_TYPE = ['food', 'drink', 'snack'];
const PRODUCT_OBJECT = {
	name: z.string(),
	image: z.url().nullable(),
	price: z.number().nonnegative(),
	type: z.enum(PRODUCT_TYPE),
};

const SingleProductValidator = z.object(PRODUCT_OBJECT);

const BulkProductValidator = z.array(z.object(PRODUCT_OBJECT));

export {SingleProductValidator, BulkProductValidator};
