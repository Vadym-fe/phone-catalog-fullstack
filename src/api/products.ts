import { Product } from '../../shared/types/Product';

export function getProducts(): Promise<Product[]> {
  return fetch('http://localhost:4200/api/products').then(response => {
    if (!response.ok) {
      throw new Error('Failed to load products');
    }

    return response.json();
  });
}

export function getSuggestedProducts(productId: string): Promise<Product[]> {
  return getProducts().then(response => {
    return [...response]
      .filter(product => {
        return product.itemId !== productId;
      })
      .sort(() => Math.random() - 0.5);
  });
}

export function createProduct(
  newProduct: Omit<Product, 'id'>,
): Promise<Product> {
  return fetch('http://localhost:4200/api/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newProduct),
  }).then(response => {
    if (!response.ok) {
      throw new Error('Failed to create products');
    }

    return response.json();
  });
}

export function updateProduct(
  id: number,
  updatedData: Partial<Omit<Product, 'id'>>,
): Promise<Product> {
  return fetch(`http://localhost:4200/api/products/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedData),
  }).then(response => {
    if (!response.ok) {
      throw new Error('Failed to update products');
    }

    return response.json();
  });
}

export async function deleteProduct(id: number): Promise<void> {
  return fetch(`http://localhost:4200/api/products/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(response => {
    if (!response.ok) {
      throw new Error('Failed to delete products');
    }
  });
}
