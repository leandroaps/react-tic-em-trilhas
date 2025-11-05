import type {
  ListItem,
  ShoppingCartListIContextData,
  ShoppingCartProviderProps,
} from '@/interfaces/ShoppingCart.interface';
import { createContext, useEffect, useState } from 'react';

const ShoppingCartContextDefaultValue: ShoppingCartListIContextData = {
  items: [],
  totalSumAmount: 0,
  totalQuantity: 0,
  addProduct: () => {},
  onRemove: () => {},
  onDecrease: () => {},
};

// eslint-disable-next-line react-refresh/only-export-components
export const ShoppingCartContext = createContext<ShoppingCartListIContextData>(
  ShoppingCartContextDefaultValue
);

const STORAGE_KEY = 'shopping-cart-items';

export const ShoppingCartProvider = ({
  children,
}: ShoppingCartProviderProps) => {
  const [items, setItems] = useState<ListItem[]>(() => {
    try {
      const storedItems = localStorage.getItem(STORAGE_KEY);
      return storedItems ? JSON.parse(storedItems) : [];
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [items]);

  const totalSumAmount = items.reduce((sum, item) => sum + item.amount, 0);
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  const addProduct = (id: number, name: string, price: number) => {
    const productAlreadyInCart = items.find(product => product.id === id);

    if (!productAlreadyInCart) {
      const item: ListItem = {
        id: id,
        name: name,
        amount: price,
        unitPrice: price,
        quantity: 1,
      };

      return setItems([...items, item]);
    }

    if (productAlreadyInCart) {
      const updateCart = items.map(cartItem => {
        return cartItem.id === id
          ? {
              ...cartItem,
              quantity: Number(cartItem.quantity) + 1,
              amount: cartItem.amount + price,
            }
          : cartItem;
      });

      return setItems(updateCart);
    }
  };

  const onRemove = (id: number) => {
    const updatedCart = items.filter(item => item.id !== id);
    setItems(updatedCart);
  };

  const onDecrease = (id: number, price: number) => {
    const updatedCart = items
      .map(cartItem => {
        if (cartItem.id === id) {
          const newQuantity = cartItem.quantity - 1;
          if (newQuantity <= 0) {
            return null;
          }
          return {
            ...cartItem,
            quantity: newQuantity,
            amount: cartItem.amount - price,
          };
        }
        return cartItem;
      })
      .filter((item): item is ListItem => item !== null);

    setItems(updatedCart);
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        items: items,
        totalSumAmount,
        totalQuantity,
        addProduct,
        onRemove,
        onDecrease,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};
