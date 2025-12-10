import {z} from 'zod';

const RegisterValidator = z.json({
	fullname: z.string(),
	username: z.string(),
	password: z.string().min(8),
});

const LoginValidator = z.json({
	username: z.string(),
	password: z.string().min(8),
});

export {RegisterValidator, LoginValidator};
