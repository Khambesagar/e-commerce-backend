import express from "express";
import { addToCart,  clearCart,  decreaseProductQty,  productRemoveFromCart, userCart } from "../controller/cart.controller.js";

const router = express.Router();

//Add to cart
router.post('/add', addToCart);

//Get User Cart
router.get('/get', userCart);

//Remove product from cart
router.delete('/:productId', productRemoveFromCart);

//Cleare Cart
router.delete('/clear', clearCart);

//Decreasee product qty
router.post('/decrease', decreaseProductQty);

export default router;