import {AuthService} from '../services/Auth.js';
import {JWTUtils} from '../utils/JWTutils.js';

const authMiddleware = async (req, res, next) => {
	const token = req.cookies.accessToken;
	if (!token)
		return res
			.status(401)
			.json({status: 'fail', message: 'Session Expired, Silakan login kembali'});

	try {
		const verify = JWTUtils.verifyAccesToken(token);
		const checkUser = await AuthService.isUserAvailable(verify.id);
		if (checkUser) {
			req.user = verify;
			next();
		}
	} catch (err) {
		return res.status(401).json({
			status: 'fail',
			message: 'Token invalid',
		});
	}
};

export default authMiddleware;
