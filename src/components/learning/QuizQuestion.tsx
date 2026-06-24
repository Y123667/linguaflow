import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Lightbulb } from 'lucide-react';
import { clsx } from 'clsx';
import { Button } from '../common/Button';
import type { GrammarExercise } from '../../types';

interface QuizQuestionProps {
  exercise: GrammarExercise;
  onAnswer: (correct: boolean) => void;
}

export function QuizQuestion({ exercise, onAnswer }: QuizQuestionProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleSelect = (index: number) => {
    if (showResult) return;
    setSelected(index);
  };

  const handleSubmit = () => {
    if (selected === null) return;
    setShowResult(true);
    const correct = selected === exercise.correctAnswer;
    setTimeout(() => {
      onAnswer(correct);
      setSelected(null);
      setShowResult(false);
    }, 2000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-6 p-4 bg-primary-50 rounded-xl border border-primary-100">
        <p className="text-lg font-medium text-dark-800">{exercise.question}</p>
      </div>

      <div className="space-y-3">
        {exercise.options.map((option, index) => (
          <motion.button
            key={index}
            onClick={() => handleSelect(index)}
            className={clsx(
              'w-full p-4 rounded-xl border-2 text-left transition-all',
              showResult
                ? index === exercise.correctAnswer
                  ? 'bg-secondary-50 border-secondary-500'
                  : index === selected
                    ? 'bg-red-50 border-red-500'
                    : 'bg-dark-50 border-dark-200 opacity-50'
                : selected === index
                  ? 'bg-primary-50 border-primary-500'
                  : 'bg-white border-dark-200 hover:border-primary-300 hover:bg-primary-50'
            )}
            whileHover={{ scale: showResult ? 1 : 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            <div className="flex items-center gap-3">
              <span className={clsx(
                'w-8 h-8 rounded-lg flex items-center justify-center font-medium text-sm',
                showResult
                  ? index === exercise.correctAnswer
                    ? 'bg-secondary-500 text-white'
                    : index === selected
                      ? 'bg-red-500 text-white'
                      : 'bg-dark-200 text-dark-500'
                  : selected === index
                    ? 'bg-primary-500 text-white'
                    : 'bg-dark-100 text-dark-500'
              )}>
                {String.fromCharCode(65 + index)}
              </span>
              <span className="flex-1 text-dark-700">{option}</span>
              <AnimatePresence>
                {showResult && index === exercise.correctAnswer && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                    <CheckCircle className="w-6 h-6 text-secondary-500" />
                  </motion.div>
                )}
                {showResult && index === selected && index !== exercise.correctAnswer && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                    <XCircle className="w-6 h-6 text-red-500" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {showResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-6 p-4 bg-accent-50 rounded-xl border border-accent-200"
          >
            <div className="flex items-start gap-3">
              <Lightbulb className="w-6 h-6 text-accent-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-accent-700">答案解析</p>
                <p className="text-sm text-dark-600 mt-1">{exercise.explanation}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!showResult && (
        <div className="mt-6 flex justify-center">
          <Button onClick={handleSubmit} disabled={selected === null}>
            确认答案
          </Button>
        </div>
      )}
    </div>
  );
}
