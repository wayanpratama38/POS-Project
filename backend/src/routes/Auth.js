import {Router} from 'express';
import AuthController from '../controllers/Auth.js';

const AuthRouter = Router();
const Controller = new AuthController();

AuthRouter.post('/register', Controller.registerUser);
AuthRouter.post('/login', Controller.loginUser);

export default AuthRouter;
