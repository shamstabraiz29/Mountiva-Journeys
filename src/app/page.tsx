import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Compass,
  Landmark,
  Leaf,
  MapPinned,
  Mountain,
  ShieldCheck,
  Tent,
  Trees,
  TrendingUp,
  Users,
  type LucideIcon,
} from 'lucide-react';
import Button from '@/components/Button';
import DestinationCard from '@/components/DestinationCard';
import HeroSearch from '@/components/HeroSearch';
import SeasonCard, { type Season } from '@/components/SeasonCard';
import SectionHeader from '@/components/SectionHeader';
import TourCard from '@/components/TourCard';
import TrustCard from '@/components/TrustCard';
import { getFeaturedDestinations, getFeaturedTours } from '@/lib/tours';

const adventureTypes: {
  label: string;
  href: string;
  icon: LucideIcon;
}[] = [
  { label: 'Trending trips', href: '/destinations', icon: TrendingUp },
  { label: 'Treks', href: '/travel-styles/trek', icon: Mountain },
  {
    label: 'Cultural & heritage',
    href: '/travel-styles/culture',
    icon: Landmark,
  },
  { label: 'Adventure', href: '/travel-styles/adventure', icon: Tent },
  { label: 'Valley journeys', href: '/travel-styles/valley', icon: Trees },
  {
    label: 'Women travellers',
    href: '/travel-styles/women-travellers',
    icon: Users,
  },
];

const trustPoints = [
  {
    title: 'Northern specialists',
    body: 'Routes tuned for Hunza, Skardu, Fairy Meadows, and the high valleys — not generic city packages.',
    icon: Compass,
  },
  {
    title: 'Local by default',
    body: 'Independent stays and guides from Gilgit-Baltistan, chosen for place knowledge and warm hosting.',
    icon: MapPinned,
  },
  {
    title: 'Clear, trusted planning',
    body: 'Transparent inclusions, paced itineraries, and real support from enquiry through the road home.',
    icon: ShieldCheck,
  },
] as const;

const seasons: Season[] = [
  {
    name: 'Spring',
    months: ['April', 'May'],
    tagline: 'Blossom & soft valley light',
    body: 'Apricot bloom, greener terraces, and milder days — ideal for Hunza and lower valley journeys before high passes fully open.',
    highlights: ['Hunza orchards', 'Attabad shores', 'Quieter roads'],
    tone: 'spring',
  },
  {
    name: 'Summer',
    months: ['June', 'July', 'August'],
    tagline: 'High meadows & open plains',
    body: 'Peak access for Fairy Meadows, Deosai, and longer mountain days when alpine routes and camps are at their best.',
    highlights: ['Fairy Meadows', 'Deosai', 'High viewpoints'],
    tone: 'summer',
  },
  {
    name: 'Autumn',
    months: ['September', 'October'],
    tagline: 'Gold orchards & clear peaks',
    body: 'Crisp air, sharp Karakoram views, and orchard colour — a favourite window for photography and paced valley stays.',
    highlights: ['Golden Hunza', 'Clear skies', 'Comfortable nights'],
    tone: 'autumn',
  },
  {
    name: 'Winter',
    months: ['November', 'December', 'January'],
    tagline: 'Quiet valleys & snow edges',
    body: 'Fewer travellers and snow on the ridges. Soft valley routes work with flexible plans — we shape private itineraries around road conditions.',
    highlights: ['Calm stays', 'Snowy frames', 'Custom pacing'],
    tone: 'winter',
    href: '/contact-us',
    ctaLabel: 'Plan a winter trip',
  },
];

const popularSearches = [
  { label: 'Gilgit', href: '/destinations/gilgit' },
  { label: 'Hunza', href: '/destinations/hunza-valley' },
  { label: 'Skardu', href: '/destinations/skardu' },
  { label: 'Fairy Meadows', href: '/destinations/fairy-meadows' },
] as const;

