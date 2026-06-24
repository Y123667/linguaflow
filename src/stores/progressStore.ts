import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { LearningProgress, DailyTask } from '../types';
import { mockDailyTasks } from '../data/mockData';

interface ProgressState {
  progress: Record<string, LearningProgress>;
  dailyTasks: DailyTask[];
  updateProgress: (courseId: string, lessonId: string, score: number) => void;
  getProgress: (courseId: string) => LearningProgress | undefined;
  completeTask: (taskId: string) => void;
  resetDailyTasks: () => void;
  getAbilityRadar: () => { vocabulary: number; grammar: number; speaking: number; listening: number };
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      progress: {},
      dailyTasks: mockDailyTasks,

      updateProgress: (courseId: string, lessonId: string, score: number) => {
        const userId = JSON.parse(localStorage.getItem('auth-storage') || '{}')?.state?.user?.id || 'guest';
        const key = `${userId}-${courseId}`;
        const currentProgress = get().progress[key] || {
          userId,
          courseId,
          completedLessons: [],
          quizScores: {},
          lastStudyDate: new Date().toISOString(),
          totalStudyTime: 0,
        };

        const updatedProgress: LearningProgress = {
          ...currentProgress,
          completedLessons: currentProgress.completedLessons.includes(lessonId)
            ? currentProgress.completedLessons
            : [...currentProgress.completedLessons, lessonId],
          quizScores: { ...currentProgress.quizScores, [lessonId]: score },
          lastStudyDate: new Date().toISOString(),
          totalStudyTime: currentProgress.totalStudyTime + 1,
        };

        set({ progress: { ...get().progress, [key]: updatedProgress } });
      },

      getProgress: (courseId: string) => {
        const userId = JSON.parse(localStorage.getItem('auth-storage') || '{}')?.state?.user?.id || 'guest';
        const key = `${userId}-${courseId}`;
        return get().progress[key];
      },

      completeTask: (taskId: string) => {
        const tasks = get().dailyTasks.map(task =>
          task.id === taskId ? { ...task, completed: true } : task
        );
        set({ dailyTasks: tasks });
      },

      resetDailyTasks: () => {
        set({ dailyTasks: mockDailyTasks.map(task => ({ ...task, completed: false })) });
      },

      getAbilityRadar: () => {
        const progressValues = Object.values(get().progress);
        let vocabulary = 0, grammar = 0, speaking = 0, listening = 0;

        progressValues.forEach(p => {
          vocabulary += p.completedLessons.filter(id => id.includes('vocab')).length * 10;
          grammar += p.completedLessons.filter(id => id.includes('grammar')).length * 10;
          speaking += p.completedLessons.filter(id => id.includes('speaking')).length * 10;
          listening += p.completedLessons.filter(id => id.includes('listening')).length * 10;
        });

        return {
          vocabulary: Math.min(100, vocabulary),
          grammar: Math.min(100, grammar),
          speaking: Math.min(100, speaking),
          listening: Math.min(100, listening),
        };
      },
    }),
    {
      name: 'progress-storage',
    }
  )
);
