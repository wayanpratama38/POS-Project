import { Router } from 'express';
import { AuthController } from '../controllers/Auth.js';

const AuthRouter = new Router();

AuthRouter.post('/api/users/register', AuthController.registerUser);
AuthRouter.post('/api/users/login', AuthController.loginUser);
AuthRouter.post('/api/users/logout', AuthController.logoutUser);

export default AuthRouter;
