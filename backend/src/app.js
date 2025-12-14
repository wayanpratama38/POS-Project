import Express from 'express';
import IndexedRoute from './routes/Index.js';
import AuthRouter from './routes/Auth.js';
import errorLog from './middlewares/ErrorLogMiddleware.js';

const app = new Express();
app.use(Express.json());

app.get('/', (req, res) => {
	res.json('Hello World!');
});

// Mount auth router
app.use(AuthRouter);
// Mount all indexed route
app.use(IndexedRoute);

// Mount global error middleware
app.use(errorLog);
app.listen(process.env.LOCAL_PORT, 'localhost', () => {
	console.log(`Running at localhost:${process.env.LOCAL_PORT}`);
});
