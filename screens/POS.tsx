
import React, { useState } from 'react';
import { Vehicle, ServicePackage, Product } from '../types';

interface POSProps {
  onProceed: (vehicle: Vehicle) => void;
}

const WASHERS = ['Juan Pérez', 'Carlos Ruiz', 'Marta Gómez', 'Luis Torres'];

const VEHICLE_TYPES = [
  { id: 'sedan', label: 'Sedan', icon: 'directions_car' },
  { id: 'suv', label: 'SUV', icon: 'electric_car' },
  { id: 'truck', label: 'Truck', icon: 'local_shipping' },
  { id: 'moto', label: 'Motorbike', icon: 'motorcycle' },
];

const PACKAGES: ServicePackage[] = [
  { id: 'basic', name: 'Básico', price: 15, duration: '20-30 mins', icon: 'water_drop', color: 'blue' },
  { id: 'full', name: 'Completo', price: 35, duration: '45-60 mins', icon: 'colors_spark', color: 'primary' },
  { id: 'detail', name: 'Detallado', price: 60, duration: '90+ mins', icon: 'vacuum', color: 'amber' },
];

const UPSELL_PRODUCTS: Partial<Product>[] = [
  { id: '1', name: 'Aromatizante', price: 5.50, image: 'https://images.unsplash.com/photo-1599420186946-7b6fb4e297f0?q=80&w=100&auto=format&fit=crop' },
  { id: '3', name: 'Microfibra', price: 3.50, image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=100&auto=format&fit=crop' },
  { id: '5', name: 'Silicona', price: 9.99, image: 'https://images.unsplash.com/photo-1620002093398-8f16081af5ee?q=80&w=100&auto=format&fit=crop' },
];

const POS: React.FC<POSProps> = ({ onProceed }) => {
  const [plate, setPlate] = useState('');
  const [selectedType, setSelectedType] = useState('sedan');
  const [selectedService, setSelectedService] = useState('full');
  const [selectedWasher, setSelectedWasher] = useState(WASHERS[0]);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [showSummary, setShowSummary] = useState(false);
  const [activeTicketTab, setActiveTicketTab] = useState<'customer' | 'washer'>('customer');

  const toggleProduct = (id: string) => {
    setSelectedProducts(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const currentPkg = PACKAGES.find(p => p.id === selectedService);
  const servicePrice = currentPkg?.price || 0;
  const productsPrice = selectedProducts.reduce((acc, id) => {
    const prod = UPSELL_PRODUCTS.find(p => p.id === id);
    return acc + (prod?.price || 0);
  }, 0);
  
  const total = servicePrice + productsPrice;

  const handleFinish = () => {
    if (!plate) return alert('Ingrese la placa');
    onProceed({
      plate,
      model: 'Vehículo ' + selectedType,
      color: 'Estándar',
      type: selectedType as any
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-white relative">
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md p-4 flex items-center border-b border-slate-100">
        <h1 className="flex-1 font-bold text-lg">Recepción de Vehículo</h1>
      </header>

      <div className="p-4 space-y-6 pb-40">
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Placa</label>
          <input 
            className="w-full bg-slate-100 border-none rounded-2xl h-14 px-4 font-black text-2xl uppercase tracking-widest text-slate-900"
            placeholder="ABC-1234"
            value={plate}
            onChange={(e) => setPlate(e.target.value.toUpperCase())}
          />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Asignar Personal</label>
          <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
            {WASHERS.map(w => (
              <button
                key={w}
                onClick={() => setSelectedWasher(w)}
                className={`flex-shrink-0 px-4 py-3 rounded-xl text-xs font-bold transition-all border flex items-center gap-2 ${
                  selectedWasher === w ? 'bg-[#137fec] text-white border-[#137fec] shadow-lg shadow-blue-100' : 'bg-white text-slate-400 border-slate-200'
                }`}
              >
                <span className="material-symbols-outlined text-sm">engineering</span>
                {w}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Vehículo</label>
          <div className="grid grid-cols-4 gap-2">
            {VEHICLE_TYPES.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`flex flex-col items-center py-3 rounded-xl border transition-all ${
                  selectedType === type.id ? 'bg-blue-50 border-[#137fec] text-[#137fec]' : 'bg-white border-slate-100 text-slate-400'
                }`}
              >
                <span className="material-symbols-outlined text-xl mb-1">{type.icon}</span>
                <span className="text-[8px] font-black uppercase">{type.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Servicio</label>
          <div className="space-y-2">
            {PACKAGES.map((pkg) => (
              <button
                key={pkg.id}
                onClick={() => setSelectedService(pkg.id)}
                className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${
                  selectedService === pkg.id ? 'bg-blue-50 border-[#137fec]' : 'bg-white border-slate-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`material-symbols-outlined ${selectedService === pkg.id ? 'text-[#137fec]' : 'text-slate-300'}`}>{pkg.icon}</span>
                  <div className="text-left">
                    <p className="text-xs font-bold">{pkg.name}</p>
                    <p className="text-[9px] text-slate-400">{pkg.duration}</p>
                  </div>
                </div>
                <span className="font-black text-sm">${pkg.price}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Venta Sugerida</label>
          <div className="flex gap-3 overflow-x-auto no-scrollbar py-1">
            {UPSELL_PRODUCTS.map((prod) => (
              <button
                key={prod.id}
                onClick={() => toggleProduct(prod.id!)}
                className={`flex-shrink-0 w-28 bg-white border rounded-2xl overflow-hidden transition-all ${
                  selectedProducts.includes(prod.id!) ? 'border-amber-500 shadow-md ring-2 ring-amber-500/10' : 'border-slate-100'
                }`}
              >
                <div className="h-14 w-full bg-cover bg-center" style={{ backgroundImage: `url(${prod.image})` }} />
                <div className="p-2 text-left">
                  <p className="text-[9px] font-black text-slate-800 truncate">{prod.name}</p>
                  <p className="text-[10px] font-black text-amber-600">${prod.price}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="fixed bottom-20 left-0 right-0 max-w-md mx-auto p-4 border-t border-slate-100 bg-white shadow-[0_-10px_30px_rgba(0,0,0,0.05)] z-40">
        <div className="flex justify-between items-center mb-4">
          <div>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Estimado</span>
            <p className="text-2xl font-black text-slate-900">${total.toFixed(2)}</p>
          </div>
          <button 
            onClick={() => plate ? setShowSummary(true) : alert('Escriba la placa')}
            className="bg-[#137fec] text-white px-8 h-14 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-blue-100 active:scale-95 transition-all"
          >
            Continuar
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </div>

      {showSummary && (
        <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm flex items-end justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-[32px] p-6 shadow-2xl animate-slide-up max-h-[90vh] overflow-y-auto">
            <div className="w-12 h-1.5 bg-slate-100 rounded-full mx-auto mb-6" />
            
            <h2 className="text-xl font-black text-slate-900 mb-2">Vista de Impresión</h2>
            <p className="text-sm text-slate-500 mb-4">Se generarán dos copias automáticas.</p>

            <div className="flex p-1 bg-slate-100 rounded-xl mb-4">
               <button 
                onClick={() => setActiveTicketTab('customer')}
                className={`flex-1 py-2 text-[10px] font-black uppercase rounded-lg transition-all ${activeTicketTab === 'customer' ? 'bg-white shadow-sm text-[#137fec]' : 'text-slate-400'}`}
               >Ticket Cliente</button>
               <button 
                onClick={() => setActiveTicketTab('washer')}
                className={`flex-1 py-2 text-[10px] font-black uppercase rounded-lg transition-all ${activeTicketTab === 'washer' ? 'bg-white shadow-sm text-[#137fec]' : 'text-slate-400'}`}
               >Ticket Lavador</button>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border-2 border-dashed border-slate-200 mb-6 font-mono text-[11px] space-y-2">
              <div className="text-center border-b border-slate-200 pb-2 mb-2">
                <p className="font-bold text-xs">SPARKLE ERP - CAR WASH</p>
                {activeTicketTab === 'customer' && <p>NIT: 900.123.456-0</p>}
                <p className="mt-1 font-bold">*** {activeTicketTab === 'customer' ? 'COPIA CLIENTE' : 'COPIA LAVADOR'} ***</p>
              </div>

              <div className="flex justify-between">
                <span>PLACA:</span>
                <span className="font-bold">{plate}</span>
              </div>
              <div className="flex justify-between">
                <span>FECHA:</span>
                <span>{new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span>HORA:</span>
                <span>{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span>LAVADOR:</span>
                <span className="font-bold">{selectedWasher}</span>
              </div>

              <div className="py-2 space-y-1">
                <div className="flex justify-between font-bold">
                  <span>{currentPkg?.name}</span>
                  <span>${servicePrice.toFixed(2)}</span>
                </div>
                
                {activeTicketTab === 'customer' && selectedProducts.map(id => {
                  const p = UPSELL_PRODUCTS.find(x => x.id === id);
                  return (
                    <div key={id} className="flex justify-between italic">
                      <span>+ {p?.name}</span>
                      <span>${p?.price?.toFixed(2)}</span>
                    </div>
                  );
                })}
              </div>

              <div className="border-t-2 border-slate-900 pt-2 flex justify-between text-sm font-bold">
                <span>TOTAL:</span>
                <span>${(activeTicketTab === 'customer' ? total : servicePrice).toFixed(2)}</span>
              </div>

              {activeTicketTab === 'washer' && (
                <div className="mt-4 p-2 bg-slate-900 text-white text-center rounded-lg">
                  <p className="text-[9px] font-black uppercase">Nota Lavador:</p>
                  <p className="text-[10px]">Comisión: ${(servicePrice * 0.5).toFixed(2)} (50%)</p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => setShowSummary(false)} className="h-14 rounded-2xl border-2 border-slate-100 font-bold text-slate-400">Editar</button>
              <button onClick={handleFinish} className="h-14 rounded-2xl bg-[#137fec] text-white font-bold flex items-center justify-center gap-2">
                Imprimir Ambos <span className="material-symbols-outlined text-sm">print</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default POS;
