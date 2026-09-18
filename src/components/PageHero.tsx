import Image from 'next/image';
import { cn } from '@/lib/utils';

export type PageHeroNavItem = {
  href: string;
  label: string;
};

type PageHeroProps = {
  eyebrow: string;
  title: string;
  headline: string;
  description: string;
  image: string;
  imageAlt: string;
  nav?: readonly PageHeroNavItem[];
  navLabel?: string;
  /** `full` matches the About page height; `default` is slightly shorter for content pages */
  size?: 'full' | 'default';
  priority?: boolean;
  className?: string;
};

export default function PageHero({
  eyebrow,
  title,
  headline,
  description,
  image,
  imageAlt,
  nav,
  navLabel = 'On this page',
  size = 'default',
  priority = false,
  className,
}: PageHeroProps) {
  const minHeight = size === 'full' ? 'min-h-[92svh]' : 'min-h-[72svh] sm:min-h-[76svh]';

  return (
    <section
      className={cn(
        'relative -mt-[5.25rem] overflow-hidden bg-cover bg-center sm:-mt-[5.5rem]',
        minHeight,
        className
      )}
      style={{ backgroundImage: `url(${image})` }}
    >
      <Image
        className="object-cover object-[center_35%]"
        src={image}
        alt={imageAlt}
        fill
        priority={priority}
        unoptimized={image.startsWith('/')}
        sizes="(max-width:1280px) 100vw, 1600px"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_top,rgb(12_20_16/0.82)_0%,rgb(12_20_16/0.32)_40%,rgb(12_20_16/0.1)_68%,rgb(12_20_16/0.04)_100%)]"
      />

      <div
        className={cn(
          'relative z-10 mx-auto flex max-w-7xl flex-col justify-end px-5 pb-12 pt-36 sm:px-6 sm:pb-16 lg:pb-20',
          minHeight
        )}
      >
        <div className="grid gap-10 lg:grid-cols-[1fr_18rem] lg:items-end">
          <div>
            <p className="hero-fade-up text-[11px] font-medium tracking-[0.2em] text-highlight uppercase">
              {eyebrow}
            </p>
            <p className="hero-fade-up mt-4 text-[4.5rem] font-semibold leading-[0.9] tracking-[-0.05em] text-white sm:text-7xl md:text-8xl lg:text-[6.75rem]">
              {title}
            </p>
            <h1 className="hero-fade-up-delay mt-5 max-w-xl text-xl font-medium leading-snug tracking-[-0.025em] text-highlight sm:text-2xl md:text-3xl">
              {headline}
            </h1>
          </div>

          <p className="hero-fade-up-delay-2 max-w-xs border-l border-highlight/35 pl-5 text-sm leading-6 text-white/70 lg:justify-self-end">
            {description}
          </p>
        </div>

        {nav && nav.length > 0 ? (
          <nav
            aria-label={navLabel}
            className="hero-fade-up-delay-2 mt-12 hidden border-t border-white/15 pt-5 lg:block"
          >
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {nav.map((item, index) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="group inline-flex items-center gap-2 text-[12px] tracking-[0.04em] text-white/55 transition-colors hover:text-highlight"
                  >
                    <span className="tabular-nums text-white/35 group-hover:text-highlight/70">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
      </div>
    </section>
  );
}
