import { ShieldAlert, ShieldCheck, Circle } from 'lucide-react';
import { EmailScenario, AttemptRecord } from '../../types';
import { cx } from '../../lib/utils';

interface InboxListProps {
  queue: EmailScenario[];
  currentIndex: number;
  attempts: AttemptRecord[];
}

export function InboxList({ queue, currentIndex, attempts }: InboxListProps) {
  const attemptFor = (id: string) => attempts.find((a) => a.scenarioId === id);

  return (
    <div className="h-full overflow-y-auto scrollbar-thin">
      <div className="px-4 py-3 border-b border-ink-border sticky top-0 bg-ink-surface">
        <p className="text-xs font-mono text-ash-600 uppercase tracking-wider">
          Inbox · {queue.length} cases
        </p>
      </div>
      <ul>
        {queue.map((email, i) => {
          const attempt = attemptFor(email.id);
          const isCurrent = i === currentIndex;
          const isPast = i < currentIndex;

          return (
            <li
              key={email.id}
              className={cx(
                'border-b border-ink-border px-4 py-3 cursor-default',
                isCurrent && 'bg-ink-raised',
                isPast && !isCurrent && 'opacity-50'
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-medium text-ash-50 truncate">{email.senderName}</p>
                {attempt && (
                  <span
                    className={cx(
                      'shrink-0 mt-0.5',
                      attempt.correct ? 'text-safe' : 'text-danger'
                    )}
                  >
                    {attempt.verdict === 'phishing' ? (
                      <ShieldAlert size={14} />
                    ) : (
                      <ShieldCheck size={14} />
                    )}
                  </span>
                )}
                {!attempt && isCurrent && <Circle size={8} className="text-amber mt-1.5 shrink-0" fill="currentColor" />}
              </div>
              <p className="text-xs text-ash-200 truncate mt-0.5">{email.subject}</p>
              <p className="text-xs text-ash-600 truncate mt-0.5">{email.preview}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
