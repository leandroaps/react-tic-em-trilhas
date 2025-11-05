import { ShoppingCartProvider } from '@/contexts/ShoppingCart.context';
import type { ListItem } from '@/interfaces/ShoppingCart.interface';
import { renderHook, waitFor } from '@testing-library/react';
import { act } from 'react';
import { beforeEach, describe, expect, it } from 'vitest';
import { useShoppingCart } from '../useShoppingCart';

describe('useShoppingCart', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should initialize with empty cart', () => {
    const { result } = renderHook(() => useShoppingCart(), {
      wrapper: ShoppingCartProvider,
    });

    expect(result.current.items).toEqual([]);
    expect(result.current.totalQuantity).toBe(0);
    expect(result.current.totalSumAmount).toBe(0);
  });

  it('should add product to cart', () => {
    const { result } = renderHook(() => useShoppingCart(), {
      wrapper: ShoppingCartProvider,
    });

    act(() => {
      result.current.addProduct(1, 'Test Product', 100);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0]).toEqual({
      id: 1,
      title: 'Test Product',
      quantity: 1,
      unitPrice: 100,
      amount: 100,
    });
    expect(result.current.totalQuantity).toBe(1);
    expect(result.current.totalSumAmount).toBe(100);
  });

  it('should increase quantity when adding existing product', () => {
    const { result } = renderHook(() => useShoppingCart(), {
      wrapper: ShoppingCartProvider,
    });

    act(() => {
      result.current.addProduct(1, 'Test Product', 100);
    });

    act(() => {
      result.current.addProduct(1, 'Test Product', 100);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0]?.quantity).toBe(2);
    expect(result.current.items[0]?.amount).toBe(200);
    expect(result.current.totalQuantity).toBe(2);
    expect(result.current.totalSumAmount).toBe(200);
  });

  it('should remove product from cart', () => {
    const { result } = renderHook(() => useShoppingCart(), {
      wrapper: ShoppingCartProvider,
    });

    act(() => {
      result.current.addProduct(1, 'Test Product', 100);
      result.current.onRemove(1);
    });

    expect(result.current.items).toHaveLength(0);
    expect(result.current.totalQuantity).toBe(0);
    expect(result.current.totalSumAmount).toBe(0);
  });

  it('should decrease product quantity', () => {
    const { result } = renderHook(() => useShoppingCart(), {
      wrapper: ShoppingCartProvider,
    });

    act(() => {
      result.current.addProduct(1, 'Test Product', 100);
    });

    act(() => {
      result.current.addProduct(1, 'Test Product', 100);
    });

    act(() => {
      result.current.onDecrease(1, 100);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0]?.quantity).toBe(1);
    expect(result.current.items[0]?.amount).toBe(100);
  });

  it('should remove product when decreasing quantity to zero', () => {
    const { result } = renderHook(() => useShoppingCart(), {
      wrapper: ShoppingCartProvider,
    });

    act(() => {
      result.current.addProduct(1, 'Test Product', 100);
      result.current.onDecrease(1, 100);
    });

    expect(result.current.items).toHaveLength(0);
  });

  it('should persist cart to localStorage', async () => {
    const { result } = renderHook(() => useShoppingCart(), {
      wrapper: ShoppingCartProvider,
    });

    act(() => {
      result.current.addProduct(1, 'Test Product', 100);
    });

    await waitFor(() => {
      const stored = localStorage.getItem('shopping-cart-items');
      expect(stored).toBeTruthy();
      const parsed = JSON.parse(stored!) as ListItem[];
      expect(parsed).toHaveLength(1);
      expect(parsed[0]?.id).toBe(1);
    });
  });
});
