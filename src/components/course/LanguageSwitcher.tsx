import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';
import { clsx } from 'clsx';
import type { Language } from '../../types';

interface LanguageSwitcherProps {
  selected: Language | null;
  onChange: (language: Language) => void;
}

const languages: { code: Language; name: string; flag: string }[] = [
  { code: 'en', name: '英语', flag: '🇬🇧' },
  { code: 'ja', name: '日语', flag: '🇯🇵' },
  { code: 'ko', name: '韩语', flag: '🇰🇷' },
];

export function LanguageSwitcher({ selected, onChange }: LanguageSwitcherProps) {
  return (
    <div className="flex items-center gap-2 p-1.5 bg-dark-100 rounded-xl">
      {languages.map((lang) => (
        <motion.button
          key={lang.code}
          onClick={() => onChange(lang.code)}
          className={clsx(
            'flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all',
            selected === lang.code
              ? 'bg-white text-primary-600 shadow-sm'
              : 'text-dark-500 hover:text-dark-700'
          )}
          whileTap={{ scale: 0.95 }}
        >
          <span className="text-lg">{lang.flag}</span>
          <span className="text-sm">{lang.name}</span>
        </motion.button>
      ))}
    </div>
  );
}
