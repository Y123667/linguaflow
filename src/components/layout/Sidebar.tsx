import { NavLink } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import {
  Home,
  BookOpen,
  GraduationCap,
  BarChart3,
  Users,
  Award,
  User,
  LogOut,
  Sparkles,
  Crown,
  Ticket,
} from 'lucide-react';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';

const navItems = [
  { to: '/', icon: Home, label: '首页' },
  { to: '/courses', icon: BookOpen, label: '课程中心' },
  { to: '/progress', icon: BarChart3, label: '学习进度' },
  { to: '/community', icon: Users, label: '社区' },
  { to: '/achievements', icon: Award, label: '成就' },
  { to: '/profile', icon: User, label: '个人中心' },
];

export function Sidebar() {
  const { user, logout } = useAuthStore();

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-dark-200 min-h-screen">
      <div className="p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-lg shadow-primary-500/30">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <span className="font-heading font-bold text-xl text-gradient">LinguaFlow</span>
        </div>
      </div>

      <nav className="flex-1 px-3">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              clsx(
                'flex items-center gap-3 px-4 py-3 rounded-xl mb-1 transition-all duration-200',
                isActive
                  ? 'bg-primary-50 text-primary-600 font-medium'
                  : 'text-dark-500 hover:bg-dark-100 hover:text-dark-700'
              )
            }
          >
            {({ isActive }) => (
              <>
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="sidebar-indicator"
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-500"
                  />
                )}
              </>
            )}
          </NavLink>
        ))}

        <NavLink
          to="/membership"
          className={({ isActive }) =>
            clsx(
              'flex items-center gap-3 px-4 py-3 rounded-xl mb-1 transition-all duration-200 mt-4',
              isActive
                ? 'bg-gradient-to-r from-accent-500/20 to-primary-500/20 text-accent-600 font-medium border border-accent-200'
                : 'text-dark-500 hover:bg-accent-50 hover:text-accent-600 border border-transparent hover:border-accent-200'
            )
          }
        >
          <Crown className="w-5 h-5" />
          <span>会员中心</span>
          <span className="ml-auto px-2 py-0.5 rounded-full bg-gradient-to-r from-accent-500 to-primary-500 text-white text-xs font-medium">
            VIP
          </span>
        </NavLink>

        <NavLink
          to="/redeem"
          className={({ isActive }) =>
            clsx(
              'flex items-center gap-3 px-4 py-3 rounded-xl mb-1 transition-all duration-200',
              isActive
                ? 'bg-primary-50 text-primary-600 font-medium'
                : 'text-dark-500 hover:bg-dark-100 hover:text-dark-700'
            )
          }
        >
          <Ticket className="w-5 h-5" />
          <span>兑换码</span>
        </NavLink>
      </nav>

      {user && (
        <div className="p-4 mx-3 mb-4 rounded-xl bg-dark-50 border border-dark-200">
          <div className="flex items-center gap-3">
            <img
              src={user.avatar}
              alt={user.nickname}
              className="w-10 h-10 rounded-full ring-2 ring-primary-200"
            />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-dark-800 truncate">{user.nickname}</p>
              <p className="text-xs text-dark-500">
                Lv.{user.level} · {user.xp} XP
              </p>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2 text-sm">
            <div className="flex items-center gap-1 text-accent-500">
              <span className="font-bold">{user.streak}</span>
              <span className="text-dark-400">天连续</span>
            </div>
            {user.vip && (
              <span className="ml-auto px-2 py-0.5 rounded-full bg-accent-100 text-accent-600 text-xs font-medium">
                VIP
              </span>
            )}
          </div>
        </div>
      )}

      <div className="p-4 border-t border-dark-200">
        <button
          onClick={logout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-dark-500 hover:bg-red-50 hover:text-red-500 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>退出登录</span>
        </button>
      </div>
    </aside>
  );
}
