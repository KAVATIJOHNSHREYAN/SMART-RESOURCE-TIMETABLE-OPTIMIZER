import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Role = 'ADMIN' | 'FACULTY' | 'STUDENT';

interface User {
  id: number;
  email: string;
  full_name: string;
  role: Role;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: (user, token) => set({ user, token, isAuthenticated: true }),
      logout: () => set({ user: null, token: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage',
    }
  )
);
