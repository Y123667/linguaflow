import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Ticket,
  CheckCircle,
  XCircle,
  Sparkles,
  Crown,
  ArrowLeft,
  Gift,
} from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { useRedeemStore } from '../stores/redeemStore';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { toast } from '../components/common/Toast';

export function Redeem() {
  const navigate = useNavigate();
  const { user, setVip } = useAuthStore();
  const { redeemCode } = useRedeemStore();

  const [code, setCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
    planName?: string;
    duration?: string;
  } | null>(null);

  const handleSubmit = async () => {
    if (!code.trim()) {
      toast('error', '请输入兑换码');
      return;
    }

    if (!user) {
      toast('error', '请先登录');
      navigate('/login');
      return;
    }

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 800));

    const res = redeemCode(code.trim(), user.id);

    if (res.success && res.plan) {
      setVip(true);
      const planNames: Record<string, string> = {
        monthly: '月度会员',
        yearly: '年度会员',
        lifetime: '终身会员',
      };
      setResult({
        success: true,
        message: '恭喜您，兑换成功！',
        planName: planNames[res.plan],
        duration: res.durationDays === 99999 ? '永久' : `${res.durationDays}天`,
      });
      toast('success', 'VIP 兑换成功！');
    } else {
      setResult({
        success: false,
        message: res.message,
      });
      toast('error', res.message);
    }

    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 py-12">
      <div className="max-w-md mx-auto px-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-dark-500 hover:text-dark-700 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>返回</span>
        </button>

        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="text-center mb-8">
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-20 h-20 mx-auto mb-4 rounded-2xl gradient-primary flex items-center justify-center shadow-lg shadow-primary-500/30"
                >
                  <Ticket className="w-10 h-10 text-white" />
                </motion.div>
                <h1 className="text-2xl font-heading font-bold text-dark-800 mb-2">
                  VIP 兑换码
                </h1>
                <p className="text-dark-500">
                  输入兑换码，即刻解锁全部学习内容
                </p>
              </div>

              <Card>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-dark-700 mb-2">
                      兑换码
                    </label>
                    <input
                      type="text"
                      value={code}
                      onChange={(e) => setCode(e.target.value.toUpperCase())}
                      onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                      placeholder="请输入 12 位兑换码，如：XXXX-XXXX-XXXX"
                      className="w-full px-4 py-3 rounded-xl border border-dark-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-center font-mono text-lg tracking-wider"
                      maxLength={14}
                    />
                  </div>

                  <Button
                    className="w-full"
                    size="lg"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                        />
                        兑换中...
                      </span>
                    ) : (
                      '立即兑换'
                    )}
                  </Button>

                  <div className="pt-4 border-t border-dark-100">
                    <p className="text-sm text-dark-500 mb-3">
                      <Gift className="w-4 h-4 inline mr-1" />
                      还没有兑换码？
                    </p>
                    <button
                      onClick={() => navigate('/membership')}
                      className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                    >
                      去购买 VIP 会员 →
                    </button>
                  </div>
                </div>
              </Card>

              <div className="mt-8 space-y-3">
                <p className="text-center text-sm text-dark-400">
                  使用说明
                </p>
                <div className="flex items-start gap-3">
                  <Sparkles className="w-4 h-4 text-accent-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-dark-500">
                    兑换码一经使用，立即生效，不可退款
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Crown className="w-4 h-4 text-accent-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-dark-500">
                    兑换成功后，账号自动升级为 VIP 会员
                  </p>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', damping: 15 }}
            >
              <Card className="text-center">
                <div className="py-8">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', damping: 10 }}
                    className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center ${
                      result.success
                        ? 'bg-secondary-100'
                        : 'bg-red-100'
                    }`}
                  >
                    {result.success ? (
                      <CheckCircle className="w-10 h-10 text-secondary-500" />
                    ) : (
                      <XCircle className="w-10 h-10 text-red-500" />
                    )}
                  </motion.div>

                  <h2 className="text-2xl font-heading font-bold text-dark-800 mb-2">
                    {result.success ? '兑换成功！' : '兑换失败'}
                  </h2>
                  <p className="text-dark-500 mb-6">{result.message}</p>

                  {result.success && result.planName && (
                    <div className="bg-gradient-to-r from-accent-50 to-primary-50 rounded-xl p-4 mb-6">
                      <div className="flex items-center justify-between">
                        <span className="text-dark-600">会员类型</span>
                        <span className="font-semibold text-dark-800">
                          {result.planName}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-dark-600">有效期</span>
                        <span className="font-semibold text-primary-600">
                          {result.duration}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-3">
                    {result.success ? (
                      <>
                        <Button
                          variant="outline"
                          className="flex-1"
                          onClick={() => navigate('/courses')}
                        >
                          去学习
                        </Button>
                        <Button
                          className="flex-1"
                          onClick={() => navigate('/dashboard')}
                        >
                          返回首页
                        </Button>
                      </>
                    ) : (
                      <Button
                        className="flex-1"
                        onClick={() => {
                          setResult(null);
                          setCode('');
                        }}
                      >
                        重新输入
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
