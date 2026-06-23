import { motion } from 'framer-motion';
import { Mail, Search, ShieldQuestion, Flame, ArrowRight } from 'lucide-react';
import { useSimulator } from '../../context/SimulatorContext';
import { pct } from '../../lib/utils';

interface LandingScreenProps {
  onStart: (count?: number) => void;
}

const STEPS = [
  {
    icon: Mail,
    title: 'Open the email',
    body: 'Each case lands in your inbox looking exactly like the real thing — sender, subject, links, attachments.',
  },
  {
    icon: Search,
    title: 'Investigate',
    body: 'Flip on Inspect Mode to check what links actually point to, and weigh up what feels off.',
  },
  {
    icon: ShieldQuestion,
    title: 'Make the call',
    body: 'Report it as phishing, or mark it safe. Get an immediate, detailed breakdown either way.',
  },
];

export function LandingScreen({ onStart }: LandingScreenProps) {
  const { stats, allScenarios } = useSimulator();
  const total = stats.attempts.length;
  const correct = stats.attempts.filter((a) => a.correct).length;

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 sm:py-20">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-ink-border text-xs font-mono text-amber bg-amber/5 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-amber animate-pulse" />
          {allScenarios.length} cases loaded
        </div>
        <h1 className="font-display text-4xl sm:text-6xl font-semibold tracking-tight text-ash-50 leading-[1.05]">
          Every phish leaves
          <br />
          <span className="text-amber">a fingerprint.</span>
        </h1>
        <p className="mt-5 text-ash-400 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
          PhishDesk drops realistic scam and legitimate emails into a simulated inbox.
          Investigate each one like evidence, then decide: report it, or mark it safe.
        </p>

        <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => onStart()}
            className="group inline-flex items-center gap-2 bg-amber text-ink font-semibold px-6 py-3 rounded-lg hover:bg-amber-dim transition-colors"
          >
            Start full session
            <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
          <button
            onClick={() => onStart(8)}
            className="inline-flex items-center gap-2 border border-ink-border text-ash-200 font-medium px-6 py-3 rounded-lg hover:bg-ink-raised transition-colors"
          >
            Quick 8-case round
          </button>
        </div>

        {total > 0 && (
          <div className="mt-8 inline-flex items-center gap-5 text-sm text-ash-400 font-mono">
            <span>
              Lifetime accuracy <span className="text-ash-50">{pct(correct, total)}%</span>
            </span>
            <span className="flex items-center gap-1">
              <Flame size={14} className="text-amber" /> best streak {stats.bestStreak}
            </span>
          </div>
        )}
      </motion.div>

      <div className="mt-20 grid sm:grid-cols-3 gap-5">
        {STEPS.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 + i * 0.08 }}
            className="rounded-xl border border-ink-border bg-ink-surface p-5"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="grid place-items-center w-8 h-8 rounded-md bg-ink-raised text-amber">
                <step.icon size={16} />
              </span>
              <span className="font-mono text-xs text-ash-600">0{i + 1}</span>
            </div>
            <h3 className="font-display font-semibold text-ash-50 mb-1.5">{step.title}</h3>
            <p className="text-sm text-ash-400 leading-relaxed">{step.body}</p>
          </motion.div>
        ))}
      </div>

      <p className="mt-12 text-center text-xs text-ash-600 max-w-md mx-auto leading-relaxed">
        Every organization, person, and domain in this simulator is fictional and built for
        training. No real emails are sent and no real data leaves your browser.
      </p>
    </div>
  );
}
