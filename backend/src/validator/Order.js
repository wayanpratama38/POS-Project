import {z} from 'zod';

const ORDERTYPE = ['dine_in', 'take_out'];
const PAYMENTMETHOD = ['qris', 'cash', 'card'];
const ITEM_OBJECT = {
	id: z.string(),
	quantity: z.int(),
	notes: z.string(),
};

const AddNewOrderValidator = z.object({
	customer_name: z.string(),
	order_type: z.enum(ORDERTYPE),
	table_number: z.int(),
	payment_method: z.enum(PAYMENTMETHOD),
	items: z.array(z.object(ITEM_OBJECT)),
});

export {AddNewOrderValidator};
