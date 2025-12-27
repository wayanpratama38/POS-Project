import {Router} from 'express';
import RefreshController from '../controllers/Refresh.js';

const RefreshRouter = Router();
RefreshRouter.post('/refresh', RefreshController.postRefreshToken);

export default RefreshRouter;
