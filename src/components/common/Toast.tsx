import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';
import { clsx } from 'clsx';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: string;
  type: ToastType;
  message: string;
}

let toastId = 0;
const listeners: ((toasts: Toast[]) => void)[] = [];
let toasts: Toast[] = [];

function updateToasts(newToasts: Toast[]) {
  toasts = newToasts;
  listeners.forEach(listener => listener(toasts));
}

export function toast(type: ToastType, message: string, duration = 3000) {
  const id = `toast-${++toastId}`;
  updateToasts([...toasts, { id, type, message }]);

  if (duration > 0) {
    setTimeout(() => {
      dismissToast(id);
    }, duration);
  }
}

export function dismissToast(id: string) {
  updateToasts(toasts.filter(t => t.id !== id));
}

export function ToastContainer() {
  const [currentToasts, setCurrentToasts] = useState<Toast[]>([]);

  useEffect(() => {
    listeners.push(setCurrentToasts);
    return () => {
      const index = listeners.indexOf(setCurrentToasts);
      if (index > -1) listeners.splice(index, 1);
    };
  }, []);

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-secondary-500" />,
    error: <XCircle className="w-5 h-5 text-red-500" />,
    warning: <AlertCircle className="w-5 h-5 text-accent-500" />,
    info: <Info className="w-5 h-5 text-primary-500" />,
  };

  const backgrounds = {
    success: 'bg-secondary-50 border-secondary-200',
    error: 'bg-red-50 border-red-200',
    warning: 'bg-accent-50 border-accent-200',
    info: 'bg-primary-50 border-primary-200',
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      <AnimatePresence>
        {currentToasts.map(t => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, x: 100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.9 }}
            className={clsx(
              'flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg min-w-[280px]',
              backgrounds[t.type]
            )}
          >
            {icons[t.type]}
            <span className="flex-1 text-sm font-medium text-dark-700">{t.message}</span>
            <button
              onClick={() => dismissToast(t.id)}
              className="p-1 rounded-lg hover:bg-dark-100/50 transition-colors"
            >
              <X className="w-4 h-4 text-dark-400" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
