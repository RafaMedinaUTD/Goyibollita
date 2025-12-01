import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCartIcon, PlushieIcon } from './icons';
import { CartContext } from '../context/CartContext';

const Header: React.FC = () => {
    const navigate = useNavigate();
    const cartContext = useContext(CartContext);
    const cartItemCount = cartContext?.cartItems.reduce((acc, item) => acc + item.quantity, 0) || 0;

    return (
        <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50 shadow-md">
            <nav className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
                <Link to="/home" className="text-primary dark:text-primary-light">
                    <PlushieIcon className="w-10 h-10" />
                </Link>
                <div className="flex items-center space-x-4">
                    <Link to="/catalogue" className="text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary-light font-medium transition-colors">Catalogue</Link>
                    <Link to="/custom-order" className="text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary-light font-medium transition-colors">Custom Order</Link>
                    <Link to="/faq" className="text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary-light font-medium transition-colors">FAQ</Link>
                    <Link to="/cart" className="relative text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary-light p-2 rounded-full">
                        <ShoppingCartIcon className="w-6 h-6" />
                        {cartItemCount > 0 && (
                            <span className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-primary text-white text-xs flex items-center justify-center transform -translate-y-1/2 translate-x-1/2">
                                {cartItemCount}
                            </span>
                        )}
                    </Link>
                    <button onClick={() => navigate('/')} className="px-4 py-2 text-sm bg-secondary hover:bg-secondary-dark text-white font-semibold rounded-full shadow-sm transition-colors">Logout</button>
                </div>
            </nav>
        </header>
    );
};

export default Header;