import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, Crown, Lock, Sparkles, X } from 'lucide-react';
import { useCourseStore } from '../stores/courseStore';
import { useProgressStore } from '../stores/progressStore';
import { useAuthStore } from '../stores/authStore';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { LessonItem } from '../components/course/LessonItem';
import { FlashCard } from '../components/learning/FlashCard';
import { QuizQuestion } from '../components/learning/QuizQuestion';
import { AudioRecorder } from '../components/learning/AudioRecorder';
import { StaticWaveform } from '../components/learning/Waveform';
import { toast } from '../components/common/Toast';
import { vipPlans } from '../data/vipPlans';
import type { VocabularyContent, GrammarContent, SpeakingContent, ListeningContent, Word, GrammarExercise } from '../types';

export function Learning() {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const { getCourseById } = useCourseStore();
  const { updateProgress } = useProgressStore();
  const { addXp, user } = useAuthStore();

  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [showVipModal, setShowVipModal] = useState(false);

  const course = moduleId ? getCourseById(moduleId) : undefined;
  const lesson = course?.lessons[currentLessonIndex];
  const isLocked = course?.isVip && !user?.vip;

  if (!course || !lesson) {
    return (
      <div className="p-8 max-w-4xl mx-auto">
        <Card className="text-center py-12">
          <p className="text-dark-500 mb-4">课程不存在</p>
          <Button onClick={() => navigate('/courses')}>返回课程中心</Button>
        </Card>
      </div>
    );
  }

  const handleLessonClick = (index: number) => {
    if (isLocked) {
      setShowVipModal(true);
    } else {
      setCurrentLessonIndex(index);
      setShowResult(false);
      setCurrentWordIndex(0);
      setCurrentExerciseIndex(0);
    }
  };

  const handleLessonComplete = (score: number) => {
    updateProgress(course.id, lesson.id, score);
    addXp(50);
    toast('success', `恭喜完成 ${lesson.title}! +50 XP`);
    setShowResult(true);
  };

  const handleNextLesson = () => {
    setShowResult(false);
    setCurrentLessonIndex((prev) => Math.min(prev + 1, course.lessons.length - 1));
    setCurrentWordIndex(0);
    setCurrentExerciseIndex(0);
  };

  const renderVocabulary = (content: VocabularyContent) => {
    const word = content.words[currentWordIndex];
    return (
      <div className="space-y-6">
        <FlashCard
          term={word.term}
          translation={word.translation}
          pronunciation={word.pronunciation}
          example={word.example}
          currentIndex={currentWordIndex}
          total={content.words.length}
          onNext={() => setCurrentWordIndex((prev) => {
            if (prev >= content.words.length - 1) {
              handleLessonComplete(100);
              return prev;
            }
            return prev + 1;
          })}
          onPrev={() => setCurrentWordIndex((prev) => Math.max(0, prev - 1))}
        />
      </div>
    );
  };

  const renderGrammar = (content: GrammarContent) => {
    const exercise = content.exercises[currentExerciseIndex];
    return (
      <div className="space-y-6">
        <Card className="bg-primary-50 border-primary-200">
          <h3 className="font-semibold text-primary-700 mb-2">语法规则</h3>
          {content.rules.map((rule) => (
            <div key={rule.id}>
              <p className="font-medium text-dark-800">{rule.title}</p>
              <p className="text-dark-600 mt-1">{rule.explanation}</p>
              <div className="mt-2 space-y-1">
                {rule.examples.map((ex, i) => (
                  <p key={i} className="text-sm text-dark-500 italic">• {ex}</p>
                ))}
              </div>
            </div>
          ))}
        </Card>
        <QuizQuestion
          exercise={exercise}
          onAnswer={(correct) => {
            if (correct) {
              if (currentExerciseIndex >= content.exercises.length - 1) {
                handleLessonComplete(100);
              } else {
                setCurrentExerciseIndex((prev) => prev + 1);
              }
            }
          }}
        />
      </div>
    );
  };

  const renderSpeaking = (content: SpeakingContent) => {
    const prompt = content.prompts[0];
    return (
      <div className="space-y-6">
        <Card className="text-center">
          <p className="text-2xl font-heading font-bold text-dark-800 mb-2">{prompt.text}</p>
          <p className="text-dark-500">{prompt.translation}</p>
        </Card>
        <StaticWaveform className="my-8" />
        <AudioRecorder
          onRecordingComplete={() => {
            toast('success', '录音完成!');
          }}
        />
        <div className="text-center">
          <Button
            variant="secondary"
            onClick={() => handleLessonComplete(100)}
          >
            完成跟读
          </Button>
        </div>
      </div>
    );
  };

  const renderListening = (content: ListeningContent) => {
    const passage = content.passages[0];
    return (
      <div className="space-y-6">
        <Card className="bg-secondary-50 border-secondary-200">
          <h3 className="font-semibold text-secondary-700 mb-2">{passage.title}</h3>
          <p className="text-dark-600">{passage.transcript}</p>
        </Card>
        <StaticWaveform className="my-8" />
        <div className="flex justify-center gap-4">
          <Button variant="outline">0.5x</Button>
          <Button variant="primary" size="lg">
            播放音频
          </Button>
          <Button variant="outline">1.5x</Button>
        </div>
        {passage.questions.map((q) => (
          <QuizQuestion
            key={q.id}
            exercise={{
              id: q.id,
              question: q.question,
              options: q.options,
              correctAnswer: q.correctAnswer,
              explanation: '',
            }}
            onAnswer={() => {}}
          />
        ))}
      </div>
    );
  };

  const renderLessonContent = () => {
    if (!lesson.content) return null;
    switch (lesson.type) {
      case 'vocabulary':
        return renderVocabulary(lesson.content as VocabularyContent);
      case 'grammar':
        return renderGrammar(lesson.content as GrammarContent);
      case 'speaking':
        return renderSpeaking(lesson.content as SpeakingContent);
      case 'listening':
        return renderListening(lesson.content as ListeningContent);
      default:
        return null;
    }
  };

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto pb-24 lg:pb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <button
          onClick={() => navigate('/courses')}
          className="flex items-center gap-2 text-dark-500 hover:text-dark-700 mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          返回课程
        </button>
        <h1 className="text-2xl font-heading font-bold text-dark-800">{lesson.title}</h1>
        <p className="text-dark-500">{course.title}</p>
      </motion.div>

      {showResult ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-12"
        >
          <div className="w-20 h-20 rounded-full bg-secondary-500 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-heading font-bold text-dark-800 mb-2">太棒了!</h2>
          <p className="text-dark-500 mb-6">你已经完成了这节课</p>
          <div className="flex justify-center gap-4">
            <Button variant="outline" onClick={() => navigate('/courses')}>
              返回课程
            </Button>
            {currentLessonIndex < course.lessons.length - 1 && (
              <Button onClick={handleNextLesson}>
                下一课
              </Button>
            )}
          </div>
        </motion.div>
      ) : (
        <motion.div
          key={lesson.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          {renderLessonContent()}
        </motion.div>
      )}

      <div className="mt-8">
        <h3 className="font-semibold text-dark-700 mb-3">课程目录</h3>
        <div className="space-y-2">
          {course.lessons.map((l, index) => (
            <LessonItem
              key={l.id}
              lesson={l}
              index={index}
              isCompleted={index < currentLessonIndex}
              isLocked={isLocked}
              onClick={() => handleLessonClick(index)}
            />
          ))}
        </div>
      </div>

      {showVipModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-900/60 backdrop-blur-sm"
          onClick={() => setShowVipModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg"
          >
            <Card padding="none" className="overflow-hidden">
              <button
                onClick={() => setShowVipModal(false)}
                className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-dark-100 hover:bg-dark-200 transition-colors"
              >
                <X className="w-4 h-4 text-dark-500" />
              </button>

              <div className="bg-gradient-to-br from-accent-500 to-primary-600 p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/20 flex items-center justify-center">
                  <Crown className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-white mb-2">
                  解锁 VIP 课程
                </h3>
                <p className="text-white/80">
                  升级会员即可学习全部 VIP 课程
                </p>
              </div>

              <div className="p-6">
                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-accent-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-dark-800">全部 100+ 精品课程</p>
                      <p className="text-sm text-dark-500">覆盖初/中/高级全部难度</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-accent-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-dark-800">AI 智能口语评测</p>
                      <p className="text-sm text-dark-500">实时纠正发音，提升口语</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-accent-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-dark-800">专属学习报告</p>
                      <p className="text-sm text-dark-500">追踪进度，查漏补缺</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setShowVipModal(false)}
                  >
                    再想想
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={() => {
                      setShowVipModal(false);
                      navigate('/membership');
                    }}
                  >
                    立即升级
                  </Button>
                </div>

                <p className="text-center text-dark-400 text-xs mt-4">
                  7天无理由退款 · 随时取消
                </p>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
