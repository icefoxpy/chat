import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Star, ShoppingCart, Heart, Eye } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../hooks/useCart';

interface ProductCarouselProps {
  products: Product[];
}

export const ProductCarousel: React.FC<ProductCarouselProps> = ({ products }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { addToCart } = useCart();

  const nextProduct = () => {
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const prevProduct = () => {
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  const handleAddToCart = async (product: Product) => {
    setIsAddingToCart(true);
    addToCart(product.id, 1, product.name, product.price, product.currency);
    
    // Simular delay de API
    setTimeout(() => {
      setIsAddingToCart(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    }, 800);
  };

  if (products.length === 0) return null;

  const currentProduct = products[currentIndex];
  const hasDiscount = Math.random() > 0.7; // 30% chance of discount
  const originalPrice = hasDiscount ? currentProduct.price * 1.2 : null;
  const rating = 4 + Math.random(); // Random rating between 4-5
  const reviewCount = Math.floor(Math.random() * 500) + 50;

  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden max-w-xs mx-auto">
      {/* Success notification */}
      {showSuccess && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium z-20 animate-bounce">
          ¡Agregado al carrito! ✅
        </div>
      )}
      
      {/* Product Image */}
      <div className="relative group">
        {/* Discount badge */}
        {hasDiscount && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold z-10 animate-pulse">
            -15% OFF
          </div>
        )}
        
        {/* Quick actions */}
        <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <button className="bg-white/90 p-2 rounded-full shadow-lg hover:bg-white transition-colors">
            <Heart className="w-4 h-4 text-gray-600 hover:text-red-500" />
          </button>
          <button className="bg-white/90 p-2 rounded-full shadow-lg hover:bg-white transition-colors">
            <Eye className="w-4 h-4 text-gray-600 hover:text-blue-500" />
          </button>
        </div>
        
        <img
          src={currentProduct.image_url}
          alt={currentProduct.name}
          className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/3683056/pexels-photo-3683056.jpeg?auto=compress&cs=tinysrgb&w=400';
          }}
        />
        
        {/* Navigation arrows */}
        {products.length > 1 && (
          <>
            <button
              onClick={prevProduct}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-white/90 text-gray-800 p-2 rounded-full hover:bg-white shadow-lg transition-all duration-300 hover:scale-110"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            <button
              onClick={nextProduct}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white/90 text-gray-800 p-2 rounded-full hover:bg-white shadow-lg transition-all duration-300 hover:scale-110"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}

        {/* Product indicators */}
        {products.length > 1 && (
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-white shadow-lg scale-125' 
                    : 'bg-white/60 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-bold text-gray-800 text-base leading-tight flex-1 hover:text-blue-600 transition-colors cursor-pointer">
            {currentProduct.name}
          </h3>
        </div>
        
        {/* Rating */}
        <div className="flex items-center space-x-2 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-4 h-4 ${
                  i < Math.floor(rating) 
                    ? 'text-yellow-400 fill-current' 
                    : 'text-gray-300'
                }`} 
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 font-medium">
            {rating.toFixed(1)} ({reviewCount} reseñas)
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
          {currentProduct.description}
        </p>

        {/* Price section */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-baseline space-x-2">
            {hasDiscount && originalPrice && (
              <span className="text-lg text-gray-400 line-through">
                ${originalPrice.toFixed(2)}
              </span>
            )}
            <span className={`text-2xl font-bold ${hasDiscount ? 'text-red-600' : 'text-green-600'}`}>
              ${currentProduct.price}
            </span>
            <span className="text-xs text-gray-500 uppercase">
              {currentProduct.currency}
            </span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex space-x-3">
          <button
            onClick={() => handleAddToCart(currentProduct)}
            disabled={isAddingToCart}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-all duration-300 transform ${
              isAddingToCart
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl'
            } text-white`}
          >
            {isAddingToCart ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Agregando...</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />
                <span>Agregar</span>
              </>
            )}
          </button>
          
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-3 rounded-lg transition-all duration-300 hover:scale-105">
            <Plus className="w-4 h-4" />
          </button>
        </div>
        
        {/* Stock indicator */}
        <div className="mt-3 flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-green-600 font-medium">En stock - Envío gratis</span>
        </div>
      </div>
    </div>
  );
};