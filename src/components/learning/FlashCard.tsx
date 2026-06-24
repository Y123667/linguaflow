import { useState } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Volume2 } from 'lucide-react';
import { clsx } from 'clsx';

interface FlashCardProps {
  term: string;
  translation: string;
  pronunciation: string;
  example: string;
  onNext: () => void;
  onPrev: () => void;
  currentIndex: number;
  total: number;
}

export function FlashCard({
  term,
  translation,
  pronunciation,
  example,
  onNext,
  onPrev,
  currentIndex,
  total,
}: FlashCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(term);
    utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="mb-4 flex items-center justify-between text-sm text-dark-500">
        <span>{currentIndex + 1} / {total}</span>
        <button onClick={() => setIsFlipped(!isFlipped)} className="flex items-center gap-1 hover:text-primary-500 transition-colors">
          <RotateCcw className="w-4 h-4" />
          翻转
        </button>
      </div>

      <motion.div
        className="relative h-64 cursor-pointer perspective-1000"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <motion.div
          className={clsx(
            'absolute inset-0 rounded-2xl shadow-xl backface-hidden',
            isFlipped ? 'bg-secondary-500' : 'bg-white border-2 border-primary-100'
          )}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          {!isFlipped ? (
            <div className="h-full flex flex-col items-center justify-center p-6">
              <h2 className="text-3xl font-heading font-bold text-dark-800 mb-2">{term}</h2>
              <p className="text-dark-400 mb-4">{pronunciation}</p>
              <button
                onClick={(e) => { e.stopPropagation(); handleSpeak(); }}
                className="p-3 rounded-full bg-primary-50 hover:bg-primary-100 transition-colors"
              >
                <Volume2 className="w-6 h-6 text-primary-500" />
              </button>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-6 text-white">
              <p className="text-2xl font-heading font-bold mb-4">{translation}</p>
              <p className="text-sm opacity-80 italic">"{example}"</p>
            </div>
          )}
        </motion.div>
      </motion.div>

      <div className="mt-6 flex justify-center gap-4">
        <button
          onClick={onPrev}
          className="px-6 py-2 rounded-xl bg-dark-100 text-dark-600 hover:bg-dark-200 transition-colors"
        >
          上一个
        </button>
        <button
          onClick={onNext}
          className="px-6 py-2 rounded-xl gradient-primary text-white hover:opacity-90 transition-opacity"
        >
          下一个
        </button>
      </div>
    </div>
  );
}
