import React, { useState, useEffect, createContext, useMemo } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import CataloguePage from './pages/CataloguePage';
import FaqPage from './pages/FaqPage';
import CartPage from './pages/CartPage';
import PaymentPage from './pages/PaymentPage';
import CustomOrderPage from './pages/CustomOrderPage';
import { CartProvider } from './context/CartContext';
import ThemeToggle from './components/ThemeToggle';

type Theme = 'light' | 'dark';
type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
});

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem('theme') as Theme) || 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };
  
  const themeValue = useMemo(() => ({ theme, toggleTheme }), [theme]);


  return (
    <ThemeContext.Provider value={themeValue}>
      <CartProvider>
        <HashRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/catalogue" element={<CataloguePage />} />
            <Route path="/custom-order" element={<CustomOrderPage />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/payment" element={<PaymentPage />} />
          </Routes>
        </HashRouter>
        <div className="fixed bottom-6 right-6 z-50">
          <ThemeToggle />
        </div>
      </CartProvider>
    </ThemeContext.Provider>
  );
};

export default App;