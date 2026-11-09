import type { Request, Response } from 'express';
import { ProductsService } from '../services/products.service';
import { Product } from '../../../shared/types/Product';

const service = new ProductsService();

export async function getProducts(_req: Request, res: Response) {
  try {
    const products = await service.getAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read products data' });
  }
}

export async function createProduct(req: Request, res: Response) {
  try {
    const newProduct = req.body;
    const newProductWithId = await service.create(newProduct);

    res.status(201).json(newProductWithId)
  } catch (error) {
    res.status(500).json({ message: 'Failed to create product.' });
  };
}

export async function updatedProduct(req: Request, res: Response) {
  try {
    const productForUpdate: Partial<Omit<Product, 'id'>> = req.body;
    const getParamId = Number(req.params.id);
    const newUpdatedProduct = await service.update(getParamId, productForUpdate);

    if (!newUpdatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(newUpdatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update product.' });
  }
}

export async function deleteProduct(req: Request, res: Response) {
  try {
    const getParamId = Number(req.params.id);
    const newProducts = await service.delete(getParamId);

    if (!newProducts) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(newProducts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete product' });
  }
}

export async function getProductById(req: Request, res: Response) {
  try {
    const getParamId = Number(req.params.id);
    const product = await service.getById(getParamId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(product)
  } catch (error) {
    res.status(500).json({ message: 'Failed to get product' });
  }
}
