import { useState } from 'react';
import { useSimulator } from '../../context/SimulatorContext';
import { InboxList } from './InboxList';
import { EmailDetail } from './EmailDetail';
import { SessionHeader } from './SessionHeader';
import { ResultsSummary } from '../Results/ResultsSummary';
import { AttemptRecord, UserVerdict } from '../../types';
import { Inbox as InboxIcon } from 'lucide-react';

interface SimulatorScreenProps {
  onQuit: () => void;
  onRestart: (count?: number) => void;
  onViewGlossary: () => void;
}

export function SimulatorScreen({ onQuit, onRestart, onViewGlossary }: SimulatorScreenProps) {
  const { queue, currentIndex, currentScenario, stats, isFinished, submitVerdict, goToNext } =
    useSimulator();
  const [pendingAttempt, setPendingAttempt] = useState<AttemptRecord | null>(null);

  if (queue.length === 0) {
    return (
      <div className="h-full overflow-y-auto scrollbar-thin">
        <div className="max-w-md mx-auto px-4 py-24 text-center">
          <InboxIcon className="mx-auto text-ash-600 mb-4" size={32} />
          <p className="text-ash-400">No active session. Start one from the home screen.</p>
          <button
            onClick={() => onRestart()}
            className="mt-5 inline-flex items-center gap-2 bg-amber text-ink font-semibold px-5 py-2.5 rounded-lg hover:bg-amber-dim transition-colors"
          >
            Start a session
          </button>
        </div>
      </div>
    );
  }

  if (isFinished) {
    return (
      <div className="h-full overflow-y-auto scrollbar-thin">
        <ResultsSummary
          queue={queue}
          attempts={stats.attempts}
          bestStreak={stats.bestStreak}
          onRestart={onRestart}
          onViewGlossary={onViewGlossary}
        />
      </div>
    );
  }

  if (!currentScenario) return null;

  const handleSubmitVerdict = (verdict: UserVerdict, usedInspector: boolean) => {
    const record = submitVerdict(verdict, usedInspector);
    setPendingAttempt(record);
  };

  const handleNext = () => {
    setPendingAttempt(null);
    goToNext();
  };

  return (
    <div className="flex flex-col h-full min-h-0">
      <SessionHeader
        currentIndex={currentIndex}
        total={queue.length}
        attempts={stats.attempts.slice(-queue.length)}
        streak={stats.streak}
        onQuit={onQuit}
      />
      <div className="flex-1 grid grid-cols-1 md:grid-cols-[300px_1fr] min-h-0">
        <aside className="hidden md:block border-r border-ink-border min-h-0">
          <InboxList queue={queue} currentIndex={currentIndex} attempts={stats.attempts} />
        </aside>
        <main className="min-h-0">
          <EmailDetail
            key={currentScenario.id}
            scenario={currentScenario}
            attempt={pendingAttempt}
            onSubmitVerdict={handleSubmitVerdict}
            onNext={handleNext}
            isLast={currentIndex === queue.length - 1}
          />
        </main>
      </div>
    </div>
  );
}
