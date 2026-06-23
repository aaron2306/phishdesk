import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import { AttemptRecord, EmailScenario } from '../../types';
import { Findings } from './Findings';
import { CATEGORY_LABELS } from '../../types';

interface FeedbackPanelProps {
  scenario: EmailScenario;
  attempt: AttemptRecord;
  onNext: () => void;
  isLast: boolean;
}

export function FeedbackPanel({ scenario, attempt, onNext, isLast }: FeedbackPanelProps) {
  const items = scenario.isPhishing ? scenario.redFlags : scenario.trustSignals;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="border-t border-ink-border bg-ink-surface px-5 py-5 sm:px-7"
    >
      <div className="flex items-start gap-3">
        {attempt.correct ? (
          <CheckCircle2 className="text-safe shrink-0 mt-0.5" size={22} />
        ) : (
          <XCircle className="text-danger shrink-0 mt-0.5" size={22} />
        )}
        <div>
          <h3 className="font-display font-semibold text-lg text-ash-50">
            {attempt.correct ? 'Correct call.' : 'Not quite.'}
          </h3>
          <p className="text-sm text-ash-400 mt-0.5">
            This was{' '}
            <span className={scenario.isPhishing ? 'text-danger font-medium' : 'text-safe font-medium'}>
              {scenario.isPhishing ? 'a phishing attempt' : 'a legitimate email'}
            </span>
            {scenario.isPhishing && <> — {CATEGORY_LABELS[scenario.category]}</>}.
            {!attempt.usedInspector && ' You decided without opening Inspect Mode.'}
          </p>
        </div>
      </div>

      <div className="mt-5">
        <Findings
          items={items}
          variant={scenario.isPhishing ? 'danger' : 'safe'}
          title={scenario.isPhishing ? 'Red flags in this email' : 'Why this one checks out'}
        />
      </div>

      <button
        onClick={onNext}
        className="mt-5 inline-flex items-center gap-2 bg-amber text-ink font-semibold px-5 py-2.5 rounded-lg hover:bg-amber-dim transition-colors"
      >
        {isLast ? 'See your results' : 'Next case'}
        <ArrowRight size={15} />
      </button>
    </motion.div>
  );
}
