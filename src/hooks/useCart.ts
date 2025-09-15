import { useState, useCallback } from 'react';
import { CartItem, CartData } from '../types';

export const useCart = () => {
  const [cart, setCart] = useState<CartData>({
    cart_id: '',
    user_id: '98765',
    items: [],
    total: 0
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = useCallback((productId: string, quantity: number = 1, name: string, price: number, currency: string = 'USD') => {
    setCart(prevCart => {
      const existingItem = prevCart.items.find(item => item.id === productId);
      let newItems: CartItem[];

      if (existingItem) {
        newItems = prevCart.items.map(item =>
          item.id === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        newItems = [...prevCart.items, { id: productId, name, quantity, price, currency }];
      }

      const newTotal = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

      return {
        ...prevCart,
        items: newItems,
        total: Number(newTotal.toFixed(2))
      };
    });
  }, []);

  const removeFromCart = useCallback((productId: string, quantityToRemove: number = 1) => {
    setCart(prevCart => {
      const newItems = prevCart.items.reduce((acc: CartItem[], item) => {
        if (item.id === productId) {
          const newQuantity = item.quantity - quantityToRemove;
          if (newQuantity > 0) {
            acc.push({ ...item, quantity: newQuantity });
          }
        } else {
          acc.push(item);
        }
        return acc;
      }, []);

      const newTotal = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

      return {
        ...prevCart,
        items: newItems,
        total: Number(newTotal.toFixed(2))
      };
    });
  }, []);

  const updateCart = useCallback((cartData: CartData) => {
    setCart(cartData);
  }, []);

  const toggleCart = useCallback(() => {
    setIsCartOpen(prev => !prev);
  }, []);

  const getTotalItems = useCallback(() => {
    return cart.items.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart.items]);

  return {
    cart,
    isCartOpen,
    addToCart,
    removeFromCart,
    updateCart,
    toggleCart,
    getTotalItems
  };
};