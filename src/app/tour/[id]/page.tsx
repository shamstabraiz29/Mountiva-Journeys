import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ArrowRight, Check, X } from 'lucide-react';
import Button from '@/components/Button';
import ChapterMark from '@/components/ChapterMark';
import PageHero from '@/components/PageHero';
import SectionHeader from '@/components/SectionHeader';
import TourCard from '@/components/TourCard';
import {
  calendarMonths,
  formatDays,
  formatPrice,
  getRelatedTours,
  getStayEnquireHref,
  getTourById,
  getTourScenes,
  getTourStays,
  tours,
  type Tour,
  type TourStay,
} from '@/lib/tours';

type TourDetailPageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return tours.map((tour) => ({ id: tour.id }));
}

export async function generateMetadata({
  params,
}: TourDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const tour = getTourById(id);
  if (!tour) {
    return { title: 'Tour not found | Mountiva Journeys' };
  }
  return {
    title: `${tour.name} | Mountiva Journeys`,
    description: tour.summary,
  };
}

function priceLabel(amount: number) {
  return formatPrice(amount).replace(/^From /, '');
}

function EnquirePanel({
  tour,
  stays,
}: {
  tour: Tour;
  stays: TourStay[];
}) {
  return (
    <div className="border border-accent/12 bg-surface">
      <div className="border-b border-accent/10 px-5 py-6 sm:px-6">
        <p className="text-[11px] font-medium tracking-[0.16em] text-accent uppercase">
          From
        </p>
        <p className="mt-2 text-3xl font-medium tracking-[-0.04em] sm:text-4xl">
          {priceLabel(stays[0]?.price ?? tour.priceFrom)}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          per person · {formatDays(tour.days)} · Essential stay
        </p>
      </div>

      <div className="border-b border-accent/10 px-5 py-4 sm:px-6">
        <p className="text-[11px] font-medium tracking-[0.14em] text-accent uppercase">
          Choose a stay
        </p>
        <ul className="mt-3 divide-y divide-accent/10">
          {stays.map((stay) => (
            <li key={stay.id}>
              <Link
                href={`#stay-${stay.id}`}
                className="flex items-baseline justify-between gap-3 py-2.5 text-sm transition-colors hover:text-accent"
              >
                <span className="font-medium tracking-[-0.01em]">
                  {stay.name}
                  {stay.recommended ? (
                    <span className="ml-2 text-[11px] font-medium tracking-[0.08em] text-accent uppercase">
                      Most chosen
                    </span>
                  ) : null}
                </span>
                <span className="shrink-0 tabular-nums text-muted-foreground">
                  {priceLabel(stay.price)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <dl className="divide-y divide-accent/10 px-5 sm:px-6">
        {[
          ['Difficulty', tour.difficulty],
          ['Group size', tour.groupSize],
          ['Style', tour.style],
          ['Region', tour.region],
        ].map(([label, value]) => (
          <div key={label} className="flex items-baseline justify-between gap-4 py-3.5">
            <dt className="text-[11px] font-medium tracking-[0.14em] text-accent uppercase">
              {label}
            </dt>
            <dd className="text-sm font-medium tracking-[-0.01em]">{value}</dd>
          </div>
        ))}
      </dl>

      <div className="flex flex-col gap-3 px-5 py-5 sm:px-6">
        <Button href="#stay" variant="primary" size="lg">
          Compare stays
          <ArrowRight size={16} aria-hidden />
        </Button>
        <Button href="/tour" variant="secondary" size="lg">
          Browse more tours
        </Button>
        <p className="text-[13px] leading-5 text-muted-foreground">
          Essential, Signature, or Private — same route, three ways to stay.
        </p>
      </div>
    </div>
  );
}

export default async function TourDetailPage({ params }: TourDetailPageProps) {
  const { id } = await params;
  const tour = getTourById(id);
  if (!tour) notFound();

  const related = getRelatedTours(tour);
  const scenes = getTourScenes(tour);
  const stays = getTourStays(tour);
  const signatureStay = stays.find((stay) => stay.recommended) ?? stays[1];
  const enquireHref = getStayEnquireHref(tour, signatureStay);
  const facts = [
    { label: 'Duration', value: String(tour.days).padStart(2, '0'), hint: formatDays(tour.days) },
    { label: 'Difficulty', value: tour.difficulty, hint: `${tour.style} pace` },
    { label: 'Group', value: tour.groupSize, hint: 'travellers' },
    { label: 'From', value: priceLabel(tour.priceFrom), hint: 'per person' },
  ] as const;

  return (
    <div className="min-h-screen">
      <main>
        <PageHero
          priority
          size="full"
          eyebrow={`${tour.style} · ${tour.region}`}
          title={tour.destination}
          headline={tour.name}
          description={tour.summary}
          image={tour.image}
          imageAlt={tour.name}
          navLabel="Tour sections"
          nav={[
            { href: '#overview', label: 'Overview' },
            { href: '#route', label: 'Route' },
            { href: '#itinerary', label: 'Itinerary' },
            { href: '#stay', label: 'Stay' },
            { href: '#enquire', label: 'Enquire' },
          ]}
        />

        <section className="border-b border-accent/12">
          <div className="mx-auto grid max-w-7xl grid-cols-2 lg:grid-cols-4">
            {facts.map((fact, index) => (
              <article
                key={fact.label}
                className={`border-accent/12 px-5 py-7 sm:px-8 sm:py-9 ${
                  index < 2 ? 'border-b lg:border-b-0' : ''
                } ${index % 2 === 0 ? 'border-r' : ''} ${
                  index < 3 ? 'lg:border-r' : ''
                }`}
              >
                <p className="text-[11px] font-medium tracking-[0.16em] text-accent uppercase">
                  {fact.label}
                </p>
                <p className="mt-3 text-2xl font-medium tracking-[-0.04em] sm:text-3xl">
                  {fact.value}
                </p>
                <p className="mt-1.5 text-sm text-muted-foreground">{fact.hint}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="overview" className="scroll-mt-28 px-5 py-16 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-7xl">
            <ChapterMark index={1} label="Overview" />

            <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-start lg:gap-16">
              <div>
                <h2 className="text-3xl font-medium tracking-[-0.035em] sm:text-4xl md:text-5xl md:leading-[1.1]">
                  {tour.days} days through {tour.destination}.
                  <span className="mt-2 block text-accent">Unhurried, well hosted.</span>
                </h2>
                <p className="mt-8 text-lg font-medium leading-8 tracking-[-0.02em] text-foreground sm:text-xl sm:leading-9">
                  {tour.summary}
                </p>
                <p className="mt-6 text-[15px] leading-7 text-foreground/75 sm:text-base sm:leading-8">
                  {tour.overview}
                </p>
              </div>

              <aside className="space-y-4 lg:sticky lg:top-28">
                <div className="relative min-h-[18rem] overflow-hidden rounded-md sm:min-h-[22rem]">
                  <Image
                    className="object-cover"
                    src={scenes[0]?.image ?? tour.image}
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
                      {tour.destination}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-surface/80">
                      {tour.region} · {tour.style} · {formatDays(tour.days)}
                    </p>
                  </div>
                </div>
                <EnquirePanel tour={tour} stays={stays} />
              </aside>
            </div>
          </div>
        </section>

        <section
          id="route"
          className="scroll-mt-28 border-y border-accent/10 bg-surface px-5 py-16 sm:px-6 sm:py-24"
        >
          <div className="mx-auto max-w-7xl">
            <ChapterMark index={2} label="Route" />

            <div className="mb-10 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
              <h2 className="max-w-md text-3xl font-medium tracking-[-0.03em] sm:text-4xl">
                Stops that shape the days
              </h2>
              <p className="max-w-sm text-sm leading-6 text-muted-foreground sm:text-[15px]">
                Signature viewpoints and valley moments on this {tour.style.toLowerCase()}{' '}
                journey — the frames you came north for.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
              {scenes.map((scene, index) => (
                <article
                  key={scene.label}
                  className="group relative min-h-[20rem] overflow-hidden rounded-md sm:min-h-[24rem]"
                >
                  <Image
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    src={scene.image}
                    alt={scene.label}
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
                      {scene.label}
                    </h3>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="itinerary" className="scroll-mt-28 px-5 py-16 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-7xl">
            <ChapterMark index={3} label="Itinerary" />

            <div className="mb-10 max-w-2xl sm:mb-12">
              <h2 className="text-3xl font-medium tracking-[-0.03em] sm:text-4xl">
                Day by day
              </h2>
              <p className="mt-4 text-sm leading-6 text-muted-foreground sm:text-[15px]">
                A paced outline for {formatDays(tour.days)} — room to linger,
                with buffer where the road or weather asks for it.
              </p>
            </div>

            <ol>
              {tour.itinerary.map((stop, index) => (
                <li
                  key={stop.day}
                  className={`grid gap-3 py-8 sm:grid-cols-[7.5rem_minmax(0,1fr)] sm:items-start sm:gap-8 sm:py-10 ${
                    index === 0 ? 'border-t border-accent/12' : ''
                  } border-b border-accent/12`}
                >
                  <p className="text-4xl font-semibold leading-none tracking-[-0.05em] text-accent/30 tabular-nums sm:text-5xl">
                    {String(stop.day).padStart(2, '0')}
                  </p>
                  <div className="max-w-3xl">
                    <h3 className="text-xl font-medium tracking-[-0.025em] sm:text-2xl">
                      {stop.title}
                    </h3>
                    <p className="mt-2 text-[15px] leading-7 text-muted-foreground sm:text-base sm:leading-8">
                      {stop.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section
          id="stay"
          className="scroll-mt-28 border-y border-accent/10 bg-surface px-5 py-16 sm:px-6 sm:py-24"
        >
          <div className="mx-auto max-w-7xl">
            <ChapterMark index={4} label="Stay" />

            <div className="mb-10 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
              <h2 className="max-w-md text-3xl font-medium tracking-[-0.03em] sm:text-4xl">
                Three ways to travel this route
              </h2>
              <p className="max-w-sm text-sm leading-6 text-muted-foreground sm:text-[15px]">
                Same days, same valleys — choose how you stay, eat, and move.
                Signature is the Mountiva default.
              </p>
            </div>

            <div className="grid gap-px overflow-hidden rounded-md border border-accent/12 bg-accent/12 lg:grid-cols-3">
              {stays.map((stay, index) => (
                <article
                  key={stay.id}
                  id={`stay-${stay.id}`}
                  className={`flex scroll-mt-28 flex-col px-6 py-8 sm:px-8 sm:py-10 ${
                    stay.recommended ? 'bg-muted/40' : 'bg-surface'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-medium tracking-[0.12em] text-accent/40 tabular-nums">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {stay.recommended ? (
                      <span className="text-[11px] font-medium tracking-[0.14em] text-accent uppercase">
                        Most chosen
                      </span>
                    ) : null}
                  </div>

                  <h3 className="mt-6 text-2xl font-medium tracking-[-0.03em] sm:text-3xl">
                    {stay.name}
                  </h3>
                  <p className="mt-2 text-sm font-medium tracking-[-0.01em] text-accent">
                    {stay.tagline}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {stay.description}
                  </p>

                  <p className="mt-6 text-2xl font-medium tracking-[-0.03em]">
                    {priceLabel(stay.price)}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    per person · {formatDays(tour.days)}
                  </p>

                  <ul className="mt-6 flex-1 space-y-2.5">
                    {stay.includes.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm leading-6 text-foreground/80"
                      >
                        <Check
                          size={15}
                          className="mt-0.5 shrink-0 text-accent"
                          aria-hidden
                        />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <Button
                    href={getStayEnquireHref(tour, stay)}
                    variant={stay.recommended ? 'primary' : 'secondary'}
                    size="lg"
                    className="mt-8 w-full"
                  >
                    Enquire — {stay.name}
                    <ArrowRight size={16} aria-hidden />
                  </Button>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="included"
          className="scroll-mt-28 border-y border-accent/10 bg-surface px-5 py-16 sm:px-6 sm:py-24"
        >
          <div className="mx-auto max-w-7xl">
            <ChapterMark index={5} label="Included" />

            <div className="mb-10 max-w-2xl sm:mb-12">
              <h2 className="text-3xl font-medium tracking-[-0.03em] sm:text-4xl">
                What travels with you
              </h2>
              <p className="mt-4 text-sm leading-6 text-muted-foreground sm:text-[15px]">
                Clear inclusions so the enquiry is about dates and pace — not
                surprises on the road.
              </p>
            </div>

            <div className="grid gap-px overflow-hidden rounded-md border border-accent/12 bg-accent/12 lg:grid-cols-[1fr_1fr_1.1fr]">
              <article className="bg-surface px-6 py-8 sm:px-8 sm:py-10">
                <p className="text-[11px] font-medium tracking-[0.16em] text-accent uppercase">
                  Typically includes
                </p>
                <ul className="mt-6 space-y-3">
                  {tour.includes.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm leading-6 text-foreground/80"
                    >
                      <Check
                        size={16}
                        className="mt-0.5 shrink-0 text-accent"
                        aria-hidden
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>

              <article className="bg-surface px-6 py-8 sm:px-8 sm:py-10">
                <p className="text-[11px] font-medium tracking-[0.16em] text-accent uppercase">
                  Not included
                </p>
                <ul className="mt-6 space-y-3">
                  {tour.excludes.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm leading-6 text-muted-foreground"
                    >
                      <X
                        size={16}
                        className="mt-0.5 shrink-0 text-foreground/30"
                        aria-hidden
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>

              <article className="bg-surface px-6 py-8 sm:px-8 sm:py-10">
                <p className="text-[11px] font-medium tracking-[0.16em] text-accent uppercase">
                  Best months
                </p>
                <p className="mt-4 text-sm leading-6 text-muted-foreground">
                  Shoulder months can mean quieter roads; peak summer suits high
                  plains like Deosai. We&apos;ll help match dates to conditions.
                </p>
                <ul className="mt-6 grid grid-cols-4 gap-1.5 sm:grid-cols-6 lg:grid-cols-4">
                  {calendarMonths.map((month) => {
                    const active = tour.bestMonths.includes(month);
                    return (
                      <li
                        key={month}
                        className={`flex h-10 items-center justify-center rounded-md text-[11px] font-medium tracking-[0.08em] uppercase ${
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
              </article>
            </div>
          </div>
        </section>

        <section id="enquire" className="scroll-mt-28 px-5 py-16 sm:px-6 sm:py-20">
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-md text-surface">
            <Image
              className="object-cover object-center"
              src={tour.image}
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
                    Start this {tour.destination} journey
                  </h2>
                  <p className="mt-4 max-w-md text-sm leading-6 text-surface/80 sm:text-[15px]">
                    Share your dates, group size, and stay style — Essential,
                    Signature, or Private. We confirm availability and tune the
                    outline around how you like to travel.
                  </p>
                </div>

                <div className="flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-surface/65">
                  <span>{formatDays(tour.days)}</span>
                  <span className="text-surface/30">·</span>
                  <span>{tour.difficulty}</span>
                  <span className="text-surface/30">·</span>
                  <span>{priceLabel(tour.priceFrom)}</span>
                </div>
              </div>

              <div className="flex flex-col gap-3 border-t border-surface/15 p-6 sm:p-8 lg:border-t-0 lg:border-l lg:border-surface/15">
                <Link
                  href={enquireHref}
                  className="group flex flex-1 flex-col justify-between rounded-md border border-highlight/50 bg-[rgb(197_212_168_/_0.22)] px-5 py-6 text-surface shadow-[inset_0_1px_0_rgb(255_255_255_/_0.12)] backdrop-blur-md transition-colors duration-300 hover:bg-[rgb(197_212_168_/_0.35)]"
                >
                  <div>
                    <p className="text-[11px] font-medium tracking-[0.14em] text-highlight uppercase">
                      Enquire
                    </p>
                    <h3 className="mt-2 text-xl font-medium tracking-[-0.02em]">
                      Ask about {tour.name}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-surface/75">
                      Most travellers choose Signature. Tell us if you&apos;d
                      rather travel Essential or Private.
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

                <Link
                  href={`/tour?q=${encodeURIComponent(tour.destination)}`}
                  className="group flex flex-1 flex-col justify-between rounded-md border border-surface/25 bg-surface/15 px-5 py-6 text-surface backdrop-blur-md transition-colors duration-300 hover:bg-surface/25"
                >
                  <div>
                    <p className="text-[11px] font-medium tracking-[0.14em] text-highlight uppercase">
                      Browse
                    </p>
                    <h3 className="mt-2 text-xl font-medium tracking-[-0.02em]">
                      More in {tour.destination}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-surface/75">
                      Compare nearby routes if you want a shorter escape or a
                      longer circuit.
                    </p>
                  </div>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-highlight">
                    View matching tours
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

        {related.length > 0 ? (
          <section
            id="related"
            className="scroll-mt-28 border-t border-accent/10 bg-surface px-5 py-16 sm:px-6 sm:py-20"
          >
            <div className="mx-auto max-w-7xl">
              <SectionHeader
                eyebrow="Keep exploring"
                title="Related tours"
                description={`Other ${tour.style.toLowerCase()} and ${tour.region} journeys if this outline is close — but not quite it.`}
                action={{
                  href: `/tour?q=${encodeURIComponent(tour.destination)}`,
                  label: `More in ${tour.destination}`,
                }}
              />
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((item) => (
                  <TourCard key={item.id} tour={item} />
                ))}
              </div>
            </div>
          </section>
        ) : null}
      </main>
    </div>
  );
}
