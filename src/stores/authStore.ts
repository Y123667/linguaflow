import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, Language } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  register: (email: string, password: string, nickname: string, targetLanguage: Language) => boolean;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  addXp: (amount: number) => void;
  incrementStreak: () => void;
  setVip: (vip: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      login: (email: string, password: string) => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find((u: User) => u.email === email);
        if (user) {
          set({ user, isAuthenticated: true });
          return true;
        }
        return false;
      },

      register: (email: string, password: string, nickname: string, targetLanguage: Language) => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        if (users.some((u: User) => u.email === email)) {
          return false;
        }
        const newUser: User = {
          id: `user-${Date.now()}`,
          email,
          nickname,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${nickname}`,
          targetLanguage,
          level: 1,
          xp: 0,
          streak: 0,
          vip: false,
          joinedAt: new Date().toISOString(),
        };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        set({ user: newUser, isAuthenticated: true });
        return true;
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      updateProfile: (updates: Partial<User>) => {
        const currentUser = get().user;
        if (currentUser) {
          const updatedUser = { ...currentUser, ...updates };
          const users = JSON.parse(localStorage.getItem('users') || '[]');
          const index = users.findIndex((u: User) => u.id === currentUser.id);
          if (index !== -1) {
            users[index] = updatedUser;
            localStorage.setItem('users', JSON.stringify(users));
          }
          set({ user: updatedUser });
        }
      },

      addXp: (amount: number) => {
        const currentUser = get().user;
        if (currentUser) {
          const newXp = currentUser.xp + amount;
          const newLevel = Math.floor(newXp / 1000) + 1;
          get().updateProfile({ xp: newXp, level: newLevel });
        }
      },

      incrementStreak: () => {
        const currentUser = get().user;
        if (currentUser) {
          get().updateProfile({ streak: currentUser.streak + 1 });
        }
      },

      setVip: (vip: boolean) => {
        get().updateProfile({ vip });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
