import { cn } from '@/lib/utils';

type ChapterMarkProps = {
  index: number;
  label: string;
  tone?: 'default' | 'on-accent';
  className?: string;
};

export default function ChapterMark({
  index,
  label,
  tone = 'default',
  className,
}: ChapterMarkProps) {
  const onAccent = tone === 'on-accent';

  return (
    <div className={cn('mb-8 flex items-center gap-4', className)}>
      <span
        className={cn(
          'flex size-9 items-center justify-center rounded-full border text-[11px] font-medium tracking-[0.08em] tabular-nums',
          onAccent
            ? 'border-highlight/35 text-highlight'
            : 'border-accent/25 text-accent'
        )}
      >
        {String(index).padStart(2, '0')}
      </span>
      <p
        className={cn(
          'text-[11px] font-medium tracking-[0.18em] uppercase',
          onAccent ? 'text-highlight' : 'text-accent'
        )}
      >
        {label}
      </p>
      <span
        aria-hidden
        className={cn(
          'h-px flex-1',
          onAccent ? 'bg-surface/15' : 'bg-accent/15'
        )}
      />
    </div>
  );
}
