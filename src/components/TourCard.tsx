import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Tour } from '@/lib/tours';
import { formatDays, formatPrice } from '@/lib/tours';
import { cn } from '@/lib/utils';

type TourCardProps = {
  tour: Tour;
  href?: string;
  priority?: boolean;
  className?: string;
  layout?: 'grid' | 'featured';
};

export default function TourCard({
  tour,
  href,
  priority,
  className,
  layout = 'grid',
}: TourCardProps) {
  const isFeatured = layout === 'featured';

  return (
    <Link
      href={href ?? `/tour/${tour.id}`}
      className={cn(
        'group relative block cursor-pointer overflow-hidden rounded-md bg-muted text-left',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/35 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        className,
      )}
    >
      <div
        className={cn(
          'relative overflow-hidden',
          isFeatured
            ? 'aspect-5/4 sm:aspect-16/10 lg:aspect-21/11'
            : 'aspect-4/5',
        )}
      >
        <Image
          src={tour.image}
          alt={tour.name}
          fill
          priority={priority}
          sizes={
            isFeatured
              ? '(max-width:1024px) 100vw, 50vw'
              : '(max-width:768px) 100vw, 33vw'
          }
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
        />

        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(to_top,rgb(12_20_16/0.92)_0%,rgb(12_20_16/0.55)_38%,rgb(12_20_16/0.18)_68%,rgb(12_20_16/0.08)_100%)] transition-opacity duration-300 group-hover:opacity-95"
        />

        <div
          className={cn(
            'absolute inset-x-0 bottom-0 flex flex-col',
            isFeatured ? 'p-5 sm:p-6 lg:p-7' : 'p-5',
          )}
        >
          <p className="text-[11px] font-medium tracking-[0.14em] text-highlight uppercase">
            {tour.destination}
            <span className="text-white/40"> · </span>
            {tour.styles[0]}
            <span className="text-white/40"> · </span>
            {formatDays(tour.days)}
          </p>

          <h3
            className={cn(
              'mt-2 font-medium tracking-[-0.03em] text-white',
              isFeatured ? 'text-2xl sm:text-3xl' : 'text-2xl',
            )}
          >
            {tour.name}
          </h3>

          <p
            className={cn(
              'mt-2 text-sm leading-6 text-white/72',
              isFeatured ? 'max-w-xl line-clamp-2' : 'line-clamp-2',
            )}
          >
            {tour.summary}
          </p>

          <div className="mt-5 flex items-end justify-between gap-4 border-t border-white/15 pt-4">
            <div>
              <p className="text-[11px] font-medium tracking-[0.12em] text-white/50 uppercase">
                From
              </p>
              <p
                className={cn(
                  'mt-0.5 font-medium tracking-[-0.02em] text-highlight',
                  isFeatured ? 'text-xl' : 'text-lg',
                )}
              >
                {formatPrice(tour.priceFrom).replace(/^From /, '')}
              </p>
              <p className="mt-1.5 text-[13px] text-white/65">
                {tour.difficulty}
                <span className="text-white/30"> · </span>
                {tour.groupSize}
              </p>
            </div>

            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 px-3.5 py-2 text-sm font-medium text-white transition-all duration-300 group-hover:border-highlight group-hover:bg-highlight group-hover:text-foreground">
              View
              <ArrowRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-0.5"
                aria-hidden
              />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
