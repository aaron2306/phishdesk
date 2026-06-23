import { Flame, X } from 'lucide-react';
import { pct } from '../../lib/utils';
import { AttemptRecord } from '../../types';

interface SessionHeaderProps {
  currentIndex: number;
  total: number;
  attempts: AttemptRecord[];
  streak: number;
  onQuit: () => void;
}

export function SessionHeader({ currentIndex, total, attempts, streak, onQuit }: SessionHeaderProps) {
  const correct = attempts.filter((a) => a.correct).length;
  const progress = Math.min(currentIndex, total);

  return (
    <div className="border-b border-ink-border bg-ink-surface/60">
      <div className="px-5 sm:px-7 py-2.5 flex items-center gap-4 text-xs font-mono text-ash-400">
        <span>
          Case <span className="text-ash-50">{Math.min(progress + 1, total)}</span> / {total}
        </span>
        <span>
          Accuracy <span className="text-ash-50">{pct(correct, attempts.length)}%</span>
        </span>
        <span className="flex items-center gap-1 text-amber">
          <Flame size={12} /> {streak}
        </span>
        <div className="flex-1 h-1 rounded-full bg-ink-raised overflow-hidden">
          <div
            className="h-full bg-amber transition-all duration-300"
            style={{ width: `${pct(progress, total)}%` }}
          />
        </div>
        <button onClick={onQuit} className="text-ash-600 hover:text-ash-200 transition-colors">
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
