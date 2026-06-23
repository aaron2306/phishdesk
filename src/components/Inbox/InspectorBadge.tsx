import { cx } from '../../lib/utils';

interface InspectorBadgeProps {
  numbers: number[];
  variant: 'danger' | 'safe';
}

export function InspectorBadge({ numbers, variant }: InspectorBadgeProps) {
  if (numbers.length === 0) return null;
  return (
    <span
      className={cx(
        'leader-dot inline-flex items-center gap-1 ml-2 px-1.5 py-0.5 rounded text-[11px] font-mono font-semibold align-middle',
        variant === 'danger' ? 'text-danger bg-danger/10' : 'text-safe bg-safe/10'
      )}
    >
      {numbers.map((n) => `#${n}`).join(' ')}
    </span>
  );
}
