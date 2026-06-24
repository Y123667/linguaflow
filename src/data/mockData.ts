import type { Course, Achievement, CommunityPost, DailyTask, User } from '../types';

export const mockCourses: Course[] = [
  {
    id: 'en-beginner-1',
    language: 'en',
    level: 'beginner',
    title: '英语入门：从零开始',
    description: '为零基础学习者打造，系统掌握英语字母发音和基础词汇',
    xpReward: 500,
    thumbnail: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400&h=300&fit=crop',
    isVip: false,
    lessons: [
      {
        id: 'en-b-lesson-1',
        title: '英语字母表',
        type: 'vocabulary',
        duration: 15,
        content: {
          words: [
            { id: 'w1', term: 'Apple', translation: '苹果', pronunciation: '/ˈæpl/', example: 'An apple a day keeps the doctor away.', memoryLevel: 0 },
            { id: 'w2', term: 'Book', translation: '书', pronunciation: '/bʊk/', example: 'I like to read books.', memoryLevel: 0 },
            { id: 'w3', term: 'Cat', translation: '猫', pronunciation: '/kæt/', example: 'The cat is sleeping.', memoryLevel: 0 },
            { id: 'w4', term: 'Dog', translation: '狗', pronunciation: '/dɔːɡ/', example: 'The dog barks loudly.', memoryLevel: 0 },
            { id: 'w5', term: 'Elephant', translation: '大象', pronunciation: '/ˈɛlɪfənt/', example: 'The elephant is very big.', memoryLevel: 0 },
          ]
        }
      },
      {
        id: 'en-b-lesson-2',
        title: '基础语法：主谓宾',
        type: 'grammar',
        duration: 20,
        content: {
          rules: [
            { id: 'r1', title: '主语 + 动词 + 宾语', explanation: '这是英语中最基本的句型结构', examples: ['I love music.', 'She reads books.', 'They play games.'] }
          ],
          exercises: [
            { id: 'e1', question: '选择正确的句子结构', options: ['I beautiful am', 'I am beautiful', 'Beautiful I am'], correctAnswer: 1, explanation: '正确语序：主语 + be动词 + 表语' }
          ]
        }
      },
      {
        id: 'en-b-lesson-3',
        title: '日常口语：问候',
        type: 'speaking',
        duration: 15,
        content: {
          prompts: [
            { id: 'p1', text: 'Hello, how are you?', translation: '你好，你怎么样？', audioUrl: '' },
            { id: 'p2', text: 'Nice to meet you!', translation: '很高兴认识你！', audioUrl: '' },
          ]
        }
      },
      {
        id: 'en-b-lesson-4',
        title: '听力训练：简单对话',
        type: 'listening',
        duration: 20,
        content: {
          passages: [
            {
              id: 'lp1',
              title: '超市对话',
              audioUrl: '',
              transcript: 'A: Hello, can I help you? B: Yes, I would like some apples. A: How many do you need? B: Five please.',
              questions: [
                { id: 'q1', question: 'What does the customer want?', options: ['Oranges', 'Apples', 'Bananas'], correctAnswer: 1 }
              ]
            }
          ]
        }
      }
    ]
  },
  {
    id: 'ja-beginner-1',
    language: 'ja',
    level: 'beginner',
    title: '日语入门：五十音图',
    description: '学习日语基础假名，掌握标准发音规则',
    xpReward: 500,
    thumbnail: 'https://images.unsplash.com/photo-1543966888-7c1dc482a810?w=400&h=300&fit=crop',
    isVip: false,
    lessons: [
      {
        id: 'ja-b-lesson-1',
        title: 'あ行假名',
        type: 'vocabulary',
        duration: 15,
        content: {
          words: [
            { id: 'jw1', term: 'あ', translation: 'a', pronunciation: 'a', example: 'あめ (雨) = rain', memoryLevel: 0 },
            { id: 'jw2', term: 'い', translation: 'i', pronunciation: 'i', example: 'いぬ (犬) = dog', memoryLevel: 0 },
            { id: 'jw3', term: 'う', translation: 'u', pronunciation: 'u', example: 'うみ (海) = sea', memoryLevel: 0 },
            { id: 'jw4', term: 'え', translation: 'e', pronunciation: 'e', example: 'えき (駅) = station', memoryLevel: 0 },
            { id: 'jw5', term: 'お', translation: 'o', pronunciation: 'o', example: 'おちゃ (お茶) = tea', memoryLevel: 0 },
          ]
        }
      }
    ]
  },
  {
    id: 'ko-beginner-1',
    language: 'ko',
    level: 'beginner',
    title: '韩语入门：子母音',
    description: '学习韩语基础字母表和发音规则',
    xpReward: 500,
    thumbnail: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=300&fit=crop',
    isVip: false,
    lessons: [
      {
        id: 'ko-b-lesson-1',
        title: '韩语子音',
        type: 'vocabulary',
        duration: 15,
        content: {
          words: [
            { id: 'kw1', term: 'ㄱ', translation: 'g/k', pronunciation: 'g', example: '가다 = to go', memoryLevel: 0 },
            { id: 'kw2', term: 'ㄴ', translation: 'n', pronunciation: 'n', example: '나 = I', memoryLevel: 0 },
            { id: 'kw3', term: 'ㄷ', translation: 'd/t', pronunciation: 'd', example: '다 = all', memoryLevel: 0 },
            { id: 'kw4', term: 'ㄹ', translation: 'r/l', pronunciation: 'r', example: '라 = ra', memoryLevel: 0 },
            { id: 'kw5', term: 'ㅁ', translation: 'm', pronunciation: 'm', example: '마 = ma', memoryLevel: 0 },
          ]
        }
      }
    ]
  },
  {
    id: 'en-intermediate-1',
    language: 'en',
    level: 'intermediate',
    title: '英语进阶：日常对话',
    description: '提升口语流利度，能够进行日常交流',
    xpReward: 800,
    thumbnail: 'https://images.unsplash.com/photo-1431274172761-fca41d930114?w=400&h=300&fit=crop',
    isVip: true,
    price: 49,
    lessons: [
      {
        id: 'en-i-lesson-1',
        title: '餐厅用语',
        type: 'vocabulary',
        duration: 20,
        content: {
          words: [
            { id: 'iw1', term: 'Reservation', translation: '预订', pronunciation: '/ˌrezərˈveɪʃn/', example: 'I have a reservation for two.', memoryLevel: 0 },
            { id: 'iw2', term: 'Menu', translation: '菜单', pronunciation: '/ˈmenjuː/', example: 'May I see the menu?', memoryLevel: 0 },
          ]
        }
      }
    ]
  },
  {
    id: 'en-advanced-1',
    language: 'en',
    level: 'advanced',
    title: '英语高级：商务沟通',
    description: '掌握商务英语，提升职场竞争力',
    xpReward: 1000,
    thumbnail: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&h=300&fit=crop',
    isVip: true,
    price: 99,
    lessons: []
  }
];

