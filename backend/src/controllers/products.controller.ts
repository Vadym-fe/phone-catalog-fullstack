import type { NextFunction, Request, Response } from 'express';
import { ProductsService } from '../services/products.service';
import { limitSchema, pageSchema, productIdSchema, productSchema, sortSchema, updateProductSchema } from '../validation/product.schema';
import { AppError } from '../middlewares/app-error';

const service = new ProductsService();

export async function getProducts(req: Request, res: Response, next: NextFunction) {
  try {
    const limit = limitSchema.safeParse(req.query.limit);
    const sort = sortSchema.safeParse(req.query.sort);
    const page = pageSchema.safeParse(req.query.page);

    if (!limit.success || !sort.success || !page.success) {
      throw new AppError('Invalid pagination or sorting parameters', 400);
    }

    const products = await service.getAll(limit.data, sort.data, page.data);

    res.json(products);
  } catch (error) {
    next(error);
  }
}

export async function createProduct(req: Request, res: Response, next: NextFunction) {
  try {
    const result = productSchema.safeParse(req.body);

    if (!result.success) {
      throw new AppError(result.error.message, 400);
    }

    const newProductWithId = await service.create(result.data);

    res.status(201).json(newProductWithId)
  } catch (error) {
    next(error);
  };
}

export async function updatedProduct(req: Request, res: Response, next: NextFunction) {
  try {
    const resultProduct = updateProductSchema.safeParse(req.body);

    if (!resultProduct.success) {
      throw new AppError(resultProduct.error.message, 400);
    } else if (Object.keys(req.body).length === 0) {
      throw new AppError('No fields to update', 400);
    }

    const resultParamId = productIdSchema.safeParse(req.params.id);

    if (!resultParamId.success) {
      throw new AppError(resultParamId.error.message, 400);
    }

    const newUpdatedProduct = await service.update(resultParamId.data, resultProduct.data);

    if (newUpdatedProduct === undefined) {
      throw new AppError('Product not found', 404);
    }

    res.status(200).json(newUpdatedProduct);
  } catch (error) {
    next(error);
  }
}

export async function deleteProduct(req: Request, res: Response, next: NextFunction) {
  try {
    const result = productIdSchema.safeParse(req.params.id);

    if (!result.success) {
      throw new AppError(result.error.message, 400)
    }

    const newProducts = await service.delete(result.data);

    if (newProducts === undefined) {
      throw new AppError('Product not found', 404);
    }

    return res.status(204).end();
  } catch (error) {
    next(error);
  }
}

export async function getProductById(req: Request, res: Response, next: NextFunction) {
  try {
    const result = productIdSchema.safeParse(req.params.id);

    if (!result.success) {
      throw new AppError(result.error.message, 400);
    }

    const product = await service.getById(result.data);

    if (!product) {
      throw new AppError('Product not found', 404);
    }

    res.json(product)
  } catch (error) {
    next(error);
  }
}
