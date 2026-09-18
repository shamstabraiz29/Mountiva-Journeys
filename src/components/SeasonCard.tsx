import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export type Season = {
  name: string;
  months: string[];
  tagline: string;
  body: string;
  highlights: string[];
  image?: string;
  /** Soft Mountiva wash for the card face */
  tone?: 'spring' | 'summer' | 'autumn' | 'winter';
  /** When set, CTA uses this instead of /tour?month= */
  href?: string;
  ctaLabel?: string;
};

const toneStyles: Record<
  NonNullable<Season['tone']>,
  { card: string; mark: string; chip: string }
> = {
  spring: {
    card: 'bg-[#dfe9d8] border-accent/15',
    mark: 'text-accent/15',
    chip: 'bg-surface/80 text-accent',
  },
  summer: {
    card: 'bg-[#c5d4a8] border-accent/15',
    mark: 'text-accent/18',
    chip: 'bg-surface/75 text-accent',
  },
  autumn: {
    card: 'bg-[#d4cfc3] border-accent/15',
    mark: 'text-accent/15',
    chip: 'bg-surface/80 text-accent',
  },
  winter: {
    card: 'bg-[#c8d5d1] border-accent/15',
    mark: 'text-accent/15',
    chip: 'bg-surface/85 text-accent',
  },
};

type SeasonCardProps = {
  season: Season;
  index?: number;
  className?: string;
};

export default function SeasonCard({
  season,
  index = 0,
  className,
}: SeasonCardProps) {
  const href =
    season.href ??
    `/tour?month=${encodeURIComponent(season.months[0] ?? 'any')}`;
  const ctaLabel =
    season.ctaLabel ?? `View ${season.name.toLowerCase()} tours`;
  const tone = toneStyles[season.tone ?? 'spring'];
  const number = String(index + 1).padStart(2, '0');

  return (
    <article
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-md border p-6',
        tone.card,
        className
      )}
    >
      <span
        aria-hidden
        className={cn(
          'pointer-events-none absolute -right-1 -top-2 text-[5.5rem] font-semibold leading-none tracking-[-0.06em]',
          tone.mark
        )}
      >
        {number}
      </span>

      <div className="relative z-10 flex h-full flex-col">
        <p className="text-[11px] font-medium tracking-[0.16em] text-accent uppercase">
          Season {number}
        </p>

        <h3 className="mt-4 text-3xl font-medium tracking-[-0.035em] text-foreground">
          {season.name}
        </h3>
        <p className="mt-2 text-sm font-medium text-foreground/70">
          {season.tagline}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {season.months.map((month) =>
            season.href ? (
              <span
                key={month}
                className={cn(
                  'rounded-md px-2.5 py-1 text-[12px] font-medium',
                  tone.chip
                )}
              >
                {month}
              </span>
            ) : (
              <Link
                key={month}
                href={`/tour?month=${encodeURIComponent(month)}`}
                className={cn(
                  'rounded-md px-2.5 py-1 text-[12px] font-medium transition-colors hover:bg-accent hover:text-surface',
                  tone.chip
                )}
              >
                {month}
              </Link>
            )
          )}
        </div>

        <p className="mt-5 flex-1 text-sm leading-6 text-muted-foreground">
          {season.body}
        </p>

        <p className="mt-4 text-[13px] leading-5 text-foreground/60">
          {season.highlights.join(' · ')}
        </p>

        <Link
          href={href}
          className="mt-6 inline-flex items-center justify-between gap-3 border-t border-accent/15 pt-4 text-sm font-medium text-accent"
        >
          <span>{ctaLabel}</span>
          <span className="flex size-8 items-center justify-center rounded-full bg-accent text-surface transition-transform duration-300 group-hover:translate-x-0.5">
            <ArrowRight size={14} aria-hidden />
          </span>
        </Link>
      </div>
    </article>
  );
}
