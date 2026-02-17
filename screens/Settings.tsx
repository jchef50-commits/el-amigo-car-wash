
import React, { useState } from 'react';

const Settings: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <header className="sticky top-0 z-40 bg-white p-4 border-b border-slate-100 flex justify-between items-center">
        <h1 className="text-lg font-bold">Configuración</h1>
        <button className="bg-[#137fec] text-white px-4 py-2 rounded-xl text-xs font-bold">Guardar</button>
      </header>

      <div className="p-4 space-y-6">
        <section className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-4">
          <h2 className="font-bold text-sm uppercase">Nómina y Comisiones</h2>
          <div className="bg-green-50 p-4 rounded-2xl border border-green-100">
             <p className="text-xs font-bold">Comisión Lavadores: 50%</p>
             <p className="text-[9px] text-green-700 mt-1">Calculado sobre el valor bruto del servicio.</p>
          </div>
        </section>

        <section className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-4">
          <h2 className="font-bold text-sm uppercase">Datos del Ticket</h2>
          <input className="w-full bg-slate-50 border-none rounded-xl h-11 px-4 text-xs font-bold" value="Sparkle ERP - Car Wash & Boutique" />
          <input className="w-full bg-slate-50 border-none rounded-xl h-11 px-4 text-xs font-bold" value="NIT 900.123.456-0" />
        </section>
      </div>
    </div>
  );
};

export default Settings;
