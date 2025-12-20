import {Router} from 'express';
import {ProductController} from '../controllers/Product.js';

const ProductRouter = Router();

ProductRouter.post('/api/products', ProductController.addSingleProduct);
ProductRouter.post('/api/products/bulk', ProductController.addBulkProduct);
ProductRouter.get('/api/products', ProductController.getAllProduct);
ProductRouter.get('/api/products/:id', ProductController.getProductById);
ProductRouter.patch(
	'/api/products/:id',
	ProductController.updateProductInformation
);
ProductRouter.delete('/api/products/:id', ProductController.deleteProduct);

export default ProductRouter;
