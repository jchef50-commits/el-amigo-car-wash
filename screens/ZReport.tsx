
import React from 'react';

const ZReport: React.FC = () => {
  const serviceSales = 2400.00;
  const productSales = 440.50;
  const totalGross = serviceSales + productSales;
  const washerPayout = serviceSales * 0.5;
  const netProfit = totalGross - washerPayout - 800;

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 pb-20">
      <header className="sticky top-0 z-40 bg-white p-4 border-b border-slate-100">
        <h1 className="text-lg font-bold">Cierre de Operación</h1>
      </header>

      <div className="p-4 space-y-4">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Ingresos Hoy</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[9px] font-bold text-slate-400 uppercase">Servicios</p>
              <p className="text-xl font-black text-[#137fec]">${serviceSales.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-[9px] font-bold text-slate-400 uppercase">Boutique</p>
              <p className="text-xl font-black text-amber-600">${productSales.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Nómina Lavadores (50%)</h2>
          <p className="text-2xl font-black">${washerPayout.toFixed(2)}</p>
        </div>

        <div className="bg-green-600 p-6 rounded-3xl text-white">
           <p className="text-[10px] font-black uppercase opacity-80">Utilidad Neta Real</p>
           <h2 className="text-4xl font-black">${netProfit.toFixed(2)}</h2>
        </div>
      </div>
    </div>
  );
};

export default ZReport;
