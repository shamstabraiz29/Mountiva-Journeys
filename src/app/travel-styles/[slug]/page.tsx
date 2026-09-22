import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import Button from '@/components/Button';
import ChapterMark from '@/components/ChapterMark';
import DestinationCard from '@/components/DestinationCard';
import PageHero from '@/components/PageHero';
import SectionHeader from '@/components/SectionHeader';
import TourCard from '@/components/TourCard';
import { getDestinationsForStyle, getToursForStyle } from '@/lib/tours';
import { getTravelStyleBySlug, travelStyles } from '@/lib/travel-styles';

type TravelStylePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return travelStyles.map((style) => ({ slug: style.slug }));
}

export async function generateMetadata({
  params,
}: TravelStylePageProps): Promise<Metadata> {
  const { slug } = await params;
  const style = getTravelStyleBySlug(slug);
  if (!style) {
    return { title: 'Travel style not found | Mountiva Journeys' };
  }
  return {
    title: `${style.label} | Mountiva Journeys`,
    description: style.overview,
  };
}

export default async function TravelStylePage({
  params,
}: TravelStylePageProps) {
  const { slug } = await params;
  const style = getTravelStyleBySlug(slug);
  if (!style) notFound();

  const tours = getToursForStyle(style.slug);
  const places = getDestinationsForStyle(style.slug);
  const otherStyles = travelStyles.filter((item) => item.slug !== style.slug);

  return (
    <div className="min-h-screen">
      <main>
        <PageHero
          priority
          size="full"
          eyebrow="Travel style"
          title={style.name}
          headline={style.tagline}
          description={style.overview}
          image={style.image}
          imageAlt={style.label}
          navLabel="Travel style sections"
          nav={[
            { href: '#overview', label: 'Overview' },
            { href: '#packages', label: 'Packages' },
            { href: '#destinations', label: 'Destinations' },
          ]}
        />

        <section
          id="overview"
          className="scroll-mt-28 px-5 py-16 sm:px-6 sm:py-24"
        >
          <div className="mx-auto max-w-7xl">
            <ChapterMark index={1} label="Overview" />
            <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
              <div>
                <h2 className="text-3xl font-medium tracking-[-0.035em] sm:text-4xl md:text-5xl md:leading-[1.1]">
                  {style.label}.
                  <span className="mt-2 block text-accent">
                    Tagged on every matching package.
                  </span>
                </h2>
                <p className="mt-8 max-w-2xl text-[15px] leading-7 text-foreground/75 sm:text-base sm:leading-8">
                  {style.overview}
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button href="#packages" variant="primary" size="lg">
                    See matching packages
                    <ArrowRight size={16} aria-hidden />
                  </Button>
                  <Button href="/destinations" variant="secondary" size="lg">
                    Browse destinations
                  </Button>
                </div>
              </div>
              <p className="max-w-sm text-sm leading-6 text-muted-foreground">
                {tours.length} {tours.length === 1 ? 'package' : 'packages'} ·{' '}
                {places.length}{' '}
                {places.length === 1 ? 'destination' : 'destinations'}. Packages
                can carry more than one style — a Hunza valley journey might
                also be tagged Culture.
              </p>
            </div>
          </div>
        </section>

        <section
          id="packages"
          className="scroll-mt-28 border-y border-accent/10 bg-surface px-5 py-16 sm:px-6 sm:py-20"
        >
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              eyebrow="Matching packages"
              title={`${style.label} in the collection`}
              description="These packages are tagged with this style — open any card for the full itinerary."
            />

            {tours.length > 0 ? (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {tours.map((tour) => (
                  <TourCard key={tour.id} tour={tour} />
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                No packages are tagged with this style yet.
              </p>
            )}
          </div>
        </section>

        <section
          id="destinations"
          className="scroll-mt-28 px-5 py-16 sm:px-6 sm:py-20"
        >
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              eyebrow="Where this style goes"
              title="Destinations"
              description="Places with at least one package tagged this way — open a destination for the map, gallery, and local packages."
              action={{ href: '/destinations', label: 'All destinations' }}
            />

            {places.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {places.map((destination) => (
                  <DestinationCard
                    key={destination.slug}
                    destination={destination}
                  />
                ))}
              </div>
            ) : null}

            {otherStyles.length > 0 ? (
              <div className="mt-14 border-t border-accent/10 pt-10">
                <p className="text-[11px] font-medium tracking-[0.14em] text-accent uppercase">
                  Other styles
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {otherStyles.map((item) => (
                    <Link
                      key={item.slug}
                      href={`/travel-styles/${item.slug}`}
                      className="rounded-md border border-accent/15 bg-surface px-3.5 py-2 text-sm font-medium text-foreground/75 transition-colors hover:border-accent/35 hover:text-foreground"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </section>
      </main>
    </div>
  );
}
