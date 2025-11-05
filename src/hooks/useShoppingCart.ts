import { ShoppingCartContext } from '@/contexts/ShoppingCart.context';
import { useContext } from 'react';

export const useShoppingCart = () => useContext(ShoppingCartContext);
