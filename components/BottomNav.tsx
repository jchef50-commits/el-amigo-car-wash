
import React from 'react';
import { Screen, UserRole } from '../types';

interface BottomNavProps {
  active: Screen;
  onNavigate: (screen: Screen) => void;
  userRole: UserRole;
}

const BottomNav: React.FC<BottomNavProps> = ({ active, onNavigate, userRole }) => {
  const tabs = [
    { id: Screen.DASHBOARD, label: 'Dash', icon: 'dashboard', roles: [UserRole.TOTAL, UserRole.GERENTE, UserRole.ENCARGADO] },
    { id: Screen.POS, label: 'Lavado', icon: 'local_car_wash', roles: [UserRole.TOTAL, UserRole.GERENTE, UserRole.ENCARGADO] },
    { id: Screen.STORE, label: 'Boutique', icon: 'shopping_bag', roles: [UserRole.TOTAL, UserRole.GERENTE, UserRole.ENCARGADO] },
    { id: Screen.INVENTORY, label: 'Stock', icon: 'inventory_2', roles: [UserRole.TOTAL, UserRole.GERENTE, UserRole.ENCARGADO] },
    { id: Screen.ZREPORT, label: 'Caja', icon: 'payments', roles: [UserRole.TOTAL, UserRole.GERENTE] },
    { id: Screen.SETTINGS, label: 'Ajustes', icon: 'settings', roles: [UserRole.TOTAL] },
  ];

  const visibleTabs = tabs.filter(t => t.roles.includes(userRole));

  return (
    <nav className="fixed bottom-0 w-full max-w-md bg-white/95 backdrop-blur-md border-t border-slate-100 px-1 pt-3 pb-8 z-50 flex justify-around items-center shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
      {visibleTabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onNavigate(tab.id)}
          className={`flex flex-col items-center gap-1 transition-all flex-1 ${
            active === tab.id ? 'text-[#137fec] scale-110' : 'text-slate-400'
          }`}
        >
          <span className={`material-symbols-outlined text-[22px] ${active === tab.id ? 'fill-1' : ''}`}>
            {tab.icon}
          </span>
          <span className="text-[8px] font-bold uppercase tracking-tighter">{tab.label}</span>
        </button>
      ))}
    </nav>
  );
};

export default BottomNav;
