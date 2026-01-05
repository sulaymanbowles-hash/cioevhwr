import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Order {
  id: string;
  date: string;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  total: number;
  items: {
    partNumber: string;
    name: string;
    quantity: number;
    price: number;
  }[];
  trackingNumber?: string;
}

export interface Document {
  id: string;
  name: string;
  type: 'CofC' | '8130-3' | 'Invoice' | 'Packing List';
  date: string;
  orderId: string;
  downloadUrl: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  company: string;
  role: 'Admin' | 'User';
}

interface ClientStore {
  user: User | null;
  orders: Order[];
  documents: Document[];
  isAuthenticated: boolean;
  login: (email: string) => void;
  logout: () => void;
  demoLogin: () => void;
}

const MOCK_ORDERS: Order[] = [
  {
    id: 'ORD-2024-001',
    date: '2024-03-15',
    status: 'Delivered',
    total: 1250.00,
    trackingNumber: '1Z999AA10123456784',
    items: [
      { partNumber: 'NAS6203-12', name: 'Hex Head Bolt', quantity: 500, price: 2.50 }
    ]
  },
  {
    id: 'ORD-2024-002',
    date: '2024-03-20',
    status: 'Shipped',
    total: 3450.50,
    trackingNumber: '1Z999AA10123456785',
    items: [
      { partNumber: 'MS21042-3', name: 'Self-Locking Nut', quantity: 1000, price: 1.25 },
      { partNumber: 'AN960-10', name: 'Flat Washer', quantity: 2000, price: 1.10 }
    ]
  },
  {
    id: 'ORD-2024-003',
    date: '2024-03-25',
    status: 'Processing',
    total: 850.00,
    items: [
      { partNumber: 'MS20470AD4-4', name: 'Universal Head Rivet', quantity: 5000, price: 0.17 }
    ]
  }
];

const MOCK_DOCUMENTS: Document[] = [
  { id: 'DOC-001', name: 'Certificate of Conformance', type: 'CofC', date: '2024-03-15', orderId: 'ORD-2024-001', downloadUrl: '#' },
  { id: 'DOC-002', name: 'FAA Form 8130-3', type: '8130-3', date: '2024-03-15', orderId: 'ORD-2024-001', downloadUrl: '#' },
  { id: 'DOC-003', name: 'Invoice #INV-2024-001', type: 'Invoice', date: '2024-03-15', orderId: 'ORD-2024-001', downloadUrl: '#' },
  { id: 'DOC-004', name: 'Certificate of Conformance', type: 'CofC', date: '2024-03-20', orderId: 'ORD-2024-002', downloadUrl: '#' },
  { id: 'DOC-005', name: 'Packing List', type: 'Packing List', date: '2024-03-20', orderId: 'ORD-2024-002', downloadUrl: '#' },
];

export const useClientStore = create<ClientStore>()(
  persist(
    (set) => ({
      user: null,
      orders: [],
      documents: [],
      isAuthenticated: false,

      login: (email) => {
        // Simulate login
        set({
          user: {
            id: 'usr_123',
            name: 'John Doe',
            email: email,
            company: 'Acme Aerospace',
            role: 'User'
          },
          isAuthenticated: true,
          orders: MOCK_ORDERS,
          documents: MOCK_DOCUMENTS
        });
      },

      demoLogin: () => {
        set({
          user: {
            id: 'demo_user',
            name: 'Demo User',
            email: 'demo@example.com',
            company: 'Demo Corp',
            role: 'User'
          },
          isAuthenticated: true,
          orders: MOCK_ORDERS,
          documents: MOCK_DOCUMENTS
        });
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          orders: [],
          documents: []
        });
      }
    }),
    {
      name: 'client-storage',
    }
  )
);
