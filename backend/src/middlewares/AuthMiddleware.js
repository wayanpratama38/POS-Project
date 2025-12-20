import jwt from 'jsonwebtoken';
import {AuthService} from '../services/Auth.js';

const authMiddleware = async (req, res, next) => {
	const header = req.header('Authorization');
	const token = header && header.split(' ')[1];

	if (!token)
		return res.status(401).json({status: 'fail', message: 'Akses ditolak'});

	try {
		const verify = jwt.verify(token, process.env.JWT_SECRET_KEY);
		const checkUser = await AuthService.isUserAvailable(verify.id);

		if (checkUser) {
			req.user = verify;
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
