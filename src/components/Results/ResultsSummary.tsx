import { motion } from 'framer-motion';
import { Trophy, RotateCcw, BookOpenText } from 'lucide-react';
import { AttemptRecord, EmailScenario, CATEGORY_LABELS, ScamCategory } from '../../types';
import { pct } from '../../lib/utils';

interface ResultsSummaryProps {
  queue: EmailScenario[];
  attempts: AttemptRecord[];
  bestStreak: number;
  onRestart: (count?: number) => void;
  onViewGlossary: () => void;
}

export function ResultsSummary({ queue, attempts, bestStreak, onRestart, onViewGlossary }: ResultsSummaryProps) {
  const sessionAttempts = attempts.slice(-queue.length);
  const correct = sessionAttempts.filter((a) => a.correct).length;
  const accuracy = pct(correct, sessionAttempts.length);

  const byCategory = new Map<ScamCategory, { correct: number; total: number }>();
  sessionAttempts.forEach((a) => {
    const scenario = queue.find((q) => q.id === a.scenarioId);
    if (!scenario) return;
    const entry = byCategory.get(scenario.category) ?? { correct: 0, total: 0 };
    entry.total += 1;
    if (a.correct) entry.correct += 1;
    byCategory.set(scenario.category, entry);
  });

  const sortedCategories = Array.from(byCategory.entries()).sort(
    (a, b) => pct(a[1].correct, a[1].total) - pct(b[1].correct, b[1].total)
  );

  const headline =
    accuracy === 100
      ? 'Perfect read. Every case called correctly.'
      : accuracy >= 80
      ? 'Sharp eye — only a couple slipped through.'
      : accuracy >= 50
      ? 'Solid foundation, with some clear gaps to close.'
      : 'A rough round — but this is exactly what training is for.';

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <span className="inline-grid place-items-center w-12 h-12 rounded-full bg-amber/15 text-amber mb-4">
          <Trophy size={22} />
        </span>
        <h1 className="font-display text-3xl font-semibold text-ash-50">{headline}</h1>
        <p className="text-ash-400 mt-2">
          You reviewed {sessionAttempts.length} cases this round.
        </p>

        <div className="mt-7 grid grid-cols-3 gap-3 max-w-md mx-auto">
          <div className="rounded-xl border border-ink-border bg-ink-surface py-4">
            <p className="text-2xl font-display font-semibold text-amber">{accuracy}%</p>
            <p className="text-xs text-ash-600 mt-1">Accuracy</p>
          </div>
          <div className="rounded-xl border border-ink-border bg-ink-surface py-4">
            <p className="text-2xl font-display font-semibold text-ash-50">{correct}/{sessionAttempts.length}</p>
            <p className="text-xs text-ash-600 mt-1">Correct calls</p>
          </div>
          <div className="rounded-xl border border-ink-border bg-ink-surface py-4">
            <p className="text-2xl font-display font-semibold text-ash-50">{bestStreak}</p>
            <p className="text-xs text-ash-600 mt-1">Best streak</p>
          </div>
        </div>
      </motion.div>

      {sortedCategories.length > 0 && (
        <div className="mt-12">
          <p className="text-xs font-mono uppercase tracking-wider text-ash-600 mb-3">
            Breakdown by scam type
          </p>
          <div className="space-y-2">
            {sortedCategories.map(([cat, { correct: c, total: t }]) => (
              <div key={cat} className="flex items-center gap-3">
                <span className="text-sm text-ash-200 w-44 truncate shrink-0">
                  {CATEGORY_LABELS[cat]}
                </span>
                <div className="flex-1 h-2 rounded-full bg-ink-raised overflow-hidden">
                  <div
                    className="h-full bg-amber"
                    style={{ width: `${pct(c, t)}%` }}
                  />
                </div>
                <span className="text-xs font-mono text-ash-400 w-10 text-right shrink-0">
                  {c}/{t}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          onClick={() => onRestart()}
          className="inline-flex items-center gap-2 bg-amber text-ink font-semibold px-5 py-2.5 rounded-lg hover:bg-amber-dim transition-colors"
        >
          <RotateCcw size={15} />
          Run another session
        </button>
        <button
          onClick={onViewGlossary}
          className="inline-flex items-center gap-2 border border-ink-border text-ash-200 font-medium px-5 py-2.5 rounded-lg hover:bg-ink-raised transition-colors"
        >
          <BookOpenText size={15} />
          Review the red flag glossary
        </button>
      </div>
    </div>
  );
}
