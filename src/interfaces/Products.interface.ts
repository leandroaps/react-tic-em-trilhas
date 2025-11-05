export interface ProductProps {
  id: number;
  title: string;
  description?: string;
  price: number;
  quantity: number;
  category: string;
  image: string;
}

export interface Product {
  item: ProductProps;
}
