import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Share2, Globe } from 'lucide-react';
import { mockCommunityPosts } from '../data/mockData';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import type { CommunityPost } from '../types';

const languageLabels: Record<string, string> = {
  en: '英语',
  ja: '日语',
  ko: '韩语',
};

export function Community() {
  const [posts, setPosts] = useState<CommunityPost[]>(mockCommunityPosts);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());

  const handleLike = (postId: string) => {
    setPosts(posts.map(post =>
      post.id === postId
        ? { ...post, likes: likedPosts.has(postId) ? post.likes - 1 : post.likes + 1 }
        : post
    ));
    setLikedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours < 1) return '刚刚';
    if (hours < 24) return `${hours}小时前`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}天前`;
    return date.toLocaleDateString('zh-CN');
  };

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto pb-24 lg:pb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-2xl lg:text-3xl font-heading font-bold text-dark-800">社区中心</h1>
        <p className="text-dark-500 mt-1">与全球学习者一起交流、分享、成长</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6"
      >
        <Card className="flex gap-3">
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=me"
            alt="avatar"
            className="w-10 h-10 rounded-full"
          />
          <div className="flex-1">
            <input
              type="text"
              placeholder="分享你的学习心得..."
              className="w-full px-4 py-2 rounded-xl bg-dark-50 border border-dark-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <div className="flex justify-between items-center mt-3">
              <div className="flex gap-2">
                <Button variant="ghost" size="sm">
                  <Globe className="w-4 h-4 mr-1" />
                  公开
                </Button>
              </div>
              <Button size="sm">发布</Button>
            </div>
          </div>
        </Card>
      </motion.div>

      <div className="space-y-4">
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <Card padding="none" className="overflow-hidden">
              <div className="p-5">
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${post.userName}`}
                    alt={post.userName}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-dark-800">{post.userName}</p>
                    <div className="flex items-center gap-2 text-sm text-dark-400">
                      <span>{formatDate(post.createdAt)}</span>
                      <span>·</span>
                      <span>{languageLabels[post.language]}</span>
                    </div>
                  </div>
                </div>

                <p className="text-dark-700 leading-relaxed">{post.content}</p>

                <div className="flex items-center gap-6 mt-4 pt-4 border-t border-dark-100">
                  <button
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center gap-2 transition-colors ${
                      likedPosts.has(post.id)
                        ? 'text-red-500'
                        : 'text-dark-400 hover:text-red-500'
                    }`}
                  >
                    <Heart
                      className={`w-5 h-5 ${likedPosts.has(post.id) ? 'fill-current' : ''}`}
                    />
                    <span className="text-sm">{post.likes}</span>
                  </button>

                  <button className="flex items-center gap-2 text-dark-400 hover:text-primary-500 transition-colors">
                    <MessageCircle className="w-5 h-5" />
                    <span className="text-sm">{post.comments}</span>
                  </button>

                  <button className="flex items-center gap-2 text-dark-400 hover:text-primary-500 transition-colors ml-auto">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
