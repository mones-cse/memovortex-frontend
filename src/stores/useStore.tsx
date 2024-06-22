import { create } from "zustand";

interface MeoVortexState {
  count: number;
  setCount: () => void;
}

export const useStore = create<MeoVortexState>((set) => ({
  count: 1,
  setCount: () => set((state) => ({ count: state.count + 1 })),
}));
