import React from 'react';
import { ShoppingBag, Minus, Plus } from 'lucide-react';
import { CartMessage } from '../../types';

interface CartDisplayProps {
  cart: CartMessage;
}

export const CartDisplay: React.FC<CartDisplayProps> = ({ cart }) => {
  const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-sm">
      <div className="bg-gradient-to-r from-green-600 to-blue-600 p-3 text-white">
        <div className="flex items-center space-x-2">
          <ShoppingBag className="w-5 h-5" />
          <h3 className="font-bold">Tu Carrito</h3>
          <span className="bg-white/20 px-2 py-1 rounded-full text-xs">
            {totalItems} {totalItems === 1 ? 'item' : 'items'}
          </span>
        </div>
      </div>

      <div className="p-4">
        {cart.items.length === 0 ? (
          <p className="text-gray-500 text-center py-4">Tu carrito está vacío</p>
        ) : (
          <div className="space-y-3">
            {cart.items.map((item) => (
              <div key={item.id} className="flex items-center justify-between py-2 border-b border-gray-100">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-800 text-sm">{item.name}</h4>
                  <p className="text-xs text-gray-500">
                    ${item.price} {item.currency}
                  </p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1 bg-gray-100 rounded-full">
                    <button className="p-1 hover:bg-gray-200 rounded-full transition-colors">
                      <Minus className="w-3 h-3 text-gray-600" />
                    </button>
                    <span className="px-2 text-sm font-medium">{item.quantity}</span>
                    <button className="p-1 hover:bg-gray-200 rounded-full transition-colors">
                      <Plus className="w-3 h-3 text-gray-600" />
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
            
            <div className="pt-3 border-t-2 border-green-200">
              <div className="flex items-center justify-between">
                <span className="font-bold text-gray-800">Total:</span>
                <span className="text-xl font-bold text-green-600">
                  ${cart.total.toFixed(2)} USD
                </span>
              </div>
              
              <button className="w-full mt-3 bg-gradient-to-r from-green-600 to-green-700 text-white py-2 rounded-lg hover:from-green-700 hover:to-green-800 transition-all transform hover:scale-105 font-medium">
                Proceder al Pago
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};