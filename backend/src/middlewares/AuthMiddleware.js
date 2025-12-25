import { AuthService } from '../services/Auth.js';
import { JWTUtils } from '../utils/JWTutils.js';


const authMiddleware = async (req, res, next) => {
  // const header = req.header('Authorization');
  // const token = header && header.split(' ')[1];
  const token = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;
  console.log(token, refreshToken)
  if (!token) return res.status(401).json({ status: 'fail', message: 'Session Expired, Silakan login kembali' })


  try {
    const verify = JWTUtils.verifyAccesToken(token)
    console.log("verify", verify)
    const checkUser = await AuthService.isUserAvailable(verify.id);
    console.log("check user", checkUser)
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
