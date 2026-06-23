import { Fish, ShieldCheck, BookOpenText, Settings2, Flame } from 'lucide-react';
import { cx, pct } from '../../lib/utils';
import { useSimulator } from '../../context/SimulatorContext';

export type Screen = 'landing' | 'simulator' | 'admin' | 'glossary';

interface TopNavProps {
  screen: Screen;
  onNavigate: (screen: Screen) => void;
}

export function TopNav({ screen, onNavigate }: TopNavProps) {
  const { stats } = useSimulator();
  const total = stats.attempts.length;
  const correct = stats.attempts.filter((a) => a.correct).length;

  const navItem = (key: Screen, label: string, Icon: typeof Fish) => (
    <button
      onClick={() => onNavigate(key)}
      className={cx(
        'flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors',
        screen === key
          ? 'bg-ink-raised text-ash-50'
          : 'text-ash-400 hover:text-ash-50 hover:bg-ink-raised/60'
      )}
    >
      <Icon size={15} strokeWidth={2} />
      {label}
    </button>
  );

  return (
    <header className="border-b border-ink-border bg-ink-surface/80 backdrop-blur sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <button
          onClick={() => onNavigate('landing')}
          className="flex items-center gap-2 font-display font-semibold text-ash-50 shrink-0"
        >
          <span className="grid place-items-center w-7 h-7 rounded-md bg-amber/15 text-amber">
            <Fish size={16} strokeWidth={2.25} />
          </span>
          <span className="tracking-tight">PhishDesk</span>
        </button>

        <nav className="hidden sm:flex items-center gap-1">
          {navItem('simulator', 'Simulator', ShieldCheck)}
          {navItem('glossary', 'Red Flag Glossary', BookOpenText)}
          {navItem('admin', 'Scenario Admin', Settings2)}
        </nav>

        <div className="flex items-center gap-3 text-xs font-mono text-ash-400 shrink-0">
          {total > 0 && (
            <>
              <span className="hidden md:inline">
                Accuracy <span className="text-ash-50">{pct(correct, total)}%</span>
              </span>
              <span className="flex items-center gap-1 text-amber">
                <Flame size={13} />
                {stats.streak}
              </span>
            </>
          )}
        </div>
      </div>

      <nav className="sm:hidden flex items-center gap-1 px-4 pb-2 overflow-x-auto">
        {navItem('simulator', 'Simulator', ShieldCheck)}
        {navItem('glossary', 'Glossary', BookOpenText)}
        {navItem('admin', 'Admin', Settings2)}
      </nav>
    </header>
  );
}
