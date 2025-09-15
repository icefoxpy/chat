import React from 'react';
import { MessageCircle, X } from 'lucide-react';

interface ChatButtonProps {
  isOpen: boolean;
  onClick: () => void;
  cartCount: number;
}

export const ChatButton: React.FC<ChatButtonProps> = ({ isOpen, onClick, cartCount }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 animate-pulse"
    >
      <div className="relative flex items-center justify-center w-full h-full">
        <MessageCircle className="w-5 h-5 text-white" />
        {cartCount > 0 && (
          <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-bounce font-bold">
            {cartCount > 99 ? '99+' : cartCount}
          </div>
        )}
      </div>
    </button>
  );
};