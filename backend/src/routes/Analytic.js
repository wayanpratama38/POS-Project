import { AnalyticController } from '../controllers/Analytic.js'
import { Router } from 'express';
const AnalyticRouter = new Router();

AnalyticRouter.get('/api/analytics', AnalyticController.countRevenue)
export default AnalyticRouter;
