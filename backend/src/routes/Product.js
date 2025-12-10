import {Router} from 'express';
import ProductController from '../controllers/Product.js';

const ProductRouter = Router();
const Controller = new ProductController();

ProductRouter.post('/products', Controller.addSingleProduct);
ProductRouter.post('/products/bulk', Controller.addBulkProduct);
ProductRouter.get('/products', Controller.getAllProduct);
ProductRouter.get('/products/:id', Controller.getProductById);
ProductRouter.patch('/products/:id', Controller.updateProductInformation);
ProductRouter.delete('/products/:id', Controller.deleteProduct);

export default ProductRouter;
