import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
import { useCourseStore } from '../stores/courseStore';
import { useAuthStore } from '../stores/authStore';
import { Card } from '../components/common/Card';
import { CourseCard } from '../components/course/CourseCard';
import { LanguageSwitcher } from '../components/course/LanguageSwitcher';
import type { CourseLevel } from '../types';

const levels: { value: CourseLevel; label: string }[] = [
  { value: 'beginner', label: '初级' },
  { value: 'intermediate', label: '中级' },
  { value: 'advanced', label: '高级' },
];

export function Courses() {
  const navigate = useNavigate();
  const { selectedLanguage, setSelectedLanguage, selectedLevel, setSelectedLevel, getFilteredCourses } = useCourseStore();
  const { user } = useAuthStore();
  const filteredCourses = getFilteredCourses();

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto pb-24 lg:pb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl lg:text-3xl font-heading font-bold text-dark-800">课程中心</h1>
        <p className="text-dark-500 mt-1">探索海量课程,找到适合你的学习路径</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6 flex flex-col md:flex-row gap-4"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" />
          <input
            type="text"
            placeholder="搜索课程..."
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-dark-200 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white"
          />
        </div>
        <Card padding="sm" className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-dark-400" />
          <span className="text-sm text-dark-500">筛选:</span>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <LanguageSwitcher selected={selectedLanguage} onChange={setSelectedLanguage} />

        <div className="flex gap-2 mt-4">
          <button
            onClick={() => setSelectedLevel(null)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedLevel === null
                ? 'bg-primary-500 text-white'
                : 'bg-dark-100 text-dark-600 hover:bg-dark-200'
            }`}
          >
            全部
          </button>
          {levels.map((level) => (
            <button
              key={level.value}
              onClick={() => setSelectedLevel(level.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedLevel === level.value
                  ? 'bg-primary-500 text-white'
                  : 'bg-dark-100 text-dark-600 hover:bg-dark-200'
              }`}
            >
              {level.label}
            </button>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {filteredCourses.length === 0 ? (
          <Card className="text-center py-12">
            <p className="text-dark-500">暂无符合条件的课程</p>
            <button
              onClick={() => {
                setSelectedLanguage(null);
                setSelectedLevel(null);
              }}
              className="mt-4 text-primary-500 hover:underline"
            >
              清除筛选
            </button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <CourseCard
                  course={course}
                  onClick={() => navigate(`/courses/${course.id}`)}
                  isLocked={course.isVip && !user?.vip}
                />
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
