import express from 'express';
import { addProducts, deleteProductsById, getProducts, getProductsById, updateProductsById} from '../controller/product.controller.js';

const router = express.Router();
 
//Add product Router

router.post('/add', addProducts);

// Get Products Router

router.get('/get', getProducts);

// Get Products byId Router(search)
router.get('/:id', getProductsById);

//Update ById 
router.put('/:id', updateProductsById);

//Delete ById
router.delete('/:id', deleteProductsById)

export default router ;