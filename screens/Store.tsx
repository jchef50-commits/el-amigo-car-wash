
import React, { useState } from 'react';
import { Product } from '../types';

const PRODUCTS: Product[] = [
  { id: '1', name: 'Aromatizante Pino', price: 5.50, category: 'Interior', stock: 45, image: 'https://images.unsplash.com/photo-1599420186946-7b6fb4e297f0?q=80&w=200&auto=format&fit=crop' },
  { id: '2', name: 'Cera Líquida 500ml', price: 18.90, category: 'Limpieza', stock: 12, image: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?q=80&w=200&auto=format&fit=crop' },
  { id: '3', name: 'Microfibra Premium', price: 3.50, category: 'Accesorios', stock: 120, image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=200&auto=format&fit=crop' },
];

const Store: React.FC = () => {
  const [cart, setCart] = useState<Record<string, number>>({});

  const addToCart = (id: string) => {
    setCart(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const cartTotal = Object.entries(cart).reduce((acc, [id, qty]) => {
    const product = PRODUCTS.find(p => p.id === id);
    return acc + (product?.price || 0) * qty;
  }, 0);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <header className="sticky top-0 z-40 bg-white p-4 border-b border-slate-100 flex justify-between items-center">
        <h1 className="text-lg font-bold">Boutique Sparkle</h1>
        <div className="relative">
          <span className="material-symbols-outlined">shopping_cart</span>
          {Object.keys(cart).length > 0 && <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[8px] rounded-full size-4 flex items-center justify-center">!</span>}
        </div>
      </header>

      <section className="p-4 grid grid-cols-2 gap-4">
        {PRODUCTS.map(product => (
          <div key={product.id} className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm">
            <div className="h-32 bg-cover bg-center" style={{ backgroundImage: `url(${product.image})` }} />
            <div className="p-3">
              <h3 className="text-xs font-bold truncate">{product.name}</h3>
              <p className="text-sm font-black text-amber-600 mt-1">${product.price.toFixed(2)}</p>
              <button 
                onClick={() => addToCart(product.id)}
                className="w-full mt-3 py-2 bg-amber-500 text-white text-[10px] font-bold rounded-lg"
              >
                AGREGAR
              </button>
            </div>
          </div>
        ))}
      </section>

      {cartTotal > 0 && (
        <div className="fixed bottom-24 left-4 right-4 bg-white rounded-2xl shadow-2xl p-4 flex items-center justify-between border border-amber-100">
          <p className="text-xl font-black">${cartTotal.toFixed(2)}</p>
          <button className="bg-amber-500 text-white px-6 py-3 rounded-xl font-bold">PAGAR</button>
        </div>
      )}
    </div>
  );
};

export default Store;