export const mockAchievements: Achievement[] = [
  { id: 'ach-1', title: '初学者', description: '完成第一课', icon: 'Baby', rarity: 'common', unlockCriteria: 'complete_1_lesson', xpReward: 50 },
  { id: 'ach-2', title: '连续7天', description: '保持7天连续学习', icon: 'Flame', rarity: 'rare', unlockCriteria: 'streak_7', xpReward: 100 },
  { id: 'ach-3', title: '词汇达人', description: '记忆100个单词', icon: 'BookOpen', rarity: 'rare', unlockCriteria: 'vocabulary_100', xpReward: 150 },
  { id: 'ach-4', title: '口语达人', description: '完成10次口语练习', icon: 'Mic', rarity: 'epic', unlockCriteria: 'speaking_10', xpReward: 200 },
  { id: 'ach-5', title: '全能学习者', description: '完成所有类型练习', icon: 'Trophy', rarity: 'legendary', unlockCriteria: 'all_types', xpReward: 500 },
  { id: 'ach-6', title: '坚持30天', description: '保持30天连续学习', icon: 'Calendar', rarity: 'legendary', unlockCriteria: 'streak_30', xpReward: 1000 },
  { id: 'ach-7', title: '听力专家', description: '完成20次听力训练', icon: 'Headphones', rarity: 'epic', unlockCriteria: 'listening_20', xpReward: 250 },
  { id: 'ach-8', title: '语法的掌握', description: '完成50道语法题', icon: 'GraduationCap', rarity: 'rare', unlockCriteria: 'grammar_50', xpReward: 175 },
];

export const mockCommunityPosts: CommunityPost[] = [
  { id: 'post-1', userId: 'user-1', userName: 'Alice', userAvatar: '', content: '今天完成了英语入门课程，感觉收获满满！', likes: 42, comments: 5, createdAt: '2024-01-15T10:30:00Z', language: 'en' },
  { id: 'post-2', userId: 'user-2', userName: '日语达人', userAvatar: '', content: '分享我的日语学习技巧：多看动漫多听歌！', likes: 89, comments: 12, createdAt: '2024-01-14T15:20:00Z', language: 'ja' },
  { id: 'post-3', userId: 'user-3', userName: '韩语控', userAvatar: '', content: '有没有人一起组队学习韩语？私信我！', likes: 56, comments: 23, createdAt: '2024-01-13T09:15:00Z', language: 'ko' },
  { id: 'post-4', userId: 'user-4', userName: 'David', userAvatar: '', content: 'Grammar is hard but I am making progress!', likes: 34, comments: 4, createdAt: '2024-01-12T14:00:00Z', language: 'en' },
];

export const mockDailyTasks: DailyTask[] = [
  { id: 'task-1', title: '每日登录', description: '登录平台', xpReward: 10, completed: false, type: 'streak' },
  { id: 'task-2', title: '完成一课', description: '完成任意课程学习', xpReward: 30, completed: false, type: 'lesson' },
  { id: 'task-3', title: '口语练习', description: '完成一次口语跟读', xpReward: 25, completed: false, type: 'speaking' },
  { id: 'task-4', title: '听力训练', description: '完成一次听力练习', xpReward: 25, completed: false, type: 'listening' },
];

export const mockLeaderboard: User[] = [
  { id: 'lb-1', email: '', nickname: '学习王者', avatar: '', targetLanguage: 'en', level: 25, xp: 12500, streak: 45, vip: true, joinedAt: '' },
  { id: 'lb-2', email: '', nickname: '日语小能手', avatar: '', targetLanguage: 'ja', level: 20, xp: 9800, streak: 30, vip: true, joinedAt: '' },
  { id: 'lb-3', email: '', nickname: '韩语小王子', avatar: '', targetLanguage: 'ko', level: 18, xp: 8500, streak: 25, vip: false, joinedAt: '' },
  { id: 'lb-4', email: '', nickname: '英语爱好者', avatar: '', targetLanguage: 'en', level: 15, xp: 6200, streak: 18, vip: false, joinedAt: '' },
  { id: 'lb-5', email: '', nickname: '进步达人', avatar: '', targetLanguage: 'en', level: 12, xp: 4500, streak: 12, vip: false, joinedAt: '' },
];
