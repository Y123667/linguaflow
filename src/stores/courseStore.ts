import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { mockCourses } from '../data/mockData';
import type { Course, Language, CourseLevel } from '../types';

interface CourseState {
  courses: Course[];
  selectedLanguage: Language | null;
  selectedLevel: CourseLevel | null;
  getFilteredCourses: () => Course[];
  setSelectedLanguage: (language: Language | null) => void;
  setSelectedLevel: (level: CourseLevel | null) => void;
  getCourseById: (id: string) => Course | undefined;
}

export const useCourseStore = create<CourseState>()(
  persist(
    (set, get) => ({
      courses: mockCourses,
      selectedLanguage: null,
      selectedLevel: null,

      getFilteredCourses: () => {
        const { courses, selectedLanguage, selectedLevel } = get();
        return courses.filter(course => {
          if (selectedLanguage && course.language !== selectedLanguage) return false;
          if (selectedLevel && course.level !== selectedLevel) return false;
          return true;
        });
      },

      setSelectedLanguage: (language: Language | null) => {
        set({ selectedLanguage: language });
      },

      setSelectedLevel: (level: CourseLevel | null) => {
        set({ selectedLevel: level });
      },

      getCourseById: (id: string) => {
        return get().courses.find(course => course.id === id);
      },
    }),
    {
      name: 'course-storage',
    }
  )
);
