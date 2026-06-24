import { motion } from 'framer-motion';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { TrendingUp, BookOpen, Mic, Headphones, Award } from 'lucide-react';
import { useProgressStore } from '../stores/progressStore';
import { useAuthStore } from '../stores/authStore';
import { Card } from '../components/common/Card';
import { ProgressRing } from '../components/common/ProgressRing';

export function Progress() {
  const { user } = useAuthStore();
  const { getAbilityRadar } = useProgressStore();
  const abilities = getAbilityRadar();

  const radarData = [
    { subject: '词汇', A: abilities.vocabulary, fullMark: 100 },
    { subject: '语法', A: abilities.grammar, fullMark: 100 },
    { subject: '口语', A: abilities.speaking, fullMark: 100 },
    { subject: '听力', A: abilities.listening, fullMark: 100 },
  ];

  const weeklyData = [
    { day: '周一', xp: 120 },
    { day: '周二', xp: 80 },
    { day: '周三', xp: 150 },
    { day: '周四', xp: 90 },
    { day: '周五', xp: 200 },
    { day: '周六', xp: 180 },
    { day: '周日', xp: 100 },
  ];

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto pb-24 lg:pb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl lg:text-3xl font-heading font-bold text-dark-800">学习进度</h1>
        <p className="text-dark-500 mt-1">追踪你的学习轨迹,见证每一步成长</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <h2 className="font-heading font-semibold text-lg text-dark-800 mb-6">能力雷达图</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#E2E8F0" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748B', fontSize: 12 }} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#64748B', fontSize: 10 }} />
                  <Radar
                    name="能力值"
                    dataKey="A"
                    stroke="#6366F1"
                    fill="#6366F1"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-100 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <p className="font-medium text-dark-800">{abilities.vocabulary}%</p>
                  <p className="text-xs text-dark-400">词汇掌握</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-secondary-100 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-secondary-600" />
                </div>
                <div>
                  <p className="font-medium text-dark-800">{abilities.grammar}%</p>
                  <p className="text-xs text-dark-400">语法理解</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent-100 flex items-center justify-center">
                  <Mic className="w-5 h-5 text-accent-600" />
                </div>
                <div>
                  <p className="font-medium text-dark-800">{abilities.speaking}%</p>
                  <p className="text-xs text-dark-400">口语表达</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                  <Headphones className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-dark-800">{abilities.listening}%</p>
                  <p className="text-xs text-dark-400">听力理解</p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <h2 className="font-heading font-semibold text-lg text-dark-800 mb-6">本周学习趋势</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis dataKey="day" tick={{ fill: '#64748B', fontSize: 12 }} />
                  <YAxis tick={{ fill: '#64748B', fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #E2E8F0',
                      borderRadius: '12px',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="xp"
                    stroke="#6366F1"
                    strokeWidth={3}
                    dot={{ fill: '#6366F1', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-heading font-semibold text-lg text-dark-800">学习总览</h2>
            <Award className="w-5 h-5 text-accent-500" />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <ProgressRing progress={((user?.xp || 0) % 1000) / 10} size={100} color="primary" />
              <p className="mt-3 font-medium text-dark-800">当前等级</p>
              <p className="text-sm text-dark-500">Lv.{user?.level || 1}</p>
            </div>
            <div className="text-center">
              <ProgressRing progress={30} size={100} color="secondary" />
              <p className="mt-3 font-medium text-dark-800">课程完成</p>
              <p className="text-sm text-dark-500">0 / 5 课程</p>
            </div>
            <div className="text-center">
              <ProgressRing progress={20} size={100} color="accent" />
              <p className="mt-3 font-medium text-dark-800">学习天数</p>
              <p className="text-sm text-dark-500">{user?.streak || 0} 天</p>
            </div>
            <div className="text-center">
              <ProgressRing progress={15} size={100} color="primary" />
              <p className="mt-3 font-medium text-dark-800">累计学习</p>
              <p className="text-sm text-dark-500">0 分钟</p>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
