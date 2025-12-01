import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlushieIcon } from '../components/icons';

const LoginPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Non-functional login/register, just navigate to home
    navigate('/home');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900 p-4 relative">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
            <PlushieIcon className="w-20 h-20 mx-auto text-primary dark:text-primary-light mb-4" />
            <h1 className="text-5xl font-bold text-primary dark:text-primary-light tracking-wider" style={{fontFamily: "'Comic Sans MS', cursive, sans-serif"}}>
                goyibollita
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2">Your one-stop shop for custom plushies & figurines!</p>
        </div>
        <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-2xl">
          <h2 className="text-2xl font-bold text-center text-slate-800 dark:text-white mb-6">
            {isLogin ? 'Welcome Back!' : 'Create Account'}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              {!isLogin && (
                <input
                  type="text"
                  placeholder="Username"
                  className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-700 border-2 border-transparent focus:border-primary dark:focus:border-primary-light rounded-lg text-slate-700 dark:text-slate-200 focus:outline-none transition-colors"
                />
              )}
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-700 border-2 border-transparent focus:border-primary dark:focus:border-primary-light rounded-lg text-slate-700 dark:text-slate-200 focus:outline-none transition-colors"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-700 border-2 border-transparent focus:border-primary dark:focus:border-primary-light rounded-lg text-slate-700 dark:text-slate-200 focus:outline-none transition-colors"
              />
            </div>
            <button
              type="submit"
              className="w-full mt-6 py-3 bg-primary hover:bg-primary-dark text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            >
              {isLogin ? 'Login' : 'Register'}
            </button>
          </form>
          <p className="text-center mt-6 text-sm text-slate-500 dark:text-slate-400">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
            <button onClick={() => setIsLogin(!isLogin)} className="font-semibold text-primary dark:text-primary-light hover:underline ml-1">
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;