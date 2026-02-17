
import React, { useState } from 'react';
import { Screen, User, UserRole } from './types';
import Dashboard from './screens/Dashboard';
import POS from './screens/POS';
import Store from './screens/Store';
import Inspection from './screens/Inspection';
import Customers from './screens/Customers';
import Inventory from './screens/Inventory';
import ZReport from './screens/ZReport';
import Settings from './screens/Settings';
import BottomNav from './components/BottomNav';

const MOCK_USER: User = {
  id: 'u1',
  name: 'Admin Sparkle',
  role: UserRole.TOTAL
};

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.DASHBOARD);
  const [currentUser, setCurrentUser] = useState<User>(MOCK_USER);
  const [activeVehicle, setActiveVehicle] = useState<any>(null);

  const renderScreen = () => {
    switch (currentScreen) {
      case Screen.DASHBOARD:
        return (
          <Dashboard 
            user={currentUser} 
            onSwitchRole={(role) => setCurrentUser({...currentUser, role})}
            onNewOrder={() => setCurrentScreen(Screen.POS)} 
          />
        );
      case Screen.POS:
        return <POS onProceed={(vehicle) => {
          setActiveVehicle(vehicle);
          setCurrentScreen(Screen.INSPECTION);
        }} />;
      case Screen.STORE:
        return <Store />;
      case Screen.INSPECTION:
        return <Inspection vehicle={activeVehicle} onFinish={() => setCurrentScreen(Screen.DASHBOARD)} />;
      case Screen.CUSTOMERS:
        return <Customers />;
      case Screen.INVENTORY:
        return <Inventory />;
      case Screen.ZREPORT:
        if (currentUser.role === UserRole.ENCARGADO) {
          return <div className="p-10 text-center font-bold text-slate-400">Acceso Denegado.</div>;
        }
        return <ZReport />;
      case Screen.SETTINGS:
        if (currentUser.role !== UserRole.TOTAL) {
          return <div className="p-10 text-center font-bold text-slate-400">Acceso exclusivo para el Dueño.</div>;
        }
        return <Settings />;
      default:
        return <Dashboard user={currentUser} onSwitchRole={(role) => setCurrentUser({...currentUser, role})} onNewOrder={() => setCurrentScreen(Screen.POS)} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen max-w-md mx-auto bg-white shadow-2xl relative overflow-hidden">
      <main className="flex-1 overflow-y-auto pb-20 no-scrollbar">
        {renderScreen()}
      </main>
      <BottomNav userRole={currentUser.role} active={currentScreen} onNavigate={setCurrentScreen} />
    </div>
  );
};

export default App;
