import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Globe, Bell, Shield, CreditCard, LogOut, ChevronRight, Sparkles, Ticket } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { LanguageSwitcher } from '../components/course/LanguageSwitcher';
import { toast } from '../components/common/Toast';

export function Profile() {
  const navigate = useNavigate();
  const { user, updateProfile, logout } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);

  const handleLanguageChange = (language: 'en' | 'ja' | 'ko') => {
    updateProfile({ targetLanguage: language });
    toast('success', '学习语言已更新');
  };

  const handleLogout = () => {
    logout();
    toast('info', '已退出登录');
  };

  if (!user) return null;

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto pb-24 lg:pb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl lg:text-3xl font-heading font-bold text-dark-800">个人中心</h1>
        <p className="text-dark-500 mt-1">管理你的账户设置</p>
      </motion.div>

      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <div className="flex items-center gap-6">
              <div className="relative">
                <img
                  src={user.avatar}
                  alt={user.nickname}
                  className="w-20 h-20 rounded-full ring-4 ring-primary-200"
                />
                {user.vip && (
                  <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full gradient-accent flex items-center justify-center shadow-lg">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-heading font-bold text-dark-800">{user.nickname}</h2>
                  {user.vip && (
                    <span className="px-2 py-0.5 rounded-full bg-accent-100 text-accent-600 text-xs font-medium">
                      VIP会员
                    </span>
                  )}
                </div>
                <p className="text-dark-500 mt-1">{user.email}</p>
                <div className="flex items-center gap-4 mt-2 text-sm">
                  <span className="text-primary-600 font-medium">Lv.{user.level}</span>
                  <span className="text-dark-400">·</span>
                  <span className="text-dark-500">{user.xp} XP</span>
                  <span className="text-dark-400">·</span>
                  <span className="text-accent-500">{user.streak}天连续学习</span>
                </div>
              </div>
              <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
                {isEditing ? '保存' : '编辑'}
              </Button>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <h3 className="font-heading font-semibold text-dark-800 mb-4">学习设置</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-dark-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-primary-500" />
                  <div>
                    <p className="font-medium text-dark-800">学习语言</p>
                    <p className="text-sm text-dark-400">选择你想要学习的语言</p>
                  </div>
                </div>
                <LanguageSwitcher selected={user.targetLanguage} onChange={handleLanguageChange} />
              </div>

              <div className="flex items-center justify-between p-4 bg-dark-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-primary-500" />
                  <div>
                    <p className="font-medium text-dark-800">学习提醒</p>
                    <p className="text-sm text-dark-400">设置每日学习提醒时间</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  设置 <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <h3 className="font-heading font-semibold text-dark-800 mb-4">账户</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-dark-50 rounded-xl cursor-pointer hover:bg-dark-100 transition-colors">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-primary-500" />
                  <p className="font-medium text-dark-800">个人信息</p>
                </div>
                <ChevronRight className="w-5 h-5 text-dark-400" />
              </div>

              <div className="flex items-center justify-between p-4 bg-dark-50 rounded-xl cursor-pointer hover:bg-dark-100 transition-colors">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary-500" />
                  <p className="font-medium text-dark-800">邮箱</p>
                </div>
                <span className="text-dark-400">{user.email}</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-dark-50 rounded-xl cursor-pointer hover:bg-dark-100 transition-colors">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-primary-500" />
                  <p className="font-medium text-dark-800">隐私设置</p>
                </div>
                <ChevronRight className="w-5 h-5 text-dark-400" />
              </div>

              <div
                onClick={() => navigate('/redeem')}
                className="flex items-center justify-between p-4 bg-dark-50 rounded-xl cursor-pointer hover:bg-dark-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Ticket className="w-5 h-5 text-primary-500" />
                  <div>
                    <p className="font-medium text-dark-800">兑换码</p>
                    <p className="text-sm text-dark-400">使用兑换码激活VIP会员</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-dark-400" />
              </div>

              {!user.vip && (
                <div
                  onClick={() => navigate('/membership')}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-accent-50 to-primary-50 rounded-xl cursor-pointer hover:opacity-90 transition-opacity"
                >
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-accent-500" />
                    <div>
                      <p className="font-medium text-dark-800">升级VIP</p>
                      <p className="text-sm text-dark-400">解锁全部高级课程</p>
                    </div>
                  </div>
                  <Button size="sm">升级</Button>
                </div>
              )}

              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-between p-4 bg-red-50 rounded-xl cursor-pointer hover:bg-red-100 transition-colors text-red-600"
              >
                <div className="flex items-center gap-3">
                  <LogOut className="w-5 h-5" />
                  <p className="font-medium">退出登录</p>
                </div>
              </button>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center text-sm text-dark-400"
        >
          <p>LinguaFlow v1.0.0</p>
          <p className="mt-1">© 2024 LinguaFlow. All rights reserved.</p>
        </motion.div>
      </div>
    </div>
  );
}
