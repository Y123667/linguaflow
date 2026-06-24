import { motion } from 'framer-motion';
import { Trophy, Medal, Flame } from 'lucide-react';
import { clsx } from 'clsx';
import type { User } from '../../types';

interface LeaderboardProps {
  users: User[];
  currentUserId?: string;
}

export function Leaderboard({ users, currentUserId }: LeaderboardProps) {
  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="w-6 h-6 text-accent-500" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-dark-400" />;
    if (rank === 3) return <Medal className="w-6 h-6 text-amber-600" />;
    return <span className="font-bold text-dark-500">{rank}</span>;
  };

  const getRankBg = (rank: number) => {
    if (rank === 1) return 'bg-gradient-to-r from-accent-50 to-accent-100 border-accent-200';
    if (rank === 2) return 'bg-gradient-to-r from-dark-100 to-dark-50 border-dark-200';
    if (rank === 3) return 'bg-gradient-to-r from-amber-50 to-amber-100 border-amber-200';
    return 'bg-white border-dark-200';
  };

  return (
    <div className="space-y-3">
      {users.map((user, index) => {
        const rank = index + 1;
        const isCurrentUser = user.id === currentUserId;

        return (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={clsx(
              'flex items-center gap-4 p-4 rounded-xl border-2 transition-all',
              getRankBg(rank),
              isCurrentUser && 'ring-2 ring-primary-400 ring-offset-2'
            )}
          >
            <div className="w-10 h-10 flex items-center justify-center">
              {getRankIcon(rank)}
            </div>

            <img
              src={user.avatar}
              alt={user.nickname}
              className="w-12 h-12 rounded-full ring-2 ring-white shadow"
            />

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="font-medium text-dark-800 truncate">{user.nickname}</p>
                {user.vip && (
                  <span className="px-1.5 py-0.5 rounded bg-accent-100 text-accent-600 text-xs font-medium">
                    VIP
                  </span>
                )}
                {isCurrentUser && (
                  <span className="px-1.5 py-0.5 rounded bg-primary-100 text-primary-600 text-xs font-medium">
                    我
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3 text-sm text-dark-500 mt-0.5">
                <span>Lv.{user.level}</span>
                <span className="flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-accent-500" />
                  {user.streak}天
                </span>
              </div>
            </div>

            <div className="text-right">
              <p className="font-bold text-lg text-primary-600">{user.xp.toLocaleString()}</p>
              <p className="text-xs text-dark-400">XP</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
