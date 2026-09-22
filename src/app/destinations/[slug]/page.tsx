import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import Button from '@/components/Button';
import ChapterMark from '@/components/ChapterMark';
import PageHero from '@/components/PageHero';
import SectionHeader from '@/components/SectionHeader';
import TourCard from '@/components/TourCard';
import { destinations, getDestinationBySlug } from '@/lib/destinations';
import { calendarMonths, getToursForDestination } from '@/lib/tours';
import { travelStyles } from '@/lib/travel-styles';

type DestinationPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return destinations.map((destination) => ({ slug: destination.slug }));
}

export async function generateMetadata({
  params,
}: DestinationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const destination = getDestinationBySlug(slug);
  if (!destination) {
    return { title: 'Destination not found | Mountiva Journeys' };
  }
  return {
    title: `${destination.name} | Mountiva Journeys`,
    description: destination.overview,
  };
}

export default async function DestinationPage({
  params,
}: DestinationPageProps) {
  const { slug } = await params;
  const destination = getDestinationBySlug(slug);
  if (!destination) notFound();

  const packages = getToursForDestination(destination.slug);
  const styleSet = new Set(packages.flatMap((tour) => tour.styles));
  const matchingStyles = travelStyles.filter((style) =>
    styleSet.has(style.name),
  );
  const packageCountLabel =
    packages.length === 1 ? '1 package' : `${packages.length} packages`;

  return (
    <div className="min-h-screen">
      <main>
        <PageHero
          priority
          size="full"
          eyebrow={`${destination.region} · Destination`}
          title={destination.name}
          headline={destination.note}
          description={destination.overview}
          image={destination.gallery[0]?.src ?? destination.image}
          imageAlt={destination.name}
          navLabel="Destination sections"
          nav={[
            { href: '#overview', label: 'Overview' },
            { href: '#packages', label: 'Packages' },
            { href: '#gallery', label: 'Gallery' },
          ]}
        />

        <section
          id="overview"
          className="scroll-mt-28 px-5 py-16 sm:px-6 sm:py-24"
        >
          <div className="mx-auto max-w-7xl">
            <ChapterMark index={1} label="Overview" />

            <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-start lg:gap-16">
              <div>
                <h2 className="text-3xl font-medium tracking-[-0.035em] sm:text-4xl md:text-5xl md:leading-[1.1]">
                  {destination.name}.
                  <span className="mt-2 block text-accent">
                    A place to start the journey.
                  </span>
                </h2>
                <p className="mt-8 text-[15px] leading-7 text-foreground/75 sm:text-base sm:leading-8">
                  {destination.overview}
                </p>

                {matchingStyles.length > 0 ? (
                  <div className="mt-8">
                    <p className="text-[11px] font-medium tracking-[0.14em] text-accent uppercase">
                      Travel styles here
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {matchingStyles.map((style) => (
                        <Link
                          key={style.slug}
                          href={`/travel-styles/${style.slug}`}
                          className="rounded-md border border-accent/15 bg-surface px-3 py-1.5 text-sm font-medium text-foreground/75 transition-colors hover:border-accent/35 hover:text-foreground"
                        >
                          {style.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : null}

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Button href="#packages" variant="primary" size="lg">
                    See packages
                    <ArrowRight size={16} aria-hidden />
                  </Button>
                  <Button href="/destinations" variant="secondary" size="lg">
                    All destinations
                  </Button>
                </div>
              </div>

              <aside className="space-y-4 lg:sticky lg:top-28">
                <div className="relative min-h-[18rem] overflow-hidden rounded-md sm:min-h-[22rem]">
                  <Image
                    className="object-cover"
                    src={destination.image}
                    alt=""
                    fill
                    sizes="(max-width:1024px) 100vw, 35vw"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-[linear-gradient(to_top,rgb(12_20_16/0.78)_0%,transparent_55%)]"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-5 text-surface sm:p-6">
                    <p className="text-[11px] font-medium tracking-[0.14em] text-highlight uppercase">
                      {destination.region}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-surface/80">
                      {packageCountLabel} from this destination
                    </p>
                  </div>
                </div>

                <div className="border border-accent/12 bg-surface px-5 py-6 sm:px-6">
                  <p className="text-[11px] font-medium tracking-[0.14em] text-accent uppercase">
                    Signature stops
                  </p>
                  <ul className="mt-4 divide-y divide-accent/10">
                    {destination.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="py-2.5 text-sm font-medium tracking-[-0.01em]"
                      >
                        {highlight}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 text-[11px] font-medium tracking-[0.14em] text-accent uppercase">
                    Best months
                  </p>
                  <ul className="mt-3 grid grid-cols-4 gap-1.5">
                    {calendarMonths.map((month) => {
                      const active = destination.bestMonths.includes(month);
                      return (
                        <li
                          key={month}
                          className={`flex h-9 items-center justify-center rounded-md text-[11px] font-medium tracking-[0.08em] uppercase ${
                            active
                              ? 'bg-accent text-surface'
                              : 'bg-muted/60 text-foreground/35'
                          }`}
                        >
                          {month.slice(0, 3)}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section
          id="packages"
          className="scroll-mt-28 border-y border-accent/10 bg-surface px-5 py-16 sm:px-6 sm:py-20"
        >
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              eyebrow="Packages"
              title={`Journeys through ${destination.name}`}
              description="Open a package for the full itinerary, stays, and enquiry — each card is built around this destination."
            />

            {packages.length > 0 ? (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {packages.map((tour) => (
                  <TourCard key={tour.id} tour={tour} />
                ))}
              </div>
            ) : (
              <div className="border border-accent/12 px-6 py-10">
                <p className="text-lg font-medium tracking-[-0.02em]">
                  No published package is based here yet.
                </p>
                <p className="mt-2 max-w-lg text-sm leading-6 text-muted-foreground">
                  We still run private itineraries through {destination.name}.
                  Tell us your dates and pace.
                </p>
                <Button href="/contact-us" variant="primary" className="mt-6">
                  Plan a custom trip
                </Button>
              </div>
            )}

            <div className="mt-12 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <Link
                href="/destinations"
                className="font-medium text-accent underline-offset-4 hover:underline"
              >
                All destinations
              </Link>
              <span className="text-accent/30">·</span>
              <Link
                href="/travel-styles"
                className="transition-colors hover:text-foreground"
              >
                Travel styles
              </Link>
            </div>
          </div>
        </section>

        <section
          id="gallery"
          className="scroll-mt-28 border-t border-accent/10 px-5 py-16 sm:px-6 sm:py-24"
        >
          <div className="mx-auto max-w-7xl">
            <ChapterMark index={2} label="Gallery" />
            <div className="mb-10 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
              <h2 className="max-w-md text-3xl font-medium tracking-[-0.03em] sm:text-4xl">
                Frames from {destination.name}
              </h2>
              <p className="max-w-sm text-sm leading-6 text-muted-foreground sm:text-[15px]">
                Signature viewpoints and valley moments — the landscapes these
                packages are built around.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
              {destination.gallery.map((scene, index) => (
                <article
                  key={scene.caption}
                  className="group relative min-h-[16rem] overflow-hidden rounded-md sm:min-h-[22rem]"
                >
                  <Image
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    src={scene.src}
                    alt={scene.alt}
                    fill
                    sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 25vw"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-[linear-gradient(to_top,rgb(12_20_16/0.82)_0%,rgb(12_20_16/0.2)_55%,transparent_100%)]"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-5 text-surface">
                    <span className="text-[12px] font-medium tracking-[0.12em] text-highlight/80 tabular-nums">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className="mt-2 text-xl font-medium tracking-[-0.02em]">
                      {scene.caption}
                    </h3>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
