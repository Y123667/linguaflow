import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { mockAchievements } from '../data/mockData';
import type { Achievement } from '../types';

interface AchievementState {
  achievements: Achievement[];
  unlockedIds: string[];
  checkAndUnlock: (criteria: string) => void;
  isUnlocked: (id: string) => boolean;
  getUnlockedAchievements: () => Achievement[];
  getTotalXpFromAchievements: () => number;
}

export const useAchievementStore = create<AchievementState>()(
  persist(
    (set, get) => ({
      achievements: mockAchievements,
      unlockedIds: [],

      checkAndUnlock: (criteria: string) => {
        const achievement = get().achievements.find(a => a.unlockCriteria === criteria);
        if (achievement && !get().unlockedIds.includes(achievement.id)) {
          set({ unlockedIds: [...get().unlockedIds, achievement.id] });
        }
      },

      isUnlocked: (id: string) => {
        return get().unlockedIds.includes(id);
      },

      getUnlockedAchievements: () => {
        return get().achievements.filter(a => get().unlockedIds.includes(a.id));
      },

      getTotalXpFromAchievements: () => {
        return get().getUnlockedAchievements().reduce((sum, a) => sum + a.xpReward, 0);
      },
    }),
    {
      name: 'achievement-storage',
    }
  )
);
