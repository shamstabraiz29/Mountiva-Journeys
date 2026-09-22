import Image from 'next/image';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ContactForm from '@/components/ContactForm';
import PageHero from '@/components/PageHero';

export const metadata: Metadata = {
  title: 'Contact Us | Mountiva Journeys',
  description:
    'Tell Mountiva where you want to go in Gilgit-Baltistan — we reply with itinerary options and next steps.',
};

const paths = [
  {
    title: 'Ready package',
    body: 'Name a tour you like — we confirm dates, inclusions, and next steps.',
  },
  {
    title: 'Custom route',
    body: 'Share valleys, pace, and group size — we outline a private itinerary.',
  },
  {
    title: 'Quick question',
    body: 'Permits, seasons, fitness, or women-only departures — ask anything.',
  },
] as const;

export default async function ContactUsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const initialTour = Array.isArray(params.tour) ? params.tour[0] : params.tour;
  const initialStay = Array.isArray(params.stay) ? params.stay[0] : params.stay;
  return (
    <div className="min-h-screen">
      <main>
        <PageHero
          priority
          eyebrow="Get in touch"
          title="Contact"
          headline={
            "Tell us your dates, pace, and valleys — we'll shape the route."
          }
          description="Whether you're planning a ready package or a private journey through Hunza, Skardu, or beyond, start the conversation here."
          image="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2400&q=80"
          imageAlt="Alpine lake and peaks in northern Pakistan"
          navLabel="Contact sections"
          nav={[
            { href: '#paths', label: 'Paths' },
            { href: '#write', label: 'Write' },
          ]}
        />

        {/* Paths */}
        <section id="paths" className="scroll-mt-28 px-5 py-14 sm:px-6 sm:py-16">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[11px] font-medium tracking-[0.16em] text-accent uppercase">
                  How to start
                </p>
                <h2 className="mt-2 text-3xl font-medium tracking-[-0.03em] sm:text-4xl">
                  Three ways in
                </h2>
              </div>
              <p className="max-w-sm text-sm leading-6 text-muted-foreground">
                Pick the path that fits — the form below works for all three.
              </p>
            </div>

            <div className="mt-10 grid gap-px overflow-hidden rounded-md border border-accent/12 bg-accent/12 sm:grid-cols-3">
              {paths.map((path, index) => (
                <article
                  key={path.title}
                  className="bg-surface px-6 py-8 transition-colors duration-300 hover:bg-muted/30 sm:px-7 sm:py-10"
                >
                  <span className="text-sm font-medium tracking-[0.12em] text-accent/40 tabular-nums">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-6 text-xl font-medium tracking-[-0.025em]">
                    {path.title}
                  </h3>
                  <p className="mt-3 max-w-xs text-sm leading-6 text-muted-foreground">
                    {path.body}
                  </p>
                  <div
                    aria-hidden
                    className="mt-8 h-px w-10 bg-accent/20"
                  />
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Enquiry — full-width stacked */}
        <section
          id="write"
          className="scroll-mt-28 border-y border-accent/10 bg-surface px-5 py-16 sm:px-6 sm:py-20"
        >
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16 lg:items-start">
              <div>
                <p className="text-[11px] font-medium tracking-[0.16em] text-accent uppercase">
                  Write to us
                </p>
                <h2 className="mt-2 text-3xl font-medium tracking-[-0.03em] sm:text-4xl">
                  Send an enquiry
                </h2>
                <p className="mt-4 max-w-sm text-[15px] leading-7 text-muted-foreground">
                  Fill in what you know. We&apos;ll open your email with the
                  details ready for Mountiva.
                </p>

                <div className="mt-10 space-y-0 divide-y divide-accent/12 border-y border-accent/12">
                  <div className="py-5">
                    <p className="text-[11px] font-medium tracking-[0.14em] text-accent uppercase">
                      Direct line
                    </p>
                    <a
                      href="mailto:hello@mountiva.travel"
                      className="mt-2 inline-block text-lg font-medium tracking-[-0.02em] underline-offset-4 hover:underline"
                    >
                      hello@mountiva.travel
                    </a>
                  </div>
                  <div className="py-5">
                    <p className="text-[11px] font-medium tracking-[0.14em] text-accent uppercase">
                      Response
                    </p>
                    <p className="mt-2 text-lg font-medium tracking-[-0.02em]">
                      Usually within a few days
                    </p>
                  </div>
                  <div className="py-5">
                    <p className="text-[11px] font-medium tracking-[0.14em] text-accent uppercase">
                      Worth including
                    </p>
                    <ul className="mt-3 space-y-2 text-sm leading-6 text-muted-foreground">
                      <li>Destination or package name</li>
                      <li>Travel month and group size</li>
                      <li>Private, small-group, or women-only</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                  <Link
                    href="/destinations"
                    className="inline-flex items-center gap-1.5 font-medium text-accent underline-offset-4 hover:underline"
                  >
                    Browse destinations
                    <ArrowRight size={14} aria-hidden />
                  </Link>
                  <Link
                    href="/faq"
                    className="font-medium text-accent underline-offset-4 hover:underline"
                  >
                    Read the FAQ
                  </Link>
                </div>
              </div>

              <div className="rounded-md border border-accent/12 bg-surface px-5 py-7 sm:px-8 sm:py-9">
                <ContactForm
                  initialTour={initialTour}
                  initialStay={initialStay}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-surface px-5 py-16 sm:px-6 sm:pb-24 sm:pt-20">
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-md text-surface">
            <Image
              className="object-cover object-center"
              src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=2000&q=80"
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
                    Not ready to write?
                  </p>
                  <h2 className="mt-3 max-w-md text-4xl font-medium tracking-[-0.035em] sm:text-5xl">
                    Walk the collection first
                  </h2>
                  <p className="mt-4 max-w-md text-sm leading-6 text-surface/80 sm:text-[15px]">
                    Browse ready journeys through Hunza, Skardu, and the high
                    valleys — then come back when you know the pace you want.
                  </p>
                </div>

                <div className="flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-surface/65">
                  <span>Valley escapes</span>
                  <span className="text-surface/30">·</span>
                  <span>Treks</span>
                  <span className="text-surface/30">·</span>
                  <span>Custom routes</span>
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
                      Open a place, then choose the package that belongs there.
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
                  href="/faq"
                  className="group flex flex-1 flex-col justify-between rounded-md border border-surface/25 bg-surface/15 px-5 py-6 text-surface backdrop-blur-md transition-colors duration-300 hover:bg-surface/25"
                >
                  <div>
                    <p className="text-[11px] font-medium tracking-[0.14em] text-highlight uppercase">
                      Help
                    </p>
                    <h3 className="mt-2 text-xl font-medium tracking-[-0.02em]">
                      Read the FAQ
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-surface/75">
                      Timing, packages, permits, and how Mountiva journeys work.
                    </p>
                  </div>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-highlight">
                    Open FAQ
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
