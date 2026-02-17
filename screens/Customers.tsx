
import React from 'react';

const Customers: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <header className="sticky top-0 z-40 bg-white p-4 border-b border-slate-100">
        <h1 className="text-lg font-bold">Historial de Clientes</h1>
      </header>

      <section className="p-4">
        <div className="bg-[#137fec] text-white p-6 rounded-3xl shadow-xl space-y-6">
          <h2 className="text-2xl font-black">Programa Lealtad</h2>
          <div className="space-y-2">
            <div className="flex justify-between items-end text-xs">
              <p>6 de 10 lavados completados</p>
              <span className="font-black">60%</span>
            </div>
            <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden">
              <div className="h-full bg-white rounded-full" style={{ width: '60%' }} />
            </div>
          </div>
        </div>
      </section>

      <section className="p-4 space-y-4">
        <h3 className="font-bold text-lg">Servicios Recientes</h3>
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
          <p className="text-[10px] font-bold text-slate-400 uppercase">Hoy, 10:30 AM</p>
          <h4 className="font-bold text-base">Lavado Premium Full</h4>
          <p className="text-xs text-slate-400">Tesla Model 3 • Plateado</p>
          <div className="mt-4 flex gap-2">
            <button className="flex-1 py-3 bg-blue-50 text-[#137fec] rounded-xl text-xs font-bold">Llamar</button>
            <button className="flex-1 py-3 bg-green-50 text-green-600 rounded-xl text-xs font-bold">WhatsApp</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Customers;
