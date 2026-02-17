
import React from 'react';

const ITEMS = [
  { name: 'Shampoo Premium', status: 'critical', current: 12, max: 100, unit: 'Galones', img: 'https://picsum.photos/seed/inv1/100/100' },
  { name: 'Cera Cerámica', status: 'good', current: 45, max: 50, unit: 'Unidades', img: 'https://picsum.photos/seed/inv2/100/100' },
  { name: 'Brillante Llantas', status: 'low', current: 8, max: 40, unit: 'Unidades', img: 'https://picsum.photos/seed/inv3/100/100' },
  { name: 'Microfibras', status: 'ok', current: 200, max: 300, unit: 'Paquetes', img: 'https://picsum.photos/seed/inv4/100/100' },
];

const Inventory: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <header className="sticky top-0 z-40 bg-white p-4 border-b border-slate-100">
        <h1 className="text-lg font-bold">Inventario de Insumos</h1>
      </header>

      <section className="p-4 space-y-4">
        {ITEMS.map((item, idx) => (
          <div key={idx} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 space-y-4">
            <div className="flex justify-between items-start">
              <div className="flex gap-4">
                <div className="w-16 h-16 rounded-xl bg-slate-50 border" style={{ backgroundImage: `url(${item.img})`, backgroundSize: 'cover' }} />
                <div>
                  <h3 className="font-bold text-sm">{item.name}</h3>
                  <p className="text-xs font-bold mt-2">{item.current} / {item.max} {item.unit}</p>
                </div>
              </div>
            </div>
            <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all ${item.current/item.max < 0.2 ? 'bg-red-500' : 'bg-[#137fec]'}`}
                style={{ width: `${(item.current / item.max) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Inventory;
