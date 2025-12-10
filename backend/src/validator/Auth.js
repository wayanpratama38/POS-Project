import {z} from 'zod';

const RegisterValidator = z.object({
	fullname: z.string(),
	username: z.string(),
	password: z.string().min(8),
});

const LoginValidator = z.object({
	username: z.string(),
	password: z.string().min(8),
});

export {RegisterValidator, LoginValidator};
