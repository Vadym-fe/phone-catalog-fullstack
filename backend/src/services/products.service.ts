import { readFile, writeFile } from "node:fs/promises";
import type { Product } from "../../../shared/types/Product";
import type { PaginatedResponse } from '../../../shared/types/PaginatedResponse';
import type { SortType } from '../../../shared/types/SortType';

export class ProductsService {
  private async readProducts(): Promise<Product[]> {
    const data = await readFile('./src/data/products.json', 'utf-8');
    return JSON.parse(data);
  }

  private sortProducts(products: Product[], sort: SortType): Product[] {
    const sortedProducts = [...products].sort((product1, product2) => {
      switch (sort) {
        case 'age':
          return product2.year - product1.year;

        case 'price':
          return product1.price - product2.price;

        case 'title':
          return product1.name.localeCompare(product2.name);

        default:
          return 0;
      }
    });

    return sortedProducts;
  }

  async getAll(
    limit: number,
    sort: SortType,
    page: number,
  ): Promise<PaginatedResponse<Product>> {
    const products: Product[] = await this.readProducts();

    const sortedProducts = this.sortProducts(products, sort);
    const offset = (page - 1) * limit;
    const newProducts = sortedProducts.slice(offset, offset + limit);

    return {
      data: newProducts,
      pagination: {
        page,
        limit,
        total: products.length,
        totalPages: Math.ceil(products.length / limit),
      },
    };
  }

  async create(newProduct: Omit<Product, 'id'>): Promise<Product> {
    const products: Product[] = await this.readProducts();

    const ids: number[] = products.map(product => product.id);
    const newId: number = Math.max(...ids) + 1;
    const productWithId: Product = {
      id: newId,
      ...newProduct,
    };

    products.push(productWithId);

    await writeFile(
      './src/data/products.json',
      JSON.stringify(products, null, 2),
    );

    return productWithId;
  }

  async update(
    productId: number,
    updatedData: Partial<Omit<Product, 'id'>>,
  ): Promise<Product | undefined> {
    const products: Product[] = await this.readProducts();
    const productIndex = products.findIndex(
      product => product.id === productId,
    );

    if (productIndex === -1) return undefined;

    const foundProduct = products[productIndex];

    const updatedProduct = {
      ...foundProduct,
      ...updatedData,
    };

    const updatedProductInArray = (products[productIndex] = updatedProduct);

    await writeFile(
      './src/data/products.json',
      JSON.stringify(products, null, 2),
    );

    return updatedProductInArray;
  }

  async delete(productId: number): Promise<boolean | undefined> {
    const products: Product[] = await this.readProducts();

    const deleteProducts = products.filter(product => product.id !== productId);

    if (deleteProducts.length === products.length) return undefined;

    await writeFile(
      './src/data/products.json',
      JSON.stringify(deleteProducts, null, 2),
    );

    return true;
  }

  async getById(productId: number): Promise<Product | undefined> {
    const products: Product[] = await this.readProducts();
    const foundProduct: Product | undefined = products.find(
      product => product.id === productId,
    );

    return foundProduct;
  }
}
