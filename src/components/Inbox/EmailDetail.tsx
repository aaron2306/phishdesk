import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Paperclip,
  Link2,
  ShieldAlert,
  ShieldCheck,
  FileWarning,
} from 'lucide-react';
import { AttemptRecord, EmailScenario, RedFlag, TrustSignal, UserVerdict } from '../../types';
import { cx } from '../../lib/utils';
import { InspectorBadge } from './InspectorBadge';
import { FeedbackPanel } from './FeedbackPanel';
import { Findings } from './Findings';

interface EmailDetailProps {
  scenario: EmailScenario;
  attempt: AttemptRecord | null;
  onSubmitVerdict: (verdict: UserVerdict, usedInspector: boolean) => void;
  onNext: () => void;
  isLast: boolean;
}

type Target = RedFlag['target'];

export function EmailDetail({ scenario, attempt, onSubmitVerdict, onNext, isLast }: EmailDetailProps) {
  const [inspectMode, setInspectMode] = useState(false);
  const [revealedLink, setRevealedLink] = useState(false);

  useEffect(() => {
    setInspectMode(false);
    setRevealedLink(false);
  }, [scenario.id]);

  const items = scenario.isPhishing ? scenario.redFlags : scenario.trustSignals;
  const variant: 'danger' | 'safe' = scenario.isPhishing ? 'danger' : 'safe';

  const numbersByTarget = useMemo(() => {
    const map = new Map<Target, number[]>();
    items.forEach((item, i) => {
      const arr = map.get(item.target) ?? [];
      arr.push(i + 1);
      map.set(item.target, arr);
    });
    return map;
  }, [items]);

  const badge = (target: Target) =>
    inspectMode ? <InspectorBadge numbers={numbersByTarget.get(target) ?? []} variant={variant} /> : null;

  const badgeCombined = (targets: Target[]) => {
    if (!inspectMode) return null;
    const numbers = targets.flatMap((t) => numbersByTarget.get(t) ?? []);
    return <InspectorBadge numbers={numbers} variant={variant} />;
  };

  const highlighted = (target: Target) =>
    inspectMode && (numbersByTarget.get(target)?.length ?? 0) > 0;

  const highlightedAny = (targets: Target[]) => targets.some((t) => highlighted(t));

  const decided = !!attempt;

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        <div className="px-5 sm:px-7 py-6 max-w-2xl">
          {/* Subject */}
          <h2
            className={cx(
              'font-display text-xl font-semibold text-ash-50 leading-snug',
              highlighted('subject') && 'leader-dot text-amber'
            )}
          >
            {scenario.subject}
            {badge('subject')}
          </h2>

          {/* Sender block */}
          <div
            className={cx(
              'mt-4 flex items-center gap-3 pb-4 border-b border-ink-border',
            )}
          >
            <div className="w-9 h-9 rounded-full bg-ink-raised grid place-items-center text-ash-200 font-display font-semibold text-sm shrink-0">
              {scenario.senderName.charAt(0)}
            </div>
            <div className={cx('min-w-0', highlighted('sender') && 'leader-dot text-amber rounded px-1.5 -ml-1.5')}>
              <p className="text-sm font-medium text-ash-50 truncate">
                {scenario.senderName} {badge('sender')}
              </p>
              <p className="text-xs text-ash-400 font-mono truncate">{scenario.senderEmail}</p>
            </div>
            <p className="ml-auto text-xs text-ash-600 shrink-0 font-mono">{scenario.date}</p>
          </div>

          {/* Greeting + body */}
          <div className="mt-5 text-sm leading-relaxed text-ash-200 space-y-3.5">
            <p className={cx(highlighted('greeting') && 'leader-dot text-amber inline-block px-1 -ml-1')}>
              {scenario.greeting} {badge('greeting')}
            </p>
            {scenario.bodyParagraphs.map((p, i) => (
              <p
                key={i}
                className={cx(
                  i === 0 && highlightedAny(['body', 'urgency']) && 'leader-dot text-amber inline-block px-1 -ml-1'
                )}
              >
                {p}
                {i === 0 && badgeCombined(['body', 'urgency'])}
              </p>
            ))}

            {scenario.links.map((link) => (
              <div
                key={link.id}
                className={cx(
                  'mt-2 inline-flex flex-col gap-1 rounded-lg border border-ink-border bg-ink-raised px-3.5 py-2.5',
                  highlighted('link') && 'leader-dot text-amber'
                )}
              >
                <span className="flex items-center gap-2 text-sm font-medium text-amber underline decoration-amber/40">
                  <Link2 size={13} />
                  {link.label}
                  {badge('link')}
                </span>
                <span className="text-xs font-mono text-ash-400">{link.displayUrl}</span>
                {inspectMode && (
                  <button
                    onClick={() => setRevealedLink((r) => !r)}
                    className="mt-1.5 text-left"
                  >
                    {!revealedLink ? (
                      <span className="text-xs text-ash-600 inline-flex items-center gap-1 hover:text-ash-200">
                        <Search size={11} /> Hover/click to reveal actual destination
                      </span>
                    ) : (
                      <span
                        className={cx(
                          'text-xs font-mono inline-flex items-center gap-1 px-2 py-1 rounded',
                          link.suspicious ? 'bg-danger/15 text-danger' : 'bg-safe/15 text-safe'
                        )}
                      >
                        {link.suspicious ? <ShieldAlert size={11} /> : <ShieldCheck size={11} />}
                        Actually points to: {link.actualUrl}
                      </span>
                    )}
                  </button>
                )}
              </div>
            ))}

            {scenario.attachments.length > 0 && (
              <div className="space-y-2 pt-1">
                {scenario.attachments.map((att) => (
                  <div
                    key={att.name}
                    className={cx(
                      'inline-flex items-center gap-2 rounded-lg border border-ink-border bg-ink-raised px-3 py-2 text-sm',
                      highlighted('attachment') && 'leader-dot text-amber'
                    )}
                  >
                    {att.suspicious ? (
                      <FileWarning size={14} className="text-ash-400" />
                    ) : (
                      <Paperclip size={14} className="text-ash-400" />
                    )}
                    <span className="text-ash-200">{att.name}</span>
                    <span className="text-ash-600 text-xs font-mono">{att.size}</span>
                    {badge('attachment')}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Inspector findings list, shown only while actively inspecting and before deciding */}
          {inspectMode && !decided && (
            <div className="mt-7">
              <Findings
                items={items}
                variant={variant}
                title="Annotated findings"
              />
            </div>
          )}
        </div>
      </div>

      {/* Action bar or feedback */}
      {!decided ? (
        <div className="border-t border-ink-border bg-ink-surface px-5 sm:px-7 py-4 flex items-center gap-3 flex-wrap">
          <button
            onClick={() => setInspectMode((v) => !v)}
            className={cx(
              'inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-medium border transition-colors',
              inspectMode
                ? 'bg-amber/15 border-amber/40 text-amber'
                : 'border-ink-border text-ash-200 hover:bg-ink-raised'
            )}
          >
            <Search size={15} />
            {inspectMode ? 'Inspecting…' : 'Investigate'}
          </button>
          <div className="ml-auto flex items-center gap-2.5">
            <button
              onClick={() => onSubmitVerdict('safe', inspectMode)}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-semibold bg-safe/15 text-safe border border-safe/30 hover:bg-safe/25 transition-colors"
            >
              <ShieldCheck size={15} />
              Mark Safe
            </button>
            <button
              onClick={() => onSubmitVerdict('phishing', inspectMode)}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-semibold bg-danger/15 text-danger border border-danger/30 hover:bg-danger/25 transition-colors"
            >
              <ShieldAlert size={15} />
              Report Phishing
            </button>
          </div>
        </div>
      ) : (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <FeedbackPanel scenario={scenario} attempt={attempt!} onNext={onNext} isLast={isLast} />
        </motion.div>
      )}
    </div>
  );
}
