import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Flame,
  Target,
  TrendingUp,
  BookOpen,
  Mic,
  Headphones,
  Calendar,
  ChevronRight,
  Crown,
  Sparkles,
} from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { useProgressStore } from '../stores/progressStore';
import { useCourseStore } from '../stores/courseStore';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { ProgressRing } from '../components/common/ProgressRing';
import { CourseCard } from '../components/course/CourseCard';

export function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { dailyTasks, completeTask } = useProgressStore();
  const { courses } = useCourseStore();

  const recommendedCourses = courses.slice(0, 3);
  const completedTasks = dailyTasks.filter(t => t.completed).length;
  const todayProgress = Math.round((completedTasks / dailyTasks.length) * 100);

  const weekDays = ['一', '二', '三', '四', '五', '六', '日'];
  const today = new Date().getDay();
  const streakDays = Array.from({ length: 7 }, (_, i) => {
    const dayIndex = i === 6 ? 0 : i + 1;
    return {
      day: weekDays[i],
      active: dayIndex <= today && (user?.streak || 0) >= dayIndex,
      isToday: dayIndex === today,
    };
  });

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto pb-24 lg:pb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl lg:text-3xl font-heading font-bold text-dark-800">
          你好, {user?.nickname}! 👋
        </h1>
        <p className="text-dark-500 mt-1">继续你的语言学习之旅吧</p>
      </motion.div>

      {!user?.vip && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="mb-8"
        >
          <Card
            padding="none"
            className="overflow-hidden bg-gradient-to-r from-accent-600 via-primary-600 to-primary-700 text-white cursor-pointer hover:shadow-lg transition-shadow"
          >
            <div
              onClick={() => navigate('/membership')}
              className="flex items-center justify-between p-6"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
                  <Crown className="w-7 h-7" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-heading font-bold text-lg">升级 VIP 会员</h3>
                    <span className="px-2 py-0.5 rounded-full bg-white/20 text-xs font-medium">
                      限时特惠
                    </span>
                  </div>
                  <p className="text-white/80 text-sm">
                    解锁全部 100+ 精品课程 · AI 口语评测 · 专属学习报告
                  </p>
                </div>
              </div>
              <div className="hidden sm:block">
                <div className="text-right">
                  <p className="text-3xl font-bold">¥299<span className="text-base font-normal opacity-80">/年</span></p>
                  <p className="text-sm opacity-70 line-through">原价 ¥468</p>
                </div>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 ml-4">
                <ChevronRight className="w-5 h-5" />
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="h-full">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-dark-500 mb-1">当前等级</p>
                <p className="text-3xl font-bold text-primary-600">Lv.{user?.level || 1}</p>
                <p className="text-sm text-dark-400 mt-1">{user?.xp || 0} / 1000 XP</p>
              </div>
              <ProgressRing progress={((user?.xp || 0) % 1000) / 10} size={80} color="primary" />
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="h-full">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Flame className="w-5 h-5 text-accent-500" />
                  <span className="text-sm text-dark-500">连续学习</span>
                </div>
                <p className="text-3xl font-bold text-accent-500">{user?.streak || 0} 天</p>
                <p className="text-sm text-dark-400 mt-1">保持学习热情!</p>
              </div>
              <div className="flex gap-1">
                {streakDays.map((d, i) => (
                  <div
                    key={i}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-medium ${
                      d.active
                        ? 'bg-accent-500 text-white'
                        : d.isToday
                          ? 'bg-primary-50 border-2 border-primary-300 text-primary-600'
                          : 'bg-dark-100 text-dark-400'
                    }`}
                  >
                    {d.day}
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="h-full">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-5 h-5 text-secondary-500" />
                  <span className="text-sm text-dark-500">今日目标</span>
                </div>
                <p className="text-3xl font-bold text-secondary-500">{completedTasks}/{dailyTasks.length}</p>
                <p className="text-sm text-dark-400 mt-1">任务完成</p>
              </div>
              <ProgressRing progress={todayProgress} size={80} color="secondary" />
            </div>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <h2 className="font-heading font-semibold text-lg text-dark-800 mb-4">今日任务</h2>
            <div className="space-y-3">
              {dailyTasks.map((task) => (
                <button
                  key={task.id}
                  onClick={() => !task.completed && completeTask(task.id)}
                  className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all ${
                    task.completed
                      ? 'bg-secondary-50 border border-secondary-200'
                      : 'bg-dark-50 hover:bg-dark-100 border border-transparent'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    task.completed ? 'bg-secondary-500 text-white' : 'bg-primary-100 text-primary-600'
                  }`}>
                    {task.type === 'lesson' && <BookOpen className="w-5 h-5" />}
                    {task.type === 'speaking' && <Mic className="w-5 h-5" />}
                    {task.type === 'listening' && <Headphones className="w-5 h-5" />}
                    {task.type === 'streak' && <Calendar className="w-5 h-5" />}
                    {task.type === 'quiz' && <Target className="w-5 h-5" />}
                  </div>
                  <div className="flex-1 text-left">
                    <p className={`font-medium ${task.completed ? 'text-secondary-700' : 'text-dark-700'}`}>
                      {task.title}
                    </p>
                    <p className="text-sm text-dark-400">{task.description}</p>
                  </div>
                  <span className="text-accent-500 font-medium">+{task.xpReward} XP</span>
                </button>
              ))}
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading font-semibold text-lg text-dark-800">学习统计</h2>
              <Button variant="ghost" size="sm" onClick={() => navigate('/progress')}>
                查看详情 <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-primary-50 rounded-xl">
                <TrendingUp className="w-6 h-6 text-primary-500 mb-2" />
                <p className="text-2xl font-bold text-primary-600">0</p>
                <p className="text-sm text-dark-500">本周学习时长</p>
              </div>
              <div className="p-4 bg-secondary-50 rounded-xl">
                <BookOpen className="w-6 h-6 text-secondary-500 mb-2" />
                <p className="text-2xl font-bold text-secondary-600">0</p>
                <p className="text-sm text-dark-500">已学课程数</p>
              </div>
              <div className="p-4 bg-accent-50 rounded-xl">
                <Mic className="w-6 h-6 text-accent-500 mb-2" />
                <p className="text-2xl font-bold text-accent-600">0</p>
                <p className="text-sm text-dark-500">口语练习</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-xl">
                <Headphones className="w-6 h-6 text-purple-500 mb-2" />
                <p className="text-2xl font-bold text-purple-600">0</p>
                <p className="text-sm text-dark-500">听力训练</p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-heading font-semibold text-lg text-dark-800">推荐课程</h2>
          <Button variant="ghost" size="sm" onClick={() => navigate('/courses')}>
            查看全部 <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onClick={() => navigate(`/courses/${course.id}`)}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
