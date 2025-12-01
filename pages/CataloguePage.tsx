import React from 'react';
import ProductCard from '../components/ProductCard';
import { Product } from '../types';
import Header from '../components/Header';

const allProducts: Product[] = [
  { id: 1, name: 'Custom Wooly Alpaca', price: '$49.99', imageUrl: 'https://picsum.photos/seed/plush1/400/400' },
  { id: 2, name: 'Hand-painted Figurine', price: '$79.99', imageUrl: 'https://picsum.photos/seed/figure1/400/400' },
  { id: 3, name: 'Chibi Style Plush', price: '$39.99', imageUrl: 'https://picsum.photos/seed/plush2/400/400' },
  { id: 4, name: 'Sleepy Cat Plushie', price: '$29.99', imageUrl: 'https://picsum.photos/seed/plush3/400/400' },
  { id: 5, name: 'Heroic Knight Figurine', price: '$89.99', imageUrl: 'https://picsum.photos/seed/figure2/400/400' },
  { id: 6, name: 'Kawaii Octopus', price: '$24.99', imageUrl: 'https://picsum.photos/seed/plush4/400/400' },
  { id: 7, name: 'Forest Spirit Figure', price: '$69.99', imageUrl: 'https://picsum.photos/seed/figure3/400/400' },
  { id: 8, name: 'Galaxy Dragon Plush', price: '$59.99', imageUrl: 'https://picsum.photos/seed/plush5/400/400' },
  { id: 9, name: 'Steampunk Golem', price: '$129.99', imageUrl: 'https://picsum.photos/seed/figure4/400/400' },
  { id: 10, name: 'Corgi Loaf Plush', price: '$34.99', imageUrl: 'https://picsum.photos/seed/plush6/400/400' },
  { id: 11, name: 'Anime Heroine Statue', price: '$99.99', imageUrl: 'https://picsum.photos/seed/figure5/400/400' },
  { id: 12, name: 'Boba Tea Plushie', price: '$22.99', imageUrl: 'https://picsum.photos/seed/plush7/400/400' },
];

const CataloguePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-12 text-slate-900 dark:text-white">Our Collection</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {allProducts.map(product => <ProductCard key={product.id} product={product} />)}
        </div>
      </main>
    </div>
  );
};

export default CataloguePage;
