
import React from 'react';
import { BayStatus, User, UserRole } from '../types';

interface DashboardProps {
  user: User;
  onSwitchRole: (role: UserRole) => void;
  onNewOrder: () => void;
}

const BAYS: BayStatus[] = [
  {
    id: 1,
    status: 'active',
    vehicle: { plate: 'ABC-1234', model: 'Tesla Model 3', color: 'Silver', type: 'sedan' },
    service: 'Premium Ceramic',
    phase: 'Scrubbing',
    progress: 65,
    timeRemaining: '08:45',
    imageUrl: 'https://picsum.photos/seed/car1/300/200',
    washerName: 'Juan Pérez',
    entryTime: '14:20',
    auditSnapshotUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 2,
    status: 'delayed',
    vehicle: { plate: 'TRK-9902', model: 'Ford F-150', color: 'Black', type: 'truck' },
    service: 'Express Wax',
    phase: 'Polishing',
    progress: 85,
    timeRemaining: '-02:15',
    imageUrl: 'https://picsum.photos/seed/car2/300/200',
    washerName: 'Carlos Ruiz',
    entryTime: '14:05',
    auditSnapshotUrl: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=200&auto=format&fit=crop'
  }
];

const Dashboard: React.FC<DashboardProps> = ({ user, onSwitchRole }) => {
  const isOwner = user.role === UserRole.TOTAL;

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md p-4 flex items-center justify-between border-b border-slate-100">
        <div className="flex flex-col">
          <h1 className="text-sm font-bold text-slate-900">Panel de Control</h1>
          <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest">{user.name}</span>
        </div>
        <div className="flex items-center gap-2">
           <span className="material-symbols-outlined text-[#137fec] text-lg">videocam</span>
           <span className="text-[10px] font-bold text-[#137fec] uppercase">Cámaras: Online</span>
        </div>
      </header>

      <section className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-base">Estado de Bahías</h2>
          {isOwner && <button className="text-[10px] font-bold text-[#137fec] underline uppercase">Auditar Todo</button>}
        </div>

        {BAYS.map((bay) => (
          <div key={bay.id} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 space-y-4 overflow-hidden relative">
            <div className="flex gap-4">
              <div 
                className="w-20 h-20 rounded-xl bg-cover bg-center shrink-0 border border-slate-200"
                style={{ backgroundImage: `url(${bay.imageUrl})` }}
              />
              <div className="flex-1 flex flex-col justify-between py-0.5">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-black text-slate-900 text-sm">B-0{bay.id} • {bay.vehicle?.plate}</h3>
                    <p className="text-[10px] font-bold text-slate-500 uppercase mt-0.5">Ingreso: {bay.entryTime}</p>
                  </div>
                  <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-md ${
                    bay.status === 'delayed' ? 'bg-red-500 text-white' : 'bg-blue-100 text-[#137fec]'
                  }`}>
                    {bay.status}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                   <div className="size-5 rounded-full bg-slate-100 flex items-center justify-center text-[8px] font-bold">{bay.washerName?.charAt(0)}</div>
                   <span className="text-[10px] font-bold text-slate-600">{bay.washerName}</span>
                </div>
              </div>
            </div>

            {isOwner && (
              <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                    <span className="material-symbols-outlined text-[10px]">photo_camera</span>
                    Control Automático (+5 min)
                  </span>
                  <span className="text-[8px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded uppercase">Verificado</span>
                </div>
                <div className="flex gap-2">
                   <div className="w-24 h-14 rounded-lg bg-cover bg-center border border-slate-200 shadow-sm" style={{ backgroundImage: `url(${bay.auditSnapshotUrl})` }} />
                   <div className="flex-1 flex flex-col justify-center">
                      <p className="text-[10px] font-bold text-slate-700 leading-tight">Foto de Cámara IP #0{bay.id}</p>
                      <p className="text-[9px] text-slate-400">Capturada: 14:25:00</p>
                   </div>
                </div>
              </div>
            )}

            <div className="space-y-1">
              <div className="flex justify-between items-end">
                <span className="text-[8px] font-bold text-slate-400 uppercase">{bay.phase}</span>
                <span className="text-[10px] font-black">{bay.timeRemaining}</span>
              </div>
              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#137fec] rounded-full" style={{ width: `${bay.progress}%` }} />
              </div>
            </div>
          </div>
        ))}
      </section>

      <div className="h-20"></div>
    </div>
  );
};

export default Dashboard;
