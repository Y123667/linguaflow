import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface WaveformProps {
  audioUrl?: string;
  isRecording?: boolean;
  className?: string;
}

export function Waveform({ audioUrl, isRecording, className }: WaveformProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isRecording || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    audioContextRef.current = new AudioContext();
    analyserRef.current = audioContextRef.current.createAnalyser();
    analyserRef.current.fftSize = 256;

    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      if (!analyserRef.current || !ctx) return;

      animationRef.current = requestAnimationFrame(draw);
      analyserRef.current.getByteFrequencyData(dataArray);

      ctx.fillStyle = '#F1F5F9';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const barWidth = (canvas.width / bufferLength) * 2.5;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = (dataArray[i] / 255) * canvas.height;
        const gradient = ctx.createLinearGradient(0, canvas.height, 0, canvas.height - barHeight);
        gradient.addColorStop(0, '#6366F1');
        gradient.addColorStop(1, '#10B981');
        ctx.fillStyle = gradient;
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
        x += barWidth + 1;
      }
    };

    draw();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (audioContextRef.current) audioContextRef.current.close();
    };
  }, [isRecording]);

  return (
    <div className={className}>
      <canvas
        ref={canvasRef}
        width={600}
        height={100}
        className="w-full h-24 rounded-xl bg-dark-50"
      />
      {!isRecording && !audioUrl && (
        <div className="h-24 rounded-xl bg-dark-50 flex items-center justify-center">
          <p className="text-dark-400 text-sm">等待录音...</p>
        </div>
      )}
    </div>
  );
}

export function StaticWaveform({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className="h-24 rounded-xl bg-dark-50 flex items-center justify-center gap-1 px-4">
        {[0.3, 0.6, 0.4, 0.8, 0.5, 0.9, 0.3, 0.7, 0.4, 0.6, 0.8, 0.5, 0.3, 0.7, 0.4, 0.6, 0.5, 0.8, 0.3, 0.6, 0.4, 0.7, 0.5, 0.9, 0.4, 0.6, 0.8].map((height, i) => (
          <motion.div
            key={i}
            className="w-2 rounded-full bg-gradient-to-t from-primary-500 to-secondary-500"
            initial={{ height: 10 }}
            animate={{ height: height * 80 + 10 }}
            transition={{ duration: 0.5, delay: i * 0.02 }}
          />
        ))}
      </div>
    </div>
  );
}
