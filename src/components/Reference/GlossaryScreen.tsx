import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import { RED_FLAG_GLOSSARY } from '../../data/glossary';

export function GlossaryScreen() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="font-display text-3xl font-semibold text-ash-50">Red Flag Glossary</h1>
      <p className="text-ash-400 mt-2 max-w-xl">
        The patterns behind almost every phishing email, independent of which brand or scenario
        it's wearing. Recognize these, and the specific disguise stops mattering.
      </p>

      <div className="mt-9 space-y-3">
        {RED_FLAG_GLOSSARY.map((entry, i) => (
          <motion.details
            key={entry.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.03 }}
            className="group rounded-xl border border-ink-border bg-ink-surface px-5 py-4 open:bg-ink-raised/40"
          >
            <summary className="flex items-start gap-3 cursor-pointer list-none">
              <span className="grid place-items-center w-7 h-7 rounded-md bg-amber/10 text-amber shrink-0 mt-0.5">
                <AlertTriangle size={14} />
              </span>
              <div className="flex-1">
                <p className="font-medium text-ash-50">{entry.title}</p>
                <p className="text-sm text-ash-400 mt-0.5">{entry.summary}</p>
              </div>
              <span className="font-mono text-xs text-ash-600 mt-1.5 group-open:rotate-90 transition-transform">
                +
              </span>
            </summary>
            <p className="text-sm text-ash-200 mt-3 pl-10 leading-relaxed">{entry.details}</p>
          </motion.details>
        ))}
      </div>
    </div>
  );
}
