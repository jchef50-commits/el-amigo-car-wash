
export enum Screen {
  DASHBOARD = 'DASHBOARD',
  POS = 'POS',
  STORE = 'STORE',
  INSPECTION = 'INSPECTION',
  CUSTOMERS = 'CUSTOMERS',
  INVENTORY = 'INVENTORY',
  ZREPORT = 'ZREPORT',
  SETTINGS = 'SETTINGS'
}

export enum UserRole {
  TOTAL = 'TOTAL',
  GERENTE = 'GERENTE',
  ENCARGADO = 'ENCARGADO'
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
}

export interface TicketSettings {
  businessName: string;
  taxId: string;
  address: string;
  phone: string;
  headerMessage: string;
  footerMessage: string;
  paperSize: '58mm' | '80mm';
}

export interface PayrollSettings {
  washerCommissionPercent: number;
  managerBaseSalary: number;
  managerServiceCommissionPercent: number;
}

export interface CameraConfig {
  ipAddress: string;
  snapshotUrl: string;
  autoCaptureDelay: number;
}

export interface Vehicle {
  plate: string;
  model: string;
  color: string;
  type: 'sedan' | 'suv' | 'truck' | 'moto';
}

export interface ServicePackage {
  id: string;
  name: string;
  price: number;
  duration: string;
  icon: string;
  color: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  image: string;
}

export interface BayStatus {
  id: number;
  vehicle?: Vehicle;
  service?: string;
  price?: number;
  phase?: string;
  progress: number;
  timeRemaining: string;
  status: 'active' | 'ready' | 'finishing' | 'delayed';
  imageUrl?: string;
  washerName?: string;
  entryTime?: string;
  auditSnapshotUrl?: string; 
}
