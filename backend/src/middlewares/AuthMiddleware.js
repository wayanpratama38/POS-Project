import jwt from 'jsonwebtoken';
import AuthService from '../services/Auth.js';

const authMiddleware = async (req, res, next) => {
	const header = req.header('Authorization');
	const token = header && header.split(' ')[1];

	if (!token)
		return res.status(401).json({status: 'fail', message: 'Akses ditolak'});

	try {
		const decode = jwt.decode(token, process.env.JWT_SECRET_KEY);
		const service = new AuthService();
		const checkUser = await service.isUserAvailable(decode.id);

		if (checkUser) {
			req.user = decode;
			next();
		}
	} catch (err) {
		res.status(400).json({
			status: 'fail',
			message: 'Token invalid',
		});
	}
};

export default authMiddleware;
