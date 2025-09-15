export interface Product {
  id: string;
  name: string;
  image_url: string;
  price: number;
  currency: string;
  description: string;
}

export interface CartItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  currency: string;
}

export interface CartData {
  cart_id: string;
  user_id: string;
  items: CartItem[];
  total: number;
}

export interface CarouselMessage {
  type: 'carousel';
  products: Product[];
}

export interface FunctionMessage {
  type: 'function';
  name: string;
  args: {
    product_id: string;
    quantity: number;
    user_id: string;
  };
}

export interface TextMessage {
  type: 'message';
  message: string;
}

export interface CartMessage {
  type: 'cart';
  cart_id: string;
  user_id: string;
  items: CartItem[];
  total: number;
}

export type WebSocketMessage = CarouselMessage | FunctionMessage | TextMessage | CartMessage;

export interface ChatMessage {
  id: string;
  content: string | WebSocketMessage;
  sender: 'user' | 'bot';
  timestamp: Date;
}