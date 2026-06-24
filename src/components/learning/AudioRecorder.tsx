import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mic, MicOff, Square, Play } from 'lucide-react';
import { clsx } from 'clsx';
import { Button } from '../common/Button';

interface AudioRecorderProps {
  onRecordingComplete: (blob: Blob) => void;
  maxDuration?: number;
}

export function AudioRecorder({ onRecordingComplete, maxDuration = 30 }: AudioRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [duration, setDuration] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };
  }, [audioUrl]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      chunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        onRecordingComplete(blob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setDuration(0);

      timerRef.current = setInterval(() => {
        setDuration((d) => {
          if (d >= maxDuration) {
            stopRecording();
            return d;
          }
          return d + 1;
        });
      }, 1000);
    } catch (err) {
      console.error('Failed to start recording:', err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className={clsx(
        'relative h-48 rounded-2xl border-2 transition-all',
        isRecording
          ? 'bg-red-50 border-red-300 animate-pulse'
          : 'bg-dark-50 border-dark-200'
      )}>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {isRecording ? (
            <>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center mb-4"
              >
                <Mic className="w-8 h-8 text-white" />
              </motion.div>
              <p className="text-2xl font-mono font-bold text-red-500">
                {formatTime(duration)}
              </p>
              <p className="text-sm text-dark-500 mt-1">
                录音中... (最长 {maxDuration} 秒)
              </p>
            </>
          ) : audioUrl ? (
            <>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => new Audio(audioUrl).play()}
                  className="w-12 h-12 rounded-full bg-primary-500 flex items-center justify-center hover:bg-primary-600 transition-colors"
                >
                  <Play className="w-6 h-6 text-white" />
                </button>
                <div>
                  <p className="text-sm text-dark-500">录音完成</p>
                  <p className="text-xs text-dark-400">点击播放试听</p>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="w-16 h-16 rounded-full bg-dark-200 flex items-center justify-center mb-4">
                <MicOff className="w-8 h-8 text-dark-400" />
              </div>
              <p className="text-dark-500">点击下方按钮开始录音</p>
            </>
          )}
        </div>

        {isRecording && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1 bg-red-400 rounded-full"
                animate={{
                  height: [10, 30, 10],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 0.5,
                  delay: i * 0.1,
                }}
              />
            ))}
          </div>
        )}
      </div>

      <div className="mt-6 flex justify-center gap-4">
        {!isRecording ? (
          <Button onClick={startRecording} variant="primary" className="gap-2">
            <Mic className="w-5 h-5" />
            开始录音
          </Button>
        ) : (
          <Button onClick={stopRecording} variant="accent" className="gap-2">
            <Square className="w-5 h-5" />
            停止录音
          </Button>
        )}
      </div>
    </div>
  );
}
