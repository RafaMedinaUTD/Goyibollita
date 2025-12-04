import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import Header from '../components/Header';
import Chatbot from '../components/Chatbot';
import { Product } from '../types';

const mainProducts: Product[] = [
  { id: 1, name: 'Custom Wooly Alpaca', price: '$49.99', imageUrl: 'https://picsum.photos/seed/plush1/400/400' },
  { id: 2, name: 'Hand-painted Figurine', price: '$79.99', imageUrl: 'https://picsum.photos/seed/figure1/400/400' },
  { id: 3, name: 'Chibi Style Plush', price: '$39.99', imageUrl: 'https://picsum.photos/seed/plush2/400/400' },
];

const recommendedProducts: Product[] = [
  { id: 4, name: 'Sleepy Cat Plushie', price: '$29.99', imageUrl: 'https://picsum.photos/seed/plush3/400/400' },
  { id: 5, name: 'Heroic Knight Figurine', price: '$89.99', imageUrl: 'https://picsum.photos/seed/figure2/400/400' },
  { id: 6, name: 'Kawaii Octopus', price: '$24.99', imageUrl: 'https://picsum.photos/seed/plush4/400/400' },
  { id: 7, name: 'Forest Spirit Figure', price: '$69.99', imageUrl: 'https://picsum.photos/seed/figure3/400/400' },
];

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white">Bring Your Creations to Life</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-500 dark:text-slate-400">Unique, handcrafted plushies and figurines, made just for you.</p>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-slate-900 dark:text-white">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {mainProducts.map(product => <ProductCard key={product.id} product={product} />)}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-8 text-slate-900 dark:text-white">Recommended For You</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {recommendedProducts.map(product => <ProductCard key={product.id} product={product} />)}
          </div>
        </section>
      </main>
      <Chatbot />
    </div>
  );
};

export default HomePage;