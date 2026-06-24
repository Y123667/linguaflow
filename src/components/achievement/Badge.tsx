import { motion } from 'framer-motion';
import { Medal, Lock, Baby, Flame, BookOpen, Mic, Trophy, Calendar, Headphones, GraduationCap, type LucideIcon } from 'lucide-react';
import { clsx } from 'clsx';
import type { Achievement, Rarity } from '../../types';

interface BadgeProps {
  achievement: Achievement;
  isUnlocked: boolean;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

const iconMap: Record<string, LucideIcon> = {
  Baby,
  Flame,
  BookOpen,
  Mic,
  Trophy,
  Calendar,
  Headphones,
  GraduationCap,
  Medal,
};

const rarityColors: Record<Rarity, { bg: string; border: string; glow: string }> = {
  common: {
    bg: 'bg-dark-100',
    border: 'border-dark-300',
    glow: 'shadow-dark-200',
  },
  rare: {
    bg: 'bg-blue-100',
    border: 'border-blue-300',
    glow: 'shadow-blue-400/30',
  },
  epic: {
    bg: 'bg-purple-100',
    border: 'border-purple-300',
    glow: 'shadow-purple-400/30',
  },
  legendary: {
    bg: 'bg-accent-100',
    border: 'border-accent-400',
    glow: 'shadow-accent-400/40',
  },
};

const rarityLabels: Record<Rarity, string> = {
  common: '普通',
  rare: '稀有',
  epic: '史诗',
  legendary: '传说',
};

export function Badge({ achievement, isUnlocked, size = 'md', onClick }: BadgeProps) {
  const IconComponent = iconMap[achievement.icon] || Medal;

  const sizes = {
    sm: { wrapper: 'w-20', icon: 'w-8 h-8', text: 'text-xs' },
    md: { wrapper: 'w-28', icon: 'w-12 h-12', text: 'text-sm' },
    lg: { wrapper: 'w-36', icon: 'w-16 h-16', text: 'text-base' },
  };

  const colors = rarityColors[achievement.rarity];

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={clsx(
        'flex flex-col items-center gap-2 p-3 rounded-2xl transition-all',
        isUnlocked ? colors.bg : 'bg-dark-50',
        isUnlocked ? colors.border : 'border-dark-200',
        'border-2'
      )}
    >
      <div className={clsx(
        'relative rounded-full flex items-center justify-center',
        sizes[size].wrapper,
        isUnlocked ? colors.glow : '',
        'shadow-lg'
      )}>
        {isUnlocked ? (
          <>
            <div className={clsx(
              'absolute inset-0 rounded-full opacity-30',
              achievement.rarity === 'legendary' ? 'bg-accent-400 animate-pulse' :
              achievement.rarity === 'epic' ? 'bg-purple-400 animate-pulse' :
              achievement.rarity === 'rare' ? 'bg-blue-400 animate-pulse' : 'bg-dark-300'
            )} />
            <IconComponent className={clsx(
              sizes[size].icon,
              achievement.rarity === 'legendary' ? 'text-accent-500' :
              achievement.rarity === 'epic' ? 'text-purple-500' :
              achievement.rarity === 'rare' ? 'text-blue-500' : 'text-dark-500'
            )} />
          </>
        ) : (
          <div className="w-full h-full rounded-full bg-dark-200 flex items-center justify-center">
            <Lock className={clsx(sizes[size].icon, 'text-dark-400')} />
          </div>
        )}
      </div>

      <div className="text-center">
        <p className={clsx('font-medium', sizes[size].text, isUnlocked ? 'text-dark-800' : 'text-dark-400')}>
          {achievement.title}
        </p>
        {isUnlocked && (
          <span className={clsx(
            'text-xs px-1.5 py-0.5 rounded mt-1 inline-block',
            achievement.rarity === 'legendary' ? 'bg-accent-100 text-accent-700' :
            achievement.rarity === 'epic' ? 'bg-purple-100 text-purple-700' :
            achievement.rarity === 'rare' ? 'bg-blue-100 text-blue-700' :
            'bg-dark-200 text-dark-500'
          )}>
            {rarityLabels[achievement.rarity]}
          </span>
        )}
      </div>
    </motion.button>
  );
}
