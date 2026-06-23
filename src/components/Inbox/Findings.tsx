import { AlertTriangle, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { RedFlag, TrustSignal } from '../../types';

interface FindingsProps {
  items: (RedFlag | TrustSignal)[];
  variant: 'danger' | 'safe';
  title: string;
}

export function Findings({ items, variant, title }: FindingsProps) {
  if (items.length === 0) {
    return (
      <div className="rounded-lg border border-ink-border bg-ink-surface p-4 text-sm text-ash-400">
        No notable signals were tagged for this case.
      </div>
    );
  }

  return (
    <div className="space-y-2.5">
      <p className="text-xs font-mono uppercase tracking-wider text-ash-600">{title}</p>
      {items.map((item, i) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, x: -6 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.25, delay: i * 0.05 }}
          className={`rounded-lg border p-3 ${
            variant === 'danger'
              ? 'border-danger/30 bg-danger/5'
              : 'border-safe/30 bg-safe/5'
          }`}
        >
          <div className="flex items-start gap-2.5">
            <span
              className={`shrink-0 mt-0.5 grid place-items-center w-5 h-5 rounded text-[11px] font-mono font-bold ${
                variant === 'danger' ? 'bg-danger/15 text-danger' : 'bg-safe/15 text-safe'
              }`}
            >
              {i + 1}
            </span>
            <div>
              <p className="text-sm font-medium text-ash-50 flex items-center gap-1.5">
                {variant === 'danger' ? (
                  <AlertTriangle size={13} className="text-danger" />
                ) : (
                  <ShieldCheck size={13} className="text-safe" />
                )}
                {item.label}
              </p>
              <p className="text-xs text-ash-400 mt-1 leading-relaxed">{item.description}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
