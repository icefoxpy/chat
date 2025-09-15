import React from 'react';
import { ChatMessage, WebSocketMessage } from '../../types';
import { ProductCarousel } from '../Products/ProductCarousel';
import { CartDisplay } from '../Cart/CartDisplay';

interface MessageBubbleProps {
  message: ChatMessage;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  const isCarouselMessage = typeof message.content === 'object' && message.content.type === 'carousel';

  const renderContent = () => {
    if (typeof message.content === 'string') {
      return (
        <div className="prose prose-sm max-w-none text-white">
          <div dangerouslySetInnerHTML={{ __html: formatMessage(message.content) }} />
        </div>
      );
    }

    const wsMessage = message.content as WebSocketMessage;

    switch (wsMessage.type) {
      case 'message':
        return (
          <div className="prose prose-sm max-w-none text-white">
            <div dangerouslySetInnerHTML={{ __html: formatMessage(wsMessage.message) }} />
          </div>
        );
      
      case 'carousel':
        return <ProductCarousel products={wsMessage.products} />;
      
      case 'cart':
        return <CartDisplay cart={wsMessage} />;
      
      default:
        return <div className="text-white">Mensaje no reconocido</div>;
    }
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-slideInUp`}>
      <div
        className={`max-w-xs md:max-w-md p-3 rounded-2xl shadow-lg transition-all ${!isCarouselMessage ? 'transform hover:scale-105' : ''} ${
          isUser
            ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-br-sm'
            : 'bg-gradient-to-r from-green-600 to-green-700 text-white rounded-bl-sm'
        }`}
      >
        {renderContent()}
        
        <div className={`text-xs mt-2 opacity-70 ${isUser ? 'text-right' : 'text-left'}`}>
          {message.timestamp.toLocaleTimeString('es-ES', {
            hour: '2-digit',
            minute: '2-digit'
          })}
        </div>
      </div>
    </div>
  );
};

const formatMessage = (text: string): string => {
  // Convert URLs to links
  text = text.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" class="underline">$1</a>');
  
  // Convert *text* to bold
  text = text.replace(/\*(.*?)\*/g, '<strong>$1</strong>');
  
  // Convert line breaks
  text = text.replace(/\n/g, '<br>');
  
  return text;
};