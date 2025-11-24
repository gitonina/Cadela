import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, UserRole } from '../types/user';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  role: UserRole | null;

  setUser: (user: User) => void;
  clearUser: () => void;
  setRole: (role: UserRole) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      role: null,

      setUser: (user: User) => set({
        user,
        isAuthenticated: !!user,
      }),

      clearUser: () => set({
        user: null,
        isAuthenticated: false,
        role: null,
      }),

      setRole: (role: UserRole) => set({ role }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        role: state.role,
      }),
    }
  )
);
