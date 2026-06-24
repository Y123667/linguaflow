import { motion } from 'framer-motion';
import { Play, CheckCircle, BookOpen, FileText, Mic, Headphones, Lock } from 'lucide-react';
import { clsx } from 'clsx';
import type { Lesson } from '../../types';

interface LessonItemProps {
  lesson: Lesson;
  index: number;
  isCompleted?: boolean;
  isLocked?: boolean;
  onClick: () => void;
}

const lessonTypeIcons = {
  vocabulary: BookOpen,
  grammar: FileText,
  speaking: Mic,
  listening: Headphones,
};

const lessonTypeColors = {
  vocabulary: 'bg-primary-100 text-primary-600',
  grammar: 'bg-secondary-100 text-secondary-600',
  speaking: 'bg-accent-100 text-accent-600',
  listening: 'bg-purple-100 text-purple-600',
};

const lessonTypeNames = {
  vocabulary: '单词',
  grammar: '语法',
  speaking: '口语',
  listening: '听力',
};

export function LessonItem({ lesson, index, isCompleted, isLocked, onClick }: LessonItemProps) {
  const Icon = lessonTypeIcons[lesson.type];

  return (
    <motion.button
      onClick={onClick}
      whileHover={!isLocked ? { x: 4 } : {}}
      whileTap={!isLocked ? { scale: 0.98 } : {}}
      className={clsx(
        'w-full flex items-center gap-4 p-4 rounded-xl transition-all',
        isCompleted ? 'bg-secondary-50' : isLocked ? 'bg-dark-50' : 'bg-white hover:bg-dark-50',
        isLocked
          ? 'border border-dark-200 cursor-not-allowed'
          : 'border border-dark-200 hover:border-primary-200'
      )}
    >
      <div className={clsx(
        'w-12 h-12 rounded-xl flex items-center justify-center',
        isLocked ? 'bg-dark-200 text-dark-400' : lessonTypeColors[lesson.type]
      )}>
        {isCompleted ? (
          <CheckCircle className="w-6 h-6" />
        ) : isLocked ? (
          <Lock className="w-5 h-5" />
        ) : (
          <Icon className="w-6 h-6" />
        )}
      </div>

      <div className="flex-1 text-left">
        <div className="flex items-center gap-2">
          <span className="text-sm text-dark-400">第 {index + 1} 课</span>
          <span className={clsx(
            'px-2 py-0.5 rounded text-xs font-medium',
            isLocked ? 'bg-dark-200 text-dark-500' : lessonTypeColors[lesson.type]
          )}>
            {lessonTypeNames[lesson.type]}
          </span>
        </div>
        <h4 className={clsx(
          'font-medium mt-0.5',
          isLocked ? 'text-dark-400' : 'text-dark-800'
        )}>{lesson.title}</h4>
        <p className="text-sm text-dark-400 mt-0.5">{lesson.duration} 分钟</p>
      </div>

      <div className={clsx(
        'w-10 h-10 rounded-xl flex items-center justify-center',
        isCompleted
          ? 'bg-secondary-500 text-white'
          : isLocked
            ? 'bg-dark-200 text-dark-400'
            : 'bg-primary-500 text-white'
      )}>
        {isCompleted ? (
          <CheckCircle className="w-5 h-5" />
        ) : isLocked ? (
          <Lock className="w-4 h-4" />
        ) : (
          <Play className="w-5 h-5 ml-0.5" />
        )}
      </div>
    </motion.button>
  );
}
