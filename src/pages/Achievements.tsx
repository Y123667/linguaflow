import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Filter } from 'lucide-react';
import { useAchievementStore } from '../stores/achievementStore';
import { Card } from '../components/common/Card';
import { Badge } from '../components/achievement/Badge';
import { Leaderboard } from '../components/achievement/Leaderboard';
import { mockLeaderboard } from '../data/mockData';
import { useAuthStore } from '../stores/authStore';
import type { Rarity } from '../types';

const rarities: { value: Rarity | 'all'; label: string }[] = [
  { value: 'all', label: '全部' },
  { value: 'common', label: '普通' },
  { value: 'rare', label: '稀有' },
  { value: 'epic', label: '史诗' },
  { value: 'legendary', label: '传说' },
];

export function Achievements() {
  const { achievements, isUnlocked } = useAchievementStore();
  const { user } = useAuthStore();
  const [selectedRarity, setSelectedRarity] = useState<Rarity | 'all'>('all');

  const filteredAchievements = selectedRarity === 'all'
    ? achievements
    : achievements.filter(a => a.rarity === selectedRarity);

  const unlockedCount = achievements.filter(a => isUnlocked(a.id)).length;

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto pb-24 lg:pb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl lg:text-3xl font-heading font-bold text-dark-800">成就中心</h1>
        <p className="text-dark-500 mt-1">解锁成就,收集徽章,成为学习达人</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2"
        >
          <Card>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Trophy className="w-6 h-6 text-accent-500" />
                <h2 className="font-heading font-semibold text-lg text-dark-800">我的徽章</h2>
                <span className="px-2 py-0.5 rounded-full bg-primary-100 text-primary-600 text-sm">
                  {unlockedCount} / {achievements.length}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-dark-400" />
                {rarities.map((r) => (
                  <button
                    key={r.value}
                    onClick={() => setSelectedRarity(r.value)}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                      selectedRarity === r.value
                        ? 'bg-primary-500 text-white'
                        : 'bg-dark-100 text-dark-600 hover:bg-dark-200'
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {filteredAchievements.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.05 * index }}
                >
                  <Badge
                    achievement={achievement}
                    isUnlocked={isUnlocked(achievement.id)}
                    size="md"
                  />
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <h2 className="font-heading font-semibold text-lg text-dark-800 mb-4">排行榜</h2>
            <Leaderboard users={mockLeaderboard} currentUserId={user?.id} />
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
