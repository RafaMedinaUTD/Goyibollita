import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { CartContext } from '../context/CartContext';
import { ArrowLeftIcon } from '../components/icons';

const PaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const cartContext = useContext(CartContext);

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (cartContext) {
      cartContext.clearCart();
    }
    alert('purchase completed succesfully');
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-md mx-auto">
          <button onClick={() => navigate('/cart')} className="flex items-center text-lg font-semibold text-secondary hover:text-secondary-dark dark:text-secondary-light dark:hover:text-secondary transition-colors mb-8">
            <ArrowLeftIcon className="w-6 h-6 mr-2" />
            Back to Cart
          </button>
          <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-2xl">
            <h1 className="text-3xl font-bold text-center mb-6 text-slate-900 dark:text-white">Payment Details</h1>
            <form onSubmit={handlePayment}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="cardName" className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Name on Card</label>
                  <input id="cardName" type="text" placeholder="Goyi Bollita" className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-700 border-2 border-transparent focus:border-primary dark:focus:border-primary-light rounded-lg text-slate-700 dark:text-slate-200 focus:outline-none transition-colors" />
                </div>
                <div>
                  <label htmlFor="cardNumber" className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Card Number</label>
                  <input id="cardNumber" type="text" placeholder="**** **** **** 1234" className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-700 border-2 border-transparent focus:border-primary dark:focus:border-primary-light rounded-lg text-slate-700 dark:text-slate-200 focus:outline-none transition-colors" />
                </div>
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <label htmlFor="expiryDate" className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Expiry Date</label>
                    <input id="expiryDate" type="text" placeholder="MM/YY" className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-700 border-2 border-transparent focus:border-primary dark:focus:border-primary-light rounded-lg text-slate-700 dark:text-slate-200 focus:outline-none transition-colors" />
                  </div>
                  <div className="flex-1">
                    <label htmlFor="cvv" className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">CVV</label>
                    <input id="cvv" type="text" placeholder="123" className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-700 border-2 border-transparent focus:border-primary dark:focus:border-primary-light rounded-lg text-slate-700 dark:text-slate-200 focus:outline-none transition-colors" />
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="w-full mt-8 py-3 bg-primary hover:bg-primary-dark text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              >
                Pay Now
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PaymentPage;
