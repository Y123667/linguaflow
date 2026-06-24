import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ShieldCheck,
  Check,
  Loader2,
  CheckCircle2,
  XCircle,
  Clock,
} from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { useOrderStore } from '../stores/orderStore';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { vipPlans } from '../data/vipPlans';
import type { PaymentMethod, PlanType } from '../types';

export function Checkout() {
  const { planId } = useParams<{ planId: string }>();
  const navigate = useNavigate();
  const { user, setVip } = useAuthStore();
  const { createOrder, simulatePayment } = useOrderStore();

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('wechat');
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'failed'>('idle');
  const [countdown, setCountdown] = useState(15 * 60);
  const [orderId, setOrderId] = useState('');

  const plan = vipPlans.find(p => p.id === planId);

  useEffect(() => {
    if (status !== 'processing') return;
    const timer = setInterval(() => {
      setCountdown(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [status]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handlePayment = async () => {
    if (!plan) return;
    const order = createOrder(plan.id as PlanType, paymentMethod);
    setOrderId(order.id);
    setStatus('processing');
    setIsProcessing(true);

    const success = await simulatePayment(order.id);
    setIsProcessing(false);

    if (success) {
      setStatus('success');
      setVip(true);
    } else {
      setStatus('failed');
    }
  };

  const handleRetry = () => {
    setStatus('idle');
    setCountdown(15 * 60);
  };

  if (!plan) {
    return (
      <div className="min-h-screen bg-dark-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-dark-600 mb-4">套餐不存在</p>
          <Button onClick={() => navigate('/membership')}>返回会员中心</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <button
          onClick={() => navigate('/membership')}
          className="flex items-center gap-2 text-dark-500 hover:text-dark-700 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>返回会员中心</span>
        </button>

        <AnimatePresence mode="wait">
          {status === 'idle' && (
            <motion.div
              key="idle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <Card className="mb-6">
                <h2 className="text-xl font-heading font-bold text-dark-800 mb-6">
                  确认订单
                </h2>

                <div className="flex items-center justify-between p-4 bg-dark-50 rounded-xl mb-6">
                  <div>
                    <h3 className="font-semibold text-dark-800">{plan.name}</h3>
                    <p className="text-sm text-dark-500">{plan.description}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-primary-600">
                      ¥{plan.price}
                    </span>
                    <span className="text-dark-400">{plan.period}</span>
                  </div>
                </div>

                <h3 className="font-semibold text-dark-800 mb-4">选择支付方式</h3>
                <div className="space-y-3 mb-6">
                  <div
                    onClick={() => setPaymentMethod('wechat')}
                    className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      paymentMethod === 'wechat'
                        ? 'border-green-500 bg-green-50'
                        : 'border-dark-200 hover:border-dark-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-green-500 flex items-center justify-center text-white font-bold">
                        微
                      </div>
                      <div>
                        <p className="font-medium text-dark-800">微信支付</p>
                        <p className="text-xs text-dark-500">推荐使用</p>
                      </div>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        paymentMethod === 'wechat'
                          ? 'border-green-500 bg-green-500'
                          : 'border-dark-300'
                      }`}
                    >
                      {paymentMethod === 'wechat' && (
                        <Check className="w-3 h-3 text-white" />
                      )}
                    </div>
                  </div>

                  <div
                    onClick={() => setPaymentMethod('alipay')}
                    className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      paymentMethod === 'alipay'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-dark-200 hover:border-dark-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center text-white font-bold">
                        支
                      </div>
                      <div>
                        <p className="font-medium text-dark-800">支付宝</p>
                        <p className="text-xs text-dark-500">安全便捷</p>
                      </div>
                    </div>
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        paymentMethod === 'alipay'
                          ? 'border-blue-500 bg-blue-500'
                          : 'border-dark-300'
                      }`}
                    >
                      {paymentMethod === 'alipay' && (
                        <Check className="w-3 h-3 text-white" />
                      )}
                    </div>
                  </div>
                </div>

                <div className="border-t border-dark-200 pt-4 mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-dark-600">商品金额</span>
                    <span className="text-dark-800">¥{plan.price}</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-dark-600">优惠</span>
                    <span className="text-secondary-500">
                      -¥{plan.originalPrice - plan.price}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-lg font-bold">
                    <span className="text-dark-800">应付金额</span>
                    <span className="text-primary-600">¥{plan.price}</span>
                  </div>
                </div>

                <Button
                  className="w-full"
                  size="lg"
                  onClick={handlePayment}
                  disabled={isProcessing}
                >
                  确认支付 ¥{plan.price}
                </Button>
              </Card>

              <div className="flex items-center justify-center gap-6 text-sm text-dark-400">
                <div className="flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span>安全加密</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>7天无理由</span>
                </div>
              </div>
            </motion.div>
          )}

          {status === 'processing' && (
            <motion.div
              key="processing"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              <Card className="text-center">
                <div className="py-8">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-16 h-16 mx-auto mb-6"
                  >
                    <div className="w-full h-full rounded-full border-4 border-dark-200 border-t-primary-500" />
                  </motion.div>
                  <h3 className="text-xl font-heading font-bold text-dark-800 mb-2">
                    等待支付中
                  </h3>
                  <p className="text-dark-500 mb-2">
                    请使用{paymentMethod === 'wechat' ? '微信' : '支付宝'}扫码支付
                  </p>
                  <div className="w-48 h-48 mx-auto bg-white border-2 border-dark-200 rounded-xl mb-6 flex items-center justify-center">
                    <div className="text-center text-dark-400">
                      <Loader2 className="w-8 h-8 mx-auto mb-2 animate-spin" />
                      <p className="text-sm">模拟二维码</p>
                    </div>
                  </div>
                  <p className="text-dark-400 text-sm mb-4">
                    订单号：{orderId}
                  </p>
                  <p className="text-accent-600 font-medium">
                    支付剩余时间：{formatTime(countdown)}
                  </p>
                </div>
              </Card>
            </motion.div>
          )}

          {status === 'success' && (
            <motion.div
              key="success"
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
                    className="w-20 h-20 mx-auto mb-6 rounded-full bg-secondary-100 flex items-center justify-center"
                  >
                    <CheckCircle2 className="w-10 h-10 text-secondary-500" />
                  </motion.div>
                  <h3 className="text-2xl font-heading font-bold text-dark-800 mb-2">
                    支付成功！
                  </h3>
                  <p className="text-dark-500 mb-6">
                    恭喜您成为 LinguaFlow VIP 会员
                  </p>
                  <div className="bg-dark-50 rounded-xl p-4 mb-6 text-left">
                    <div className="flex justify-between mb-2">
                      <span className="text-dark-500">套餐</span>
                      <span className="text-dark-800 font-medium">{plan.name}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-dark-500">支付金额</span>
                      <span className="text-dark-800 font-medium">¥{plan.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-dark-500">订单号</span>
                      <span className="text-dark-800 font-medium text-sm">{orderId}</span>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => navigate('/dashboard')}
                    >
                      返回首页
                    </Button>
                    <Button
                      className="flex-1"
                      onClick={() => navigate('/courses')}
                    >
                      开始学习
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {status === 'failed' && (
            <motion.div
              key="failed"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <Card className="text-center">
                <div className="py-8">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-100 flex items-center justify-center">
                    <XCircle className="w-10 h-10 text-red-500" />
                  </div>
                  <h3 className="text-2xl font-heading font-bold text-dark-800 mb-2">
                    支付失败
                  </h3>
                  <p className="text-dark-500 mb-6">
                    支付未完成，请重试或选择其他支付方式
                  </p>
                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => navigate('/membership')}
                    >
                      返回
                    </Button>
                    <Button
                      className="flex-1"
                      onClick={handleRetry}
                    >
                      重新支付
                    </Button>
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
