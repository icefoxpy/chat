import React, { useState, useRef, useEffect } from 'react';
import { Send, ShoppingCart, X } from 'lucide-react';
import { ChatMessage } from '../../types';
import { MessageBubble } from './MessageBubble';

interface ChatWindowProps {
  isOpen: boolean;
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
  isConnected: boolean;
  onClose: () => void;
  onCartToggle: () => void;
  cartCount: number;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({
  isOpen,
  messages,
  onSendMessage,
  isConnected,
  onClose,
  onCartToggle,
  cartCount
}) => {
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSend = () => {
    if (inputMessage.trim()) {
      onSendMessage(inputMessage);
      setInputMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 md:bottom-6 md:right-6 md:top-auto md:left-auto md:w-96 md:h-[600px] bg-white md:rounded-2xl shadow-2xl z-40 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 p-4 text-white relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img 
              src="/unnamed.png" 
              alt="Punto Farma" 
              className="w-8 h-8 rounded-full bg-white p-1"
            />
            <div>
              <h3 className="font-bold text-lg">Punto Farma</h3>
              <p className="text-sm opacity-90">
                {isConnected ? 'En línea' : 'Conectando...'}
              </p>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            {/* Cart Button */}
            <button
              onClick={onCartToggle}
              className="relative p-2 bg-white/20 rounded-md hover:bg-white/30 transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse font-bold">
                  {cartCount > 9 ? '9+' : cartCount}
                </div>
              )}
            </button>
            
            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 bg-white/20 rounded-md hover:bg-white/30 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {/* Animated dots */}
        <div className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-pulse"></div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-green-100 rounded-full mx-auto mb-4 flex items-center justify-center animate-bounce">
              <img src="/unnamed.png" alt="Punto Farma" className="w-8 h-8 rounded-full" />
            </div>
            <p>¡Hola! Soy tu asistente virtual de Punto Farma</p>
            <p className="text-sm">¿En qué puedo ayudarte hoy?</p>
          </div>
        )}
        
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t bg-white">
        <div className="flex space-x-2">
          <input
            ref={inputRef}
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Escribe tu mensaje..."
            disabled={!isConnected}
            className="flex-1 p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
          <button
            onClick={handleSend}
            disabled={!isConnected || !inputMessage.trim()}
            className="p-3 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-full hover:from-blue-700 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};