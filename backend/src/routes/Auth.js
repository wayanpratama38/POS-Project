import {Router} from 'express';
import AuthController from '../controllers/Auth.js';

const AuthRouter = Router();
const Controller = new AuthController();

AuthRouter.post('/users/register', Controller.registerUser);
AuthRouter.post('/users/login', Controller.loginUser);

export default AuthRouter;
