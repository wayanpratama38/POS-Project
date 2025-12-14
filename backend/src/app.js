import Express from 'express';
import IndexedRoute from './routes/Index.js';
import AuthRouter from './routes/Auth.js';
import errorLog from './middlewares/ErrorLogMiddleware.js';
import authMiddleware from './middlewares/AuthMiddleware.js';

const app = new Express();
app.use(Express.json());

app.get('/', (req, res) => {
	res.json('Hello World!');
});

// Mount auth router
app.use(AuthRouter);
// Use Middleware for all route except AuthRouter.
app.use(authMiddleware);
// Mount all indexed route
app.use(IndexedRoute);

// Mount global error middleware
app.use(errorLog);
app.listen(process.env.LOCAL_PORT, 'localhost', () => {
	console.log(`Running at localhost:${process.env.LOCAL_PORT}`);
});
