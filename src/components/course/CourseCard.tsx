import { motion } from 'framer-motion';
import { BookOpen, Clock, Star, Crown, Lock } from 'lucide-react';
import { Card } from '../common/Card';
import type { Course } from '../../types';

interface CourseCardProps {
  course: Course;
  onClick: () => void;
  progress?: number;
  isLocked?: boolean;
}

export function CourseCard({ course, onClick, progress = 0, isLocked = false }: CourseCardProps) {
  const languageFlags: Record<string, string> = {
    en: '🇬🇧',
    ja: '🇯🇵',
    ko: '🇰🇷',
  };

  const levelColors: Record<string, string> = {
    beginner: 'bg-secondary-100 text-secondary-700',
    intermediate: 'bg-accent-100 text-accent-700',
    advanced: 'bg-red-100 text-red-700',
  };

  const totalLessons = course.lessons.length;
  const completedLessons = Math.floor((progress / 100) * totalLessons);

  return (
    <motion.div
      whileHover={!isLocked ? { y: -4 } : {}}
      whileTap={!isLocked ? { scale: 0.98 } : {}}
      onClick={onClick}
      className={isLocked ? 'cursor-default' : 'cursor-pointer'}
    >
      <Card hover={!isLocked} padding="none" className={`overflow-hidden ${isLocked ? 'opacity-90' : ''}`}>
        <div className="relative h-36 overflow-hidden">
          <img
            src={course.thumbnail}
            alt={course.title}
            className={`w-full h-full object-cover ${isLocked ? 'blur-sm' : ''}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900/60 to-transparent" />
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <span className="text-2xl">{languageFlags[course.language]}</span>
            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${levelColors[course.level]}`}>
              {course.level === 'beginner' ? '初级' : course.level === 'intermediate' ? '中级' : '高级'}
            </span>
          </div>
          {course.isVip && (
            <div className="absolute top-3 right-3">
              <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-medium shadow-lg">
                <Crown className="w-3 h-3" />
                VIP
              </span>
            </div>
          )}
          {isLocked && (
            <div className="absolute inset-0 bg-dark-900/40 flex items-center justify-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                <Lock className="w-8 h-8 text-white" />
              </div>
            </div>
          )}
          <div className="absolute bottom-3 left-3 right-3">
            <h3 className="font-heading font-semibold text-white text-lg line-clamp-1">
              {course.title}
            </h3>
          </div>
        </div>

        <div className="p-4">
          <p className="text-dark-500 text-sm line-clamp-2 mb-3">{course.description}</p>

          <div className="flex items-center justify-between text-sm text-dark-400 mb-3">
            <div className="flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              <span>{totalLessons} 课时</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{course.lessons.reduce((sum, l) => sum + l.duration, 0)} 分钟</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-accent-500" />
              <span>{course.xpReward} XP</span>
            </div>
          </div>

          {isLocked && course.price && (
            <div className="flex items-center justify-between pt-3 border-t border-dark-100">
              <span className="text-dark-500 text-sm">解锁课程</span>
              <span className="text-lg font-bold text-primary-600">
                ¥{course.price}
              </span>
            </div>
          )}

          {!isLocked && progress > 0 && (
            <div className="space-y-1">
              <div className="h-2 bg-dark-100 rounded-full overflow-hidden">
                <motion.div
                  className="h-full gradient-primary rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <p className="text-xs text-dark-400">
                已完成 {completedLessons}/{totalLessons} 课时
              </p>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}
