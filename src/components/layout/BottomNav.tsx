import { NavLink } from 'react-router-dom';
import { Home, BookOpen, BarChart3, Users, Award, User } from 'lucide-react';
import { clsx } from 'clsx';

const navItems = [
  { to: '/', icon: Home, label: '首页' },
  { to: '/courses', icon: BookOpen, label: '课程' },
  { to: '/progress', icon: BarChart3, label: '进度' },
  { to: '/community', icon: Users, label: '社区' },
  { to: '/achievements', icon: Award, label: '成就' },
  { to: '/profile', icon: User, label: '我的' },
];

export function BottomNav() {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-dark-200 safe-area-pb">
      <div className="flex items-center justify-around py-2 px-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              clsx(
                'flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all min-w-[60px]',
                isActive
                  ? 'text-primary-500'
                  : 'text-dark-400 hover:text-dark-600'
              )
            }
          >
            {({ isActive }) => (
              <>
                <item.icon className="w-6 h-6" />
                <span className="text-xs font-medium">{item.label}</span>
                {isActive && (
                  <span className="absolute bottom-1 w-1 h-1 rounded-full bg-primary-500" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
