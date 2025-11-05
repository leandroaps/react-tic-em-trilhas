export interface ShoppingCartProviderProps {
  children: React.ReactNode;
}

export interface ListItem {
  id: number;
  title: string;
  quantity: number;
  unitPrice: number;
  amount: number;
}

export interface ShoppingCartListIContextData {
  items: ListItem[];
  totalSumAmount: number;
  totalQuantity: number;
  addProduct: (id: number, title: string, price: number) => void;
  onRemove: (id: number) => void;
  onDecrease: (id: number, price: number) => void;
}
