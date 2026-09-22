import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { TravelStyle } from '@/lib/travel-styles';
import { getTravelStyleHref } from '@/lib/travel-styles';
import { cn } from '@/lib/utils';

type TravelStyleCardProps = {
  style: TravelStyle;
  tourCount?: number;
  priority?: boolean;
  className?: string;
};

export default function TravelStyleCard({
  style,
  tourCount,
  priority,
  className,
}: TravelStyleCardProps) {
  return (
    <Link
      href={getTravelStyleHref(style.slug)}
      className={cn(
        'group relative block cursor-pointer overflow-hidden rounded-md',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/35 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        className,
      )}
    >
      <div className="relative aspect-4/5 overflow-hidden bg-muted">
        <Image
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
          src={style.image}
          alt={style.label}
          fill
          priority={priority}
          sizes="(max-width:768px) 100vw, (max-width:1024px) 50vw, 33vw"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(to_top,rgb(12_20_16/0.82)_0%,rgb(12_20_16/0.2)_45%,transparent_70%)]"
        />
        <div className="absolute inset-x-0 bottom-0 p-5">
          <p className="text-[11px] font-medium tracking-[0.14em] text-highlight uppercase">
            Travel style
            {typeof tourCount === 'number'
              ? ` · ${tourCount} package${tourCount === 1 ? '' : 's'}`
              : null}
          </p>
          <h3 className="mt-1 text-2xl font-medium tracking-[-0.03em] text-white">
            {style.label}
          </h3>
          <p className="mt-2 text-sm leading-6 text-white/70">
            {style.tagline}
          </p>
          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-highlight transition-transform duration-300 group-hover:translate-x-0.5">
            Explore this style
            <ArrowRight size={14} aria-hidden />
          </span>
        </div>
      </div>
    </Link>
  );
}