export default function Home() {
  const featuredTours = getFeaturedTours(4);
  const featuredDestinations = getFeaturedDestinations();

  return (
    <div className="min-h-screen">
      <main>
        <section className="relative -mt-[5.25rem] flex min-h-[110svh] items-end overflow-hidden sm:-mt-[5.5rem] lg:min-h-svh">
          <Image
            className="object-cover object-center"
            src="https://res.cloudinary.com/w57crlm9/image/upload/v1789584669/pexels-raj-kumar-lohana-83082627-8835247_u4jbqb.jpg"
            alt="Mountain peaks and valleys of northern Pakistan"
            fill
            priority
            sizes="100vw"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(to_top,rgb(12_20_16/0.9)_0%,rgb(12_20_16/0.55)_40%,rgb(12_20_16/0.22)_70%,rgb(12_20_16/0.1)_100%)]"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(90deg,rgb(12_20_16/0.4)_0%,transparent_55%)]"
          />

          <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-14 pt-32 sm:px-6 sm:pb-16 md:pb-20 lg:pb-24">
            <div className="flex items-center gap-2 hero-fade-up">
              <span className="flex size-8 items-center justify-center rounded-lg bg-highlight text-foreground">
                <Leaf size={14} aria-hidden />
              </span>
              <p className="text-[11px] font-medium tracking-[0.18em] text-highlight uppercase">
                Gilgit-Baltistan journeys
              </p>
            </div>

            <p className="hero-fade-up mt-5 text-[4.25rem] font-semibold leading-[0.92] tracking-[-0.045em] text-white sm:text-7xl md:text-8xl">
              Mountiva Journeys
            </p>
            <h1 className="hero-fade-up-delay mt-4 max-w-2xl text-2xl font-medium leading-snug tracking-[-0.03em] text-highlight sm:text-3xl md:mt-5 md:text-4xl">
              Discover Pakistan&apos;s north — Hunza to Skardu.
            </h1>
            <p className="hero-fade-up-delay mt-5 max-w-lg text-base leading-7 text-white/78 md:text-[17px]">
              Guided journeys through Gilgit-Baltistan: valley stays, mountain
              roads, and slow days under some of the world&apos;s highest peaks.
            </p>

            <div className="mt-8">
              <HeroSearch />
            </div>

            <p className="hero-fade-up-delay-2 mt-4 text-sm text-white/50">
              Popular searches:{' '}
              {popularSearches.map((item, index) => (
                <span key={item.href}>
                  {index > 0 ? ' · ' : null}
                  <Link
                    href={item.href}
                    className="text-white/70 underline-offset-2 hover:text-highlight hover:underline"
                  >
                    {item.label}
                  </Link>
                </span>
              ))}
            </p>
          </div>
        </section>

        <section
          id="adventure-types"
          className="bg-surface px-5 py-14 sm:px-6 sm:py-16"
        >
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              eyebrow="What we do"
              title="Choose your journey type"
              description="Pick a style that matches how you like to travel — we will take you to the matching packages."
              action={{ href: '/travel-styles', label: 'View travel styles' }}
            />

            <div className="flex gap-3 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-3 lg:gap-4">
              {adventureTypes.map(({ label, href, icon: Icon }, index) => (
                <Link
                  key={label}
                  href={href}
                  className="group relative flex min-w-[11.5rem] flex-col justify-between overflow-hidden rounded-md bg-accent px-5 py-6 text-surface transition-transform duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/35 focus-visible:ring-offset-2 focus-visible:ring-offset-surface sm:min-w-0"
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -right-3 -top-4 text-[5rem] font-semibold leading-none tracking-[-0.06em] text-surface/10 transition-colors duration-300 group-hover:text-highlight/20"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <span className="relative flex size-11 items-center justify-center rounded-md bg-highlight text-foreground">
                    <Icon size={20} strokeWidth={1.6} aria-hidden />
                  </span>

                  <div className="relative mt-10">
                    <p className="text-base font-medium tracking-[-0.02em]">
                      {label}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-[13px] text-highlight">
                      Explore
                      <ArrowRight
                        size={13}
                        className="transition-transform duration-300 group-hover:translate-x-0.5"
                        aria-hidden
                      />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section
          id="destinations"
          className="bg-surface px-5 py-16 sm:px-6 sm:py-20"
        >
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              eyebrow="Start with place"
              title="Popular destinations"
              description="Signature places across Gilgit-Baltistan — choose a valley or meadow, then explore matching packages."
              action={{ href: '/destinations', label: 'View all destinations' }}
            />

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {featuredDestinations.map((destination, index) => (
                <DestinationCard
                  key={destination.name}
                  destination={destination}
                  priority={index < 2}
                  ctaLabel="Explore destination"
                />
              ))}
            </div>
          </div>
        </section>

        <section
          id="packages"
          className="bg-surface px-5 py-16 sm:px-6 sm:py-20"
        >
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              eyebrow="Ready to book"
              title="Featured tours"
              description="Handpicked itineraries with transport, stays, and local guides included — pick a destination to see every package that belongs there."
              action={{ href: '/destinations', label: 'View destinations' }}
            />

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {featuredTours.map((tour, index) => (
                <TourCard key={tour.id} tour={tour} priority={index < 2} />
              ))}
            </div>
          </div>
        </section>

        <section
          id="seasons"
          className="bg-surface px-5 py-16 sm:px-6 sm:py-20"
        >
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              eyebrow="When to go"
              title="Best seasons in the north"
              description="Pick a window that matches the landscapes you want — then open a destination to see packages already strong in that season."
              action={{ href: '/destinations', label: 'Browse destinations' }}
            />

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {seasons.map((season, index) => (
                <SeasonCard key={season.name} season={season} index={index} />
              ))}
            </div>
          </div>
        </section>

        <section
          id="women-travellers"
          className="bg-surface px-5 py-16 sm:px-6 sm:py-20"
        >
          <div className="mx-auto max-w-7xl overflow-hidden rounded-md border border-accent/12 bg-surface">
            <div className="grid lg:grid-cols-2">
              <div className="relative min-h-[22rem] lg:min-h-full">
                <Image
                  className="object-cover object-[center_20%]"
                  src="https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=1200&h=1400&q=80"
                  alt="Woman traveller looking out over mountain peaks"
                  fill
                  sizes="(max-width:1024px) 100vw, 50vw"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-[linear-gradient(to_top,rgb(12_20_16/0.45)_0%,transparent_45%)] lg:bg-[linear-gradient(to_right,transparent_55%,rgb(255_255_255/0.35)_100%)]"
                />
                <p className="absolute bottom-5 left-5 max-w-[14rem] text-sm leading-6 text-white/90 sm:left-6 sm:bottom-6 lg:hidden">
                  Women-only departures through Hunza and the high valleys.
                </p>
              </div>

              <div className="flex flex-col justify-center px-6 py-10 sm:px-10 sm:py-14 lg:px-12 lg:py-16">
                <p className="text-[11px] font-medium tracking-[0.16em] text-accent uppercase">
                  Women travellers
                </p>
                <h2 className="mt-3 text-3xl font-medium tracking-[-0.035em] sm:text-4xl">
                  She came for the peaks.
                  <span className="mt-1 block text-accent/80">
                    She stayed for the quiet.
                  </span>
                </h2>

                <div className="mt-6 space-y-4 text-sm leading-7 text-foreground/75 sm:text-[15px]">
                  <p>
                    On a spring morning above Karimabad, a small circle of women
                    watched apricot blossom catch the first light — no rush to
                    the next viewpoint, no need to explain why the day could
                    move slowly.
                  </p>
                  <p>
                    Mountiva&apos;s women-only journeys are shaped for that kind
                    of travel: trusted local hosts, women-aware pacing, and room
                    to talk, walk, and simply be among the mountains of
                    Gilgit-Baltistan.
                  </p>
                </div>

                <blockquote className="mt-8 border-l-2 border-accent/30 pl-4">
                  <p className="text-base font-medium leading-7 tracking-[-0.01em] text-foreground sm:text-lg">
                    &ldquo;I didn&apos;t want a loud group trip. I wanted to
                    feel the valleys properly — and know I was travelling with
                    women who understood that.&rdquo;
                  </p>
                  <footer className="mt-3 text-[13px] text-muted-foreground">
                    — Aisha, women-only Hunza departure
                  </footer>
                </blockquote>

                <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-[13px] text-foreground/65">
                  <li>Women-only small groups</li>
                  <li className="text-accent/30">·</li>
                  <li>Local women hosts where possible</li>
                  <li className="text-accent/30">·</li>
                  <li>Paced valley days</li>
                </ul>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button
                    href="/travel-styles/women-travellers"
                    variant="primary"
                    size="lg"
                  >
                    See women-only journeys
                    <ArrowRight size={16} aria-hidden />
                  </Button>
                  <Button href="/contact-us" variant="secondary" size="lg">
                    Enquire for women-only
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="why" className="bg-surface px-5 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              eyebrow="Why travellers choose us"
              title="Mountain trips, planned with care"
              description="Mountiva is built for travellers who want northern Pakistan to feel considered — from the first search to the last pass."
            />

            <div className="grid gap-px overflow-hidden rounded-md border border-accent/12 bg-accent/12 sm:grid-cols-3">
              {trustPoints.map((point, index) => (
                <TrustCard
                  key={point.title}
                  title={point.title}
                  body={point.body}
                  icon={point.icon}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-surface px-5 pb-16 pt-16 sm:px-6 sm:pb-20 sm:pt-20">
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-md text-surface">
            <Image
              className="object-cover object-center"
              src="https://res.cloudinary.com/w57crlm9/image/upload/v1789584669/pexels-raj-kumar-lohana-83082627-8835247_u4jbqb.jpg"
              alt=""
              fill
              sizes="(max-width:1280px) 100vw, 1280px"
              aria-hidden
            />
            <div aria-hidden className="absolute inset-0 bg-accent/72" />
            <div
              aria-hidden
              className="absolute inset-0 bg-[linear-gradient(90deg,rgb(12_20_16/0.35)_0%,transparent_55%)]"
            />

            <div className="relative z-10 grid lg:grid-cols-[1.15fr_1fr]">
              <div className="flex flex-col justify-between gap-10 px-6 py-12 sm:px-10 sm:py-14 lg:pr-8">
                <div>
                  <p className="text-[11px] font-medium tracking-[0.16em] text-highlight uppercase">
                    Next step
                  </p>
                  <h2 className="mt-3 max-w-md text-4xl font-medium tracking-[-0.035em] sm:text-5xl">
                    Find your northern route
                  </h2>
                  <p className="mt-4 max-w-md text-sm leading-6 text-surface/80 sm:text-[15px]">
                    Choose a ready itinerary from the collection, or tell us
                    your dates and pace — we&apos;ll shape a private journey
                    through Gilgit-Baltistan.
                  </p>
                </div>

                <div className="flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-surface/65">
                  <span>Local guides</span>
                  <span className="text-surface/30">·</span>
                  <span>Clear inclusions</span>
                  <span className="text-surface/30">·</span>
                  <span>Flexible dates</span>
                </div>
              </div>

              <div className="flex flex-col gap-3 border-t border-surface/15 p-6 sm:p-8 lg:border-t-0 lg:border-l lg:border-surface/15">
                <Link
                  href="/destinations"
                  className="group flex flex-1 flex-col justify-between rounded-md border border-highlight/50 bg-[rgb(197_212_168_/_0.22)] px-5 py-6 text-surface shadow-[inset_0_1px_0_rgb(255_255_255_/_0.12)] backdrop-blur-md transition-colors duration-300 hover:bg-[rgb(197_212_168_/_0.35)]"
                >
                  <div>
                    <p className="text-[11px] font-medium tracking-[0.14em] text-highlight uppercase">
                      Browse
                    </p>
                    <h3 className="mt-2 text-xl font-medium tracking-[-0.02em]">
                      Explore destinations
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-surface/75">
                      Open a place, then choose the package that belongs there —
                      full itineraries sit behind each card.
                    </p>
                  </div>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-highlight">
                    View destinations
                    <ArrowRight
                      size={15}
                      className="transition-transform duration-300 group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </span>
                </Link>

                <Link
                  href="/contact-us"
                  className="group flex flex-1 flex-col justify-between rounded-md border border-surface/25 bg-surface/15 px-5 py-6 text-surface backdrop-blur-md transition-colors duration-300 hover:bg-surface/25"
                >
                  <div>
                    <p className="text-[11px] font-medium tracking-[0.14em] text-highlight uppercase">
                      Customise
                    </p>
                    <h3 className="mt-2 text-xl font-medium tracking-[-0.02em]">
                      Plan a custom trip
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-surface/75">
                      Share your group size and preferred valleys — we reply
                      with a tailored outline.
                    </p>
                  </div>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-highlight">
                    Talk to Mountiva
                    <ArrowRight
                      size={15}
                      className="transition-transform duration-300 group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
