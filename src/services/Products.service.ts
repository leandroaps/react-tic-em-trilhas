import type { ProductProps } from '@/interfaces/Products.interface';
import httpCommons from '@/utils/http-commons';

const getAllProducts = async () => {
  const response = await httpCommons.get<ProductProps[]>('products');
  return response.data;
};

const searchProducts = async (name: string) => {
  // Fetch all products
  const response = await httpCommons.get<ProductProps[]>('products');

  // If no search term, return all products
  if (!name || name.trim() === '') {
    return response.data;
  }

  // Split search term into individual words and filter out empty strings
  const searchWords = name
    .toLowerCase()
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0);

  // Filter products where the product name contains ANY of the search words
  const filteredProducts = response.data.filter((product) => {
    const productName = product.name.toLowerCase();
    return searchWords.some((word) => productName.includes(word));
  });

  return filteredProducts;
};

const ProductServices = {
  getAllProducts,
  searchProducts,
};

export default ProductServices;
