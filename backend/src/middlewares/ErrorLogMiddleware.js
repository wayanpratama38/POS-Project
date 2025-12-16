import {z} from 'zod';

const errorLog = (err, req, res, next) => {
	// console.log(err.stack);
	// console.log(err.issues[0].code);
	const statusCode = err.statusCode || 500;
	const message = err.message || 'Internal Server Error';

	if (err instanceof z.ZodError) {
		return res.status(400).json({
			status: 'fail',
			message: `Terjadi masalah ${err.issues[0].code}, pada ${err.issues[0].path} karena memerlukan tipe data ${err.issues[0].expected}`,
		});
	}

	return res.status(statusCode).json({
		status: 'fail',
		message: message,
	});
};

export default errorLog;
