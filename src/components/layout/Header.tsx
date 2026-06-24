import { useAuthStore } from '../../stores/authStore';
import { Bell, Search, Menu } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeaderProps {
  onMenuClick?: () => void;
  title?: string;
}

export function Header({ onMenuClick, title }: HeaderProps) {
  const { user } = useAuthStore();

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-dark-200">
      <div className="flex items-center justify-between px-4 lg:px-6 py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-xl hover:bg-dark-100 transition-colors"
          >
            <Menu className="w-6 h-6 text-dark-600" />
          </button>
          {title && (
            <motion.h1
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xl font-heading font-semibold text-dark-800"
            >
              {title}
            </motion.h1>
          )}
        </div>

        <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" />
            <input
              type="text"
              placeholder="搜索课程、内容..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-dark-50 border border-dark-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="relative p-2 rounded-xl hover:bg-dark-100 transition-colors">
            <Bell className="w-6 h-6 text-dark-600" />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white" />
          </button>

          {user && (
            <div className="flex items-center gap-3 pl-3 border-l border-dark-200">
              <img
                src={user.avatar}
                alt={user.nickname}
                className="w-9 h-9 rounded-full ring-2 ring-primary-200"
              />
              <div className="hidden sm:block">
                <p className="font-medium text-dark-800 text-sm">{user.nickname}</p>
                <p className="text-xs text-dark-500">{user.xp} XP</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
