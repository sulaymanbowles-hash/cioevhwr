import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface RecentProduct {
  partNumber: string;
  title: string;
  slug: string;
  category: string;
  modelFile: string;
  viewedAt: number;
}

interface RecentlyViewedStore {
  products: RecentProduct[];
  addProduct: (product: Omit<RecentProduct, 'viewedAt'>) => void;
  clearAll: () => void;
}

export const useRecentlyViewedStore = create<RecentlyViewedStore>()(
  persist(
    (set) => ({
      products: [],
      addProduct: (product) =>
        set((state) => {
          // Remove if already exists
          const filtered = state.products.filter(
            (p) => p.slug !== product.slug
          );
          
          // Add to beginning with timestamp
          const newProducts = [
            { ...product, viewedAt: Date.now() },
            ...filtered,
          ].slice(0, 10); // Keep only last 10

          return { products: newProducts };
        }),
      clearAll: () => set({ products: [] }),
    }),
    {
      name: 'recently-viewed-storage',
    }
  )
);
