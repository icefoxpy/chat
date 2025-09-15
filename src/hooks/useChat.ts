import { useState, useCallback, useEffect } from 'react';
import { ChatMessage, WebSocketMessage } from '../types';
import { WebSocketEmulator } from '../services/websocketEmulator';

export const useChat = (onCartUpdate?: (cartData: any) => void, onAddToCart?: (args: any) => void) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [ws, setWs] = useState<WebSocketEmulator | null>(null);

  const generateMessageId = () => `msg_${Date.now()}_${Math.random()}`;

  const executeFunction = useCallback((json: WebSocketMessage) => {
    if (json.type === 'function') {
      switch (json.name) {
        case 'addToCart':
          onAddToCart?.(json.args);
          break;
        case 'removeFromCart':
          // Handle remove from cart
          break;
      }
    }
  }, [onAddToCart]);

  const addMessage = useCallback((content: string | WebSocketMessage, sender: 'user' | 'bot') => {
    const message: ChatMessage = {
      id: generateMessageId(),
      content,
      sender,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, message]);
    
    // Handle special message types
    if (typeof content === 'object') {
      if (content.type === 'cart') {
        onCartUpdate?.(content);
      } else if (content.type === 'function') {
        executeFunction(content);
      }
    }
  }, [onCartUpdate, executeFunction]);

  const connect = useCallback(() => {
    if (ws) return;

    const websocket = new WebSocketEmulator(`ws://${window.location.host}/ai/ie4WuWIKywN8`);
    
    websocket.onopen = () => {
      setIsConnected(true);
      addMessage('¡Conectado! ¿En qué puedo ayudarte hoy? 👋', 'bot');
    };

    websocket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data) as WebSocketMessage;
        addMessage(data, 'bot');
      } catch (error) {
        addMessage(event.data, 'bot');
      }
    };

    websocket.onerror = (error) => {
      console.error('WebSocket error:', error);
      addMessage('Error de conexión', 'bot');
    };

    websocket.onclose = () => {
      setWs(null);
      setIsConnected(false);
    };

    setWs(websocket);
  }, [ws, addMessage]);

  const sendMessage = useCallback((message: string) => {
    if (message.trim() && ws && isConnected) {
      addMessage(message, 'user');
      ws.send(message);
    }
  }, [ws, isConnected, addMessage]);

  const toggleChat = useCallback(() => {
    setIsOpen(prev => {
      if (!prev && !ws) {
        connect();
      }
      return !prev;
    });
  }, [ws, connect]);

  const disconnect = useCallback(() => {
    ws?.close();
    setWs(null);
    setIsConnected(false);
  }, [ws]);

  return {
    messages,
    isOpen,
    isConnected,
    sendMessage,
    toggleChat,
    disconnect
  };
};