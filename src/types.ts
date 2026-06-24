export type Language = 'en' | 'ja' | 'ko';
export type CourseLevel = 'beginner' | 'intermediate' | 'advanced';
export type LessonType = 'vocabulary' | 'grammar' | 'speaking' | 'listening';
export type Rarity = 'common' | 'rare' | 'epic' | 'legendary';
export type PlanType = 'free' | 'monthly' | 'yearly' | 'lifetime';
export type PaymentMethod = 'wechat' | 'alipay';
export type OrderStatus = 'pending' | 'paid' | 'failed' | 'refunded';

export interface User {
  id: string;
  email: string;
  nickname: string;
  avatar: string;
  targetLanguage: Language;
  level: number;
  xp: number;
  streak: number;
  vip: boolean;
  joinedAt: string;
}

export interface Course {
  id: string;
  language: Language;
  level: CourseLevel;
  title: string;
  description: string;
  lessons: Lesson[];
  xpReward: number;
  thumbnail: string;
  isVip?: boolean;
  price?: number;
}

export interface Lesson {
  id: string;
  title: string;
  type: LessonType;
  content: VocabularyContent | GrammarContent | SpeakingContent | ListeningContent;
  duration: number;
}

export interface VocabularyContent {
  words: Word[];
}

export interface Word {
  id: string;
  term: string;
  translation: string;
  pronunciation: string;
  example: string;
  memoryLevel: number;
}

export interface GrammarContent {
  rules: GrammarRule[];
  exercises: GrammarExercise[];
}

export interface GrammarRule {
  id: string;
  title: string;
  explanation: string;
  examples: string[];
}

export interface GrammarExercise {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface SpeakingContent {
  prompts: SpeakingPrompt[];
}

export interface SpeakingPrompt {
  id: string;
  text: string;
  translation: string;
  audioUrl: string;
}

export interface ListeningContent {
  passages: ListeningPassage[];
}

export interface ListeningPassage {
  id: string;
  title: string;
  audioUrl: string;
  transcript: string;
  questions: ListeningQuestion[];
}

export interface ListeningQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface LearningProgress {
  userId: string;
  courseId: string;
  completedLessons: string[];
  quizScores: Record<string, number>;
  lastStudyDate: string;
  totalStudyTime: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  rarity: Rarity;
  unlockCriteria: string;
  xpReward: number;
  unlockedAt?: string;
}

export interface CommunityPost {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  likes: number;
  comments: number;
  createdAt: string;
  language: Language;
}

export interface DailyTask {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  completed: boolean;
  type: 'lesson' | 'quiz' | 'speaking' | 'listening' | 'streak';
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

export interface RedeemCode {
  code: string;
  plan: PlanType;
  durationDays: number;
  used: boolean;
  usedBy?: string;
  usedAt?: string;
  createdAt: string;
}
