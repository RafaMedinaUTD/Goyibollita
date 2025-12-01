import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import Header from '../components/Header';

const CartPage: React.FC = () => {
  const cartContext = useContext(CartContext);
  const navigate = useNavigate();

  if (!cartContext) {
    return <div>Loading...</div>;
  }

  const { cartItems, removeFromCart, getCartTotal } = cartContext;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-12 text-slate-900 dark:text-white">Your Cart</h1>
        {cartItems.length === 0 ? (
          <div className="text-center">
            <p className="text-xl text-slate-500 dark:text-slate-400">Your cart is empty.</p>
            <Link to="/catalogue" className="mt-6 inline-block bg-primary hover:bg-primary-dark text-white font-bold py-3 px-6 rounded-lg transition-colors">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
                  <div className="flex items-center space-x-4">
                    <img src={item.imageUrl} alt={item.name} className="w-20 h-20 rounded-md object-cover"/>
                    <div>
                      <h2 className="font-semibold text-lg text-slate-800 dark:text-white">{item.name}</h2>
                      <p className="text-slate-500 dark:text-slate-400">Quantity: {item.quantity}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <p className="font-bold text-lg text-primary">{item.price}</p>
                    <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 dark:hover:text-red-400 font-semibold">
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              <div className="p-6 flex justify-end items-center">
                <span className="text-xl font-bold text-slate-900 dark:text-white">Total: ${getCartTotal()}</span>
                <button onClick={() => navigate('/payment')} className="ml-6 bg-secondary hover:bg-secondary-dark text-white font-bold py-3 px-8 rounded-lg transition-colors">
                  Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default CartPage;
