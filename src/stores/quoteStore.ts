import { create } from 'zustand';

interface QuoteItem {
  partNumber: string;
  title: string;
  quantity: number;
}

interface QuoteStore {
  items: QuoteItem[];
  addItem: (item: Omit<QuoteItem, 'quantity'>) => void;
  removeItem: (partNumber: string) => void;
  updateQuantity: (partNumber: string, quantity: number) => void;
  clearQuote: () => void;
}

export const useQuoteStore = create<QuoteStore>((set) => ({
  items: [],
  
  addItem: (item) => set((state) => {
    const existingItem = state.items.find(i => i.partNumber === item.partNumber);
    if (existingItem) {
      return {
        items: state.items.map(i =>
          i.partNumber === item.partNumber
            ? { ...i, quantity: i.quantity + 1 }
            : i
        )
      };
    }
    return {
      items: [...state.items, { ...item, quantity: 1 }]
    };
  }),
  
  removeItem: (partNumber) => set((state) => ({
    items: state.items.filter(i => i.partNumber !== partNumber)
  })),
  
  updateQuantity: (partNumber, quantity) => set((state) => ({
    items: state.items.map(i =>
      i.partNumber === partNumber
        ? { ...i, quantity }
        : i
    )
  })),
  
  clearQuote: () => set({ items: [] })
}));
