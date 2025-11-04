export interface ShoppingCartProviderProps {
  children: React.ReactNode;
}

export interface ListItem {
  id: number;
  name: string;
  quantity: number;
  unitPrice: number;
  amount: number;
}

export interface ShoppingCartListIContextData {
  item: ListItem[];
  totalSumAmount: number;
  totalQuantity: number;
  addProduct: (id: number, name: string, price: number) => void;
  onRemove: (id: number) => void;
  onDecrease: (id: number, price: number) => void;
}
