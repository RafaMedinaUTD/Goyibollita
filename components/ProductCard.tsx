import React, { useContext } from 'react';
import { Product } from '../types';
import { CartContext } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    return null; // Or some fallback UI
  }

  const { addToCart } = cartContext;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden flex flex-col justify-between transform hover:-translate-y-1 transition-transform duration-300">
      <div>
        <img src={product.imageUrl} alt={product.name} className="w-full h-48 sm:h-56 object-cover" />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white">{product.name}</h3>
          <p className="text-primary mt-2 text-xl font-bold">{product.price}</p>
        </div>
      </div>
      <div className="p-4 pt-0">
        <button 
          onClick={() => addToCart(product)}
          className="w-full bg-secondary hover:bg-secondary-dark text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
