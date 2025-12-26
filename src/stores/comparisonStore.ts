import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CompareProduct {
  partNumber: string;
  title: string;
  slug: string;
  category: string;
  material: string;
  threadType?: string;
  specification: string;
  modelFile: string;
}

interface ComparisonStore {
  products: CompareProduct[];
  addProduct: (product: CompareProduct) => void;
  removeProduct: (partNumber: string) => void;
  clearAll: () => void;
  isComparing: (partNumber: string) => boolean;
}

export const useComparisonStore = create<ComparisonStore>()(
  persist(
    (set, get) => ({
      products: [],
      addProduct: (product) =>
        set((state) => {
          // Don't add if already exists
          if (state.products.some(p => p.partNumber === product.partNumber)) {
            return state;
          }
          // Limit to 4 products
          if (state.products.length >= 4) {
            return state;
          }
          return { products: [...state.products, product] };
        }),
      removeProduct: (partNumber) =>
        set((state) => ({
          products: state.products.filter((p) => p.partNumber !== partNumber),
        })),
      clearAll: () => set({ products: [] }),
      isComparing: (partNumber) =>
        get().products.some((p) => p.partNumber === partNumber),
    }),
    {
      name: 'comparison-storage',
    }
  )
);
