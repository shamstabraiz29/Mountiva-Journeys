import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Destination } from '@/lib/tours';
import { cn } from '@/lib/utils';

type DestinationCardProps = {
  destination: Destination;
  href?: string;
  priority?: boolean;
  ctaLabel?: string;
  className?: string;
};

export default function DestinationCard({
  destination,
  href,
  priority,
  ctaLabel = 'Explore packages',
  className,
}: DestinationCardProps) {
  const { name, region, note, image, slug } = destination;

  return (
    <Link
      href={href ?? `/destinations/${slug}`}
      className={cn(
        'group relative block cursor-pointer overflow-hidden',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/35 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-md',
        className,
      )}
    >
      <div className="relative aspect-4/5 overflow-hidden bg-muted">
        <Image
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
          src={image}
          alt={name}
          fill
          priority={priority}
          sizes="(max-width:768px) 100vw, 25vw"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(to_top,rgb(12_20_16/0.82)_0%,rgb(12_20_16/0.2)_45%,transparent_70%)]"
        />
        <div className="absolute inset-x-0 bottom-0 p-5">
          <p className="text-[11px] font-medium tracking-[0.14em] text-highlight uppercase">
            {region}
          </p>
          <h3 className="mt-1 text-2xl font-medium tracking-[-0.03em] text-white">
            {name}
          </h3>
          <p className="mt-2 text-sm leading-6 text-white/70">{note}</p>
          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-highlight transition-transform duration-300 group-hover:translate-x-0.5">
            {ctaLabel}
            <ArrowRight size={14} aria-hidden />
          </span>
        </div>
      </div>
    </Link>
  );
}
