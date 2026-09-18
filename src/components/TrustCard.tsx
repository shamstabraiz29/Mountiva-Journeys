import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

type TrustCardProps = {
  title: string;
  body: string;
  icon: LucideIcon;
  index?: number;
  className?: string;
};

export default function TrustCard({
  title,
  body,
  icon: Icon,
  index = 0,
  className,
}: TrustCardProps) {
  const number = String(index + 1).padStart(2, '0');

  return (
    <article
      className={cn(
        'group flex h-full flex-col bg-surface px-6 py-8 transition-colors duration-300 hover:bg-muted/40 sm:px-7 sm:py-10',
        className
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <span className="flex size-12 items-center justify-center rounded-full border border-accent/20 text-accent transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-highlight">
          <Icon size={20} strokeWidth={1.6} aria-hidden />
        </span>
        <span className="text-sm font-medium tracking-[0.12em] text-accent/40 tabular-nums">
          {number}
        </span>
      </div>

      <h3 className="mt-8 text-xl font-medium tracking-[-0.025em] text-foreground">
        {title}
      </h3>
      <p className="mt-3 max-w-xs text-sm leading-6 text-muted-foreground">
        {body}
      </p>

      <div
        aria-hidden
        className="mt-8 h-px w-10 bg-accent/20 transition-all duration-300 group-hover:w-16 group-hover:bg-accent"
      />
    </article>
  );
}
