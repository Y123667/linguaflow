import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Crown,
  Check,
  Sparkles,
  ShieldCheck,
  Zap,
  Award,
  Headphones,
  BookOpen,
  BarChart3,
  X,
} from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { vipPlans, featureComparison } from '../data/vipPlans';
import type { PlanType } from '../types';

const featureIcons: Record<string, React.ReactNode> = {
  '课程数量': <BookOpen className="w-4 h-4" />,
  '学习时长': <Zap className="w-4 h-4" />,
  'AI口语评测': <Headphones className="w-4 h-4" />,
  '学习报告': <BarChart3 className="w-4 h-4" />,
  '离线下载': <Sparkles className="w-4 h-4" />,
  '专属客服': <ShieldCheck className="w-4 h-4" />,
  '广告': <X className="w-4 h-4" />,
  '会员徽章': <Award className="w-4 h-4" />,
};

export function Membership() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [selectedPlan, setSelectedPlan] = useState<PlanType>('yearly');

  const handleSelectPlan = (planId: PlanType) => {
    setSelectedPlan(planId);
  };

  const handleSubscribe = () => {
    navigate(`/checkout/${selectedPlan}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark-900 via-primary-900 to-dark-900 pb-20">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl" />
        <div className="absolute top-40 right-1/4 w-80 h-80 bg-accent-500/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-500/20 border border-accent-400/30 mb-6">
            <Crown className="w-5 h-5 text-accent-400" />
            <span className="text-accent-300 font-medium">升级 LinguaFlow VIP</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-heading font-bold text-white mb-4">
            解锁全部学习潜力
          </h1>
          <p className="text-lg text-dark-300 max-w-2xl mx-auto">
            加入 VIP 会员，畅享全部课程、AI 口语评测、专属学习报告等高级功能
          </p>
        </motion.div>

        {user?.vip && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <Card className="bg-gradient-to-r from-accent-500/20 to-primary-500/20 border-accent-400/30">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl gradient-accent flex items-center justify-center">
                  <Crown className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold text-lg">您已是 VIP 会员</p>
                  <p className="text-dark-300 text-sm">享受全部高级功能</p>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {vipPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
              onClick={() => handleSelectPlan(plan.id)}
            >
              <Card
                className={`h-full cursor-pointer relative overflow-hidden transition-all ${
                  selectedPlan === plan.id
                    ? 'border-accent-400 ring-2 ring-accent-400/50 bg-white'
                    : 'bg-white/95 hover:border-primary-300'
                }`}
                padding="none"
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0">
                    <div className="bg-gradient-to-r from-accent-500 to-primary-500 text-white text-xs font-medium px-4 py-1.5 rounded-bl-xl">
                      {plan.tag || '最受欢迎'}
                    </div>
                  </div>
                )}
                {plan.tag && !plan.popular && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-accent-100 text-accent-700 text-xs font-medium px-2.5 py-1 rounded-full">
                      {plan.tag}
                    </span>
                  </div>
                )}

                <div className="p-6">
                  <h3 className="text-xl font-heading font-bold text-dark-800 mb-1">
                    {plan.name}
                  </h3>
                  <p className="text-dark-400 text-sm mb-4">{plan.description}</p>

                  <div className="mb-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-heading font-bold text-dark-900">
                        ¥{plan.price}
                      </span>
                      <span className="text-dark-400">{plan.period}</span>
                    </div>
                    {plan.originalPrice > plan.price && (
                      <p className="text-sm text-dark-400 line-through mt-1">
                        原价 ¥{plan.originalPrice}
                      </p>
                    )}
                  </div>

                  <div className="space-y-3 mb-6 min-h-[200px]">
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-secondary-500 flex-shrink-0 mt-0.5" />
                        <span className="text-dark-600 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    variant={selectedPlan === plan.id ? 'primary' : 'outline'}
                    className="w-full"
                    size="lg"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSubscribe();
                    }}
                  >
                    {user?.vip ? '立即续费' : '立即开通'}
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <h2 className="text-xl font-heading font-bold text-dark-800 mb-6 text-center">
              功能对比
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-dark-200">
                    <th className="text-left py-4 px-4 text-dark-600 font-medium">功能</th>
                    <th className="text-center py-4 px-4 text-dark-500 font-medium">免费版</th>
                    <th className="text-center py-4 px-4 text-primary-600 font-medium">月度</th>
                    <th className="text-center py-4 px-4 text-accent-600 font-medium">年度</th>
                    <th className="text-center py-4 px-4 text-purple-600 font-medium">终身</th>
                  </tr>
                </thead>
                <tbody>
                  {featureComparison.map((row, index) => (
                    <tr
                      key={index}
                      className="border-b border-dark-100 last:border-b-0"
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          {featureIcons[row.feature]}
                          <span className="text-dark-700">{row.feature}</span>
                        </div>
                      </td>
                      <td className="text-center py-4 px-4">
                        {typeof row.free === 'boolean' ? (
                          row.free ? (
                            <Check className="w-5 h-5 text-secondary-500 mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-dark-300 mx-auto" />
                          )
                        ) : (
                          <span className="text-dark-500">{row.free}</span>
                        )}
                      </td>
                      <td className="text-center py-4 px-4">
                        {typeof row.monthly === 'boolean' ? (
                          row.monthly ? (
                            <Check className="w-5 h-5 text-secondary-500 mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-dark-300 mx-auto" />
                          )
                        ) : (
                          <span className="text-dark-700">{row.monthly}</span>
                        )}
                      </td>
                      <td className="text-center py-4 px-4">
                        {typeof row.yearly === 'boolean' ? (
                          row.yearly ? (
                            <Check className="w-5 h-5 text-secondary-500 mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-dark-300 mx-auto" />
                          )
                        ) : (
                          <span className="text-dark-700 font-medium">{row.yearly}</span>
                        )}
                      </td>
                      <td className="text-center py-4 px-4">
                        {typeof row.lifetime === 'boolean' ? (
                          row.lifetime ? (
                            <Check className="w-5 h-5 text-secondary-500 mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-dark-300 mx-auto" />
                          )
                        ) : (
                          <span className="text-dark-700 font-medium">{row.lifetime}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-12 text-center space-y-3"
        >
          <p className="text-dark-400 text-sm">
            🔒 安全支付 · 7天无理由退款 · 随时取消
          </p>
          <p className="text-dark-500 text-xs">
            如有问题请联系客服：support@linguaflow.com
          </p>
        </motion.div>
      </div>
    </div>
  );
}
