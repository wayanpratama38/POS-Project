import {Router} from 'express';
import {AuthController} from '../controllers/Auth.js';

const AuthRouter = Router();

AuthRouter.post('/api/users/register', AuthController.registerUser);
AuthRouter.post('/api/users/login', AuthController.loginUser);

export default AuthRouter;
