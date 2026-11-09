import { readFile, writeFile } from "node:fs/promises";
import type { Product } from "../../../shared/types/Product";

export class ProductsService {
  async getAll() {
    const data = await readFile('./src/data/products.json', 'utf-8');
    const products: Product[] = JSON.parse(data);

    return products;
  }

  async create(newProduct: Omit<Product, 'id'>) {
    const data = await readFile('./src/data/products.json', 'utf-8');
    const products: Product[] = JSON.parse(data);

    const ids: number[] = products.map(product => product.id);
    const newId: number = Math.max(...ids) + 1;
    const productWithId: Product = {
      id: newId,
      ...newProduct,
    };

    products.push(productWithId);

    await writeFile('./src/data/products.json', JSON.stringify(products, null, 2));

    return productWithId;
  }

  async update(
    productId: number,
    updatedData: Partial<Omit<Product, 'id'>>
  ) {
    const products = await this.getAll();
    const productIndex = products.findIndex(product => product.id === productId);

    if (productIndex === -1) return undefined;

    const foundProduct = products[productIndex];

    const updatedProduct = {
      ...foundProduct,
      ...updatedData,
    };

    const updatedProductInArray = (products[productIndex] = updatedProduct);

    await writeFile('./src/data/products.json', JSON.stringify(products, null, 2));

    return updatedProductInArray;
  }

  async delete(productId: number) {
    const products = await this.getAll();
    const productIndex = products.findIndex(product => product.id === productId);

    if (productIndex === -1) return undefined;

    const spliceProducts = products.splice(productIndex, 1);

    await writeFile('./src/data/products.json', JSON.stringify(products, null, 2));

    return spliceProducts;
  }

  async getById(productId: number) {
    const products = await this.getAll();
    const foundProduct: Product | undefined = products.find(product => product.id === productId);

    return foundProduct;
  }
}
