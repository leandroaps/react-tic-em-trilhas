export interface ProductProps {
  id: number;
  title: string;
  description?: string;
  price: number;
  stock: number;
  category: string;
  images: string[];
}

export interface Product {
  item: ProductProps;
}

export interface ProductsResponse {
  products: ProductProps[];
  total?: number;
  skip?: number;
  limit?: number;
}
