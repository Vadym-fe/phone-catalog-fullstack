import { Router } from "express";
import { createProduct, deleteProduct, getProductById, getProducts, updatedProduct } from "../controllers/products.controller";

const router = Router();

router.get('/', getProducts);

router.get('/:id', getProductById);

router.post('/', createProduct);

router.patch('/:id', updatedProduct);

router.delete('/:id', deleteProduct);

export default router;
