import { ShoppingCartContext } from '@/contexts/ShoppingCart.context';
import { useContext } from 'react';

export const useShoppingCart = () => {
  const context = useContext(ShoppingCartContext);

  if (!context) {
    throw new Error(
      'useShoppingCart must be used within a ShoppingCartProvider'
    );
  }

  return context;
};
