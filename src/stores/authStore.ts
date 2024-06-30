import { create } from "zustand";
import type { AuthStore } from "./../types/auth.type";

export const useAuthStore = create<AuthStore>((set) => ({
	user: null,
	isAuthenticated: false,
	setUser: (user) => set({ user }),
	setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
}));
