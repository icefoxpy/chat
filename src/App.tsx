import React from 'react';
import { ChatButton } from './components/Chat/ChatButton';
import { ChatWindow } from './components/Chat/ChatWindow';
import { CartSidebar } from './components/Cart/CartSidebar';
import { useChat } from './hooks/useChat';
import { useCart } from './hooks/useCart';

function App() {
  const {
    cart,
    isCartOpen,
    addToCart,
    removeFromCart,
    updateCart,
    toggleCart,
    getTotalItems
  } = useCart();

  const handleCartUpdate = (cartData: any) => {
    updateCart(cartData);
  };

  const handleAddToCart = (args: any) => {
    // This would normally get product details from the server
    // For now, we'll use dummy data
    addToCart(args.product_id, args.quantity, `Producto ${args.product_id}`, 25.00);
  };

  const {
    messages,
    isOpen,
    isConnected,
    sendMessage,
    toggleChat
  } = useChat(handleCartUpdate, handleAddToCart);

  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId, 999); // Remove all
    } else {
      const currentItem = cart.items.find(item => item.id === productId);
      if (currentItem) {
        const diff = newQuantity - currentItem.quantity;
        if (diff > 0) {
          addToCart(productId, diff, currentItem.name, currentItem.price, currentItem.currency);
        } else {
          removeFromCart(productId, Math.abs(diff));
        }
      }
    }
  };

  const handleRemoveItem = (productId: string) => {
    removeFromCart(productId, 999); // Remove all quantity
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Main content area - just white background as requested */}
      <div className="flex items-center justify-center min-h-screen text-gray-400">
        <div className="text-center">
          <img 
            src="/unnamed.png" 
            alt="Punto Farma" 
            className="w-24 h-24 mx-auto mb-4 opacity-50"
          />
          <p>Chat flotante de Punto Farma cargado</p>
          <p className="text-sm mt-2">Haz clic en el botón de chat para comenzar</p>
        </div>
      </div>

      {/* Chat Components */}
      {!isOpen && (
        <ChatButton 
          isOpen={isOpen} 
          onClick={toggleChat} 
          cartCount={getTotalItems()}
        />
      )}
      
      <ChatWindow
        isOpen={isOpen}
        messages={messages}
        onSendMessage={sendMessage}
        isConnected={isConnected}
        onClose={toggleChat}
        onCartToggle={toggleCart}
        cartCount={getTotalItems()}
      />
      
      <CartSidebar
        isOpen={isCartOpen}
        onClose={toggleCart}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />
      
      {/* Custom Styles */}
      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slideInUp {
          animation: slideInUp 0.3s ease-out;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 6px;
        }
        
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #3B82F6, #10B981);
          border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #2563EB, #059669);
        }
      `}</style>
    </div>
  );
}

export default App;