import type {
  ProductProps,
  ProductsResponse,
} from '@/interfaces/Products.interface';
import httpCommons from '@/utils/http-commons';

const getAllProducts = async () => {
  const response = await httpCommons.get<ProductsResponse>('products');
  const { products } = response.data;

  return products;
};

const searchProducts = async (title: string) => {
  // Fetch all products
  const response = await httpCommons.get<ProductsResponse>('products');

  // If no search term, return all products
  if (!title || title.trim() === '') {
    return response.data.products;
  }

  // Split search term into individual words and filter out empty strings
  const searchWords = title
    .toLowerCase()
    .trim()
    .split(/\s+/)
    .filter(word => word.length > 0);

  // Filter products where the product name contains ANY of the search words
  const filteredProducts = response.data.products.filter(product => {
    const productName = product.title.toLowerCase();
    return searchWords.some(word => productName.includes(word));
  });

  return filteredProducts;
};

const getProductById = async (id: number) => {
  const response = await httpCommons.get<ProductProps>(`products/${id}`);
  return response.data;
};

const ProductServices = {
  getAllProducts,
  searchProducts,
  getProductById,
};

export default ProductServices;
