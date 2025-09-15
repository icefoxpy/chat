import { WebSocketMessage } from '../types';

export class WebSocketEmulator {
  private callbacks: {
    onopen?: () => void;
    onmessage?: (event: { data: string }) => void;
    onerror?: (error: any) => void;
    onclose?: () => void;
  } = {};

  private isConnected = false;
  private messageQueue: string[] = [];

  constructor(private url: string) {
    // Simular conexión después de un delay
    setTimeout(() => {
      this.isConnected = true;
      this.callbacks.onopen?.();
      this.processQueue();
    }, 1000);
  }

  set onopen(callback: () => void) {
    this.callbacks.onopen = callback;
  }

  set onmessage(callback: (event: { data: string }) => void) {
    this.callbacks.onmessage = callback;
  }

  set onerror(callback: (error: any) => void) {
    this.callbacks.onerror = callback;
  }

  set onclose(callback: () => void) {
    this.callbacks.onclose = callback;
  }

  send(message: string) {
    if (!this.isConnected) {
      this.messageQueue.push(message);
      return;
    }

    // Simular respuesta del servidor después de un delay
    setTimeout(() => {
      this.simulateResponse(message);
    }, 500 + Math.random() * 1500);
  }

  private processQueue() {
    while (this.messageQueue.length > 0) {
      const message = this.messageQueue.shift();
      if (message) this.send(message);
    }
  }

  private simulateResponse(userMessage: string) {
    const responses: WebSocketMessage[] = [
      {
        type: 'message',
        message: '¡Hola! 👋 Soy tu asistente de Punto Farma. ¿En qué puedo ayudarte hoy?'
      },
      {
        type: 'carousel',
        products: [
          {
            id: 'p101',
            name: 'Ibuprofeno 400mg - Caja x24',
            image_url: 'https://images.pexels.com/photos/3683056/pexels-photo-3683056.jpeg?auto=compress&cs=tinysrgb&w=400',
            price: 15.99,
            currency: 'USD',
            description: 'Antiinflamatorio y analgésico de acción rápida. Ideal para dolores musculares, de cabeza y fiebre. Presentación de 24 tabletas.'
          },
          {
            id: 'p102',
            name: 'Vitamina C 1000mg - Frasco x60',
            image_url: 'https://images.pexels.com/photos/3652097/pexels-photo-3652097.jpeg?auto=compress&cs=tinysrgb&w=400',
            price: 24.50,
            currency: 'USD',
            description: 'Suplemento vitamínico de alta potencia. Fortalece el sistema inmunológico y mejora la absorción de hierro. 60 cápsulas.'
          },
          {
            id: 'p103',
            name: 'Termómetro Digital Premium',
            image_url: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=400',
            price: 32.99,
            currency: 'USD',
            description: 'Termómetro digital de alta precisión con pantalla LCD. Medición rápida en 10 segundos. Incluye estuche protector.'
          },
          {
            id: 'p104',
            name: 'Mascarillas KN95 - Pack x20',
            image_url: 'https://images.pexels.com/photos/3952241/pexels-photo-3952241.jpeg?auto=compress&cs=tinysrgb&w=400',
            price: 18.75,
            currency: 'USD',
            description: 'Mascarillas de protección respiratoria KN95. Filtración del 95%. Pack de 20 unidades selladas individualmente.'
          },
          {
            id: 'p105',
            name: 'Alcohol en Gel 500ml',
            image_url: 'https://images.pexels.com/photos/4167541/pexels-photo-4167541.jpeg?auto=compress&cs=tinysrgb&w=400',
            price: 8.99,
            currency: 'USD',
            description: 'Gel antibacterial con 70% de alcohol. Elimina 99.9% de gérmenes y bacterias. Presentación de 500ml con dispensador.'
          }
        ]
      },
      {
        type: 'message',
        message: 'Estos son algunos de nuestros productos más populares. ¿Te interesa alguno? 💊'
      },
      {
        type: 'cart',
        cart_id: '123456',
        user_id: '98765',
        items: [
          {
            id: 'p101',
            name: 'Ibuprofeno 400mg',
            quantity: 2,
            price: 12.50,
            currency: 'USD'
          }
        ],
        total: 25.00
      }
    ];

    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    
    this.callbacks.onmessage?.({
      data: JSON.stringify(randomResponse)
    });
  }

  close() {
    this.isConnected = false;
    this.callbacks.onclose?.();
  }
}