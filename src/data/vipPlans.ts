export type PlanType = 'free' | 'monthly' | 'yearly' | 'lifetime';
export type PaymentMethod = 'wechat' | 'alipay';
export type OrderStatus = 'pending' | 'paid' | 'failed' | 'refunded';

export interface VIPPlan {
  id: PlanType;
  name: string;
  price: number;
  originalPrice: number;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
  tag?: string;
}

export interface Order {
  id: string;
  planId: PlanType;
  amount: number;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  createdAt: string;
  paidAt?: string;
  expiresAt?: string;
}

export const vipPlans: VIPPlan[] = [
  {
    id: 'monthly',
    name: '月度会员',
    price: 39,
    originalPrice: 59,
    period: '/月',
    description: '灵活试用，随时取消',
    features: [
      '解锁全部课程内容',
      'AI 口语评测',
      '学习数据报告',
      '无广告体验',
      '社区发帖权限',
    ],
  },
  {
    id: 'yearly',
    name: '年度会员',
    price: 299,
    originalPrice: 468,
    period: '/年',
    description: '最受欢迎的选择',
    popular: true,
    tag: '省 ¥169',
    features: [
      '月度会员全部权益',
      '专属学习路径规划',
      '每周学习报告导出',
      '优先客服支持',
      '会员专属徽章',
      '新功能优先体验',
    ],
  },
  {
    id: 'lifetime',
    name: '终身会员',
    price: 999,
    originalPrice: 1999,
    period: '/终身',
    description: '一次购买，永久受益',
    tag: '最划算',
    features: [
      '年度会员全部权益',
      '终身免费更新',
      '1对1学习顾问',
      '专属学习社群',
      '线下活动优先参与',
      '证书认证资格',
    ],
  },
];

export const freePlanFeatures: string[] = [
  '基础课程学习',
  '每日30分钟学习时长',
  '社区浏览权限',
  '基础成就系统',
];

export const featureComparison = [
  { feature: '课程数量', free: '基础 10+', monthly: '全部 100+', yearly: '全部 100+', lifetime: '全部 + 持续更新' },
  { feature: '学习时长', free: '每日30分钟', monthly: '无限制', yearly: '无限制', lifetime: '无限制' },
  { feature: 'AI口语评测', free: false, monthly: true, yearly: true, lifetime: true },
  { feature: '学习报告', free: false, monthly: '基础', yearly: '详细', lifetime: '专业' },
  { feature: '离线下载', free: false, monthly: false, yearly: true, lifetime: true },
  { feature: '专属客服', free: '社区', monthly: '在线', yearly: '优先', lifetime: '1对1' },
  { feature: '广告', free: '有', monthly: '无', yearly: '无', lifetime: '无' },
  { feature: '会员徽章', free: false, monthly: true, yearly: true, lifetime: '专属' },
];
