import type { ProductProps } from '@/interfaces/Products.interface';
import httpCommons from '@/utils/http-commons';

const getAllProducts = async () => {
  const response = await httpCommons.get<ProductProps[]>('products');

  return response.data;
};

export default getAllProducts;
