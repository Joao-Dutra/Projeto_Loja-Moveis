import { create } from 'zustand';
import { CartItem } from '../types';

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  updateAssemblyOption: (itemId: string, option: string) => void; // Novo método
  clearCart: () => void;
  total: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],

  addItem: (item) =>
    set((state) => {
      const existingItem = state.items.find((i) => i.id === Number(item.id));
      if (existingItem) {
        return {
          items: state.items.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
          ),
        };
      }
      return { items: [...state.items, item] };
    }),

  removeItem: (itemId) =>
    set((state) => ({
      items: state.items.filter((i) => i.id !== Number(itemId)),
    })),

  updateQuantity: (itemId, quantity) =>
    set((state) => ({
      items: state.items.map((i) =>
        i.id === Number(itemId) ? { ...i, quantity } : i
      ),
    })),

  updateAssemblyOption: (itemId, option) => // Novo método para atualizar o tipo de montagem
    set((state) => ({
      items: state.items.map((i) =>
        i.id === Number(itemId) ? { ...i, assemblyOption: option } : i
      ),
    })),

  clearCart: () => set({ items: [] }),

  total: () => {
    const items = get().items;
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  },
}));
