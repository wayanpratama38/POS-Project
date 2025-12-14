import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
	const token = req.header('Authorization');
	if (!token)
		return res.status(401).json({status: 'fail', message: 'Akses ditolak'});

	try {
		const decode = jwt.decode(token, process.env.JWT_SECRET_KEY);
		req.user = decode;
		next();
	} catch (err) {
		res.status(400).json({
			status: 'fail',
			message: 'Token invalid',
		});
	}
};

export default authMiddleware;
