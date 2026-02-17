
import React, { useState } from 'react';
import { Vehicle } from '../types';

interface InspectionProps {
  vehicle: Vehicle;
  onFinish: () => void;
}

const Inspection: React.FC<InspectionProps> = ({ vehicle, onFinish }) => {
  const [selectedZones, setSelectedZones] = useState<string[]>([]);
  const [photos, setPhotos] = useState<Record<string, string>>({
    'FRONT-LEFT': 'https://picsum.photos/seed/fl/300/200'
  });

  const toggleZone = (zone: string) => {
    setSelectedZones(prev => 
      prev.includes(zone) ? prev.filter(z => z !== zone) : [...prev, zone]
    );
  };

  const zones = ['Front', 'Back', 'Left', 'Right', 'Glass', 'Interior'];
  const photoSpots = ['FRONT-LEFT', 'FRONT-RIGHT', 'REAR-LEFT', 'REAR-RIGHT'];

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100">
        <div className="flex items-center p-4 justify-between">
          <span className="material-symbols-outlined text-slate-400 cursor-pointer">arrow_back_ios</span>
          <h2 className="font-bold text-lg">Inspección de Vehículo</h2>
          <button onClick={onFinish} className="text-xs font-semibold text-slate-400">Omitir</button>
        </div>
      </header>

      <div className="flex items-center gap-4 bg-white px-4 py-4 border-b border-slate-100">
        <div className="size-14 bg-blue-50 text-[#137fec] rounded-xl flex items-center justify-center">
          <span className="material-symbols-outlined text-3xl">directions_car</span>
        </div>
        <div>
          <h3 className="text-xl font-black">{vehicle?.plate || 'ABC-1234'}</h3>
          <p className="text-xs text-slate-400">{vehicle?.model || 'Tesla Model 3 - Silver'}</p>
        </div>
      </div>

      <section className="p-4 space-y-4">
        <div>
          <h4 className="font-bold text-base">Diagrama de Daños</h4>
          <p className="text-[11px] text-slate-400">Toca las zonas para marcar daños existentes</p>
        </div>

        <div className="bg-white rounded-2xl p-8 border border-slate-100 aspect-video flex items-center justify-center relative overflow-hidden">
          <div className="relative w-48 h-32 border-2 border-slate-200 rounded-3xl flex items-center justify-center">
             <span className="text-[10px] font-black text-slate-200 uppercase tracking-widest">CHASIS</span>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
          {zones.map(zone => (
            <button
              key={zone}
              onClick={() => toggleZone(zone)}
              className={`flex-shrink-0 h-10 px-5 rounded-full text-xs font-bold flex items-center gap-2 transition-all ${
                selectedZones.includes(zone) 
                  ? 'bg-[#137fec] text-white shadow-lg shadow-blue-100' 
                  : 'bg-white text-slate-600 border border-slate-200'
              }`}
            >
              {zone}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4">
          {photoSpots.map(spot => (
            <div key={spot} className="space-y-2">
              <button className="w-full aspect-square rounded-2xl bg-blue-50/50 border-2 border-dashed border-blue-200 flex flex-col items-center justify-center gap-1">
                <span className="material-symbols-outlined text-2xl text-[#137fec]">add_a_photo</span>
                <span className="text-[9px] font-black uppercase text-[#137fec]">{spot}</span>
              </button>
            </div>
          ))}
        </div>

        <div className="py-6">
          <button 
            onClick={onFinish}
            className="w-full h-16 bg-[#137fec] text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-xl shadow-blue-200"
          >
            Finalizar e Iniciar Lavado
          </button>
        </div>
      </section>
    </div>
  );
};

export default Inspection;
