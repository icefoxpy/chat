import React from 'react';
import { X, ShoppingBag, Trash2, Plus, Minus } from 'lucide-react';
import { CartData } from '../../types';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartData;
  onUpdateQuantity: (productId: string, newQuantity: number) => void;
  onRemoveItem: (productId: string) => void;
}

export const CartSidebar: React.FC<CartSidebarProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem
}) => {
  const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 p-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <ShoppingBag className="w-6 h-6" />
              <div>
                <h2 className="text-lg font-bold">Tu Carrito</h2>
                <p className="text-sm opacity-90">
                  {totalItems} {totalItems === 1 ? 'producto' : 'productos'}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {cart.items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">
                Tu carrito está vacío
              </h3>
              <p className="text-gray-500">
                Agrega productos para comenzar tu compra
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.items.map((item) => (
                <div key={item.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800">{item.name}</h4>
                      <p className="text-sm text-gray-500">
                        ${item.price} {item.currency}
                      </p>
                    </div>
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="p-1 bg-gray-200 hover:bg-gray-300 rounded-full transition-colors"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-3 py-1 bg-white rounded-full font-medium min-w-[40px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="p-1 bg-gray-200 hover:bg-gray-300 rounded-full transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="text-right">
                      <p className="font-bold text-green-600">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.items.length > 0 && (
          <div className="border-t bg-white p-4">
            <div className="mb-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between text-lg">
                <span className="font-bold text-gray-800">Total:</span>
                <span className="text-2xl font-bold text-green-600">
                  ${cart.total.toFixed(2)} USD
                </span>
              </div>
            </div>
            
            <button className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 rounded-lg hover:from-green-700 hover:to-green-800 transition-all transform hover:scale-105 font-bold text-lg">
              Proceder al Pago 💳
            </button>
            
            <button 
              onClick={onClose}
              className="w-full mt-2 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Continuar Comprando
            </button>
          </div>
        )}
      </div>
    </>
  );
};