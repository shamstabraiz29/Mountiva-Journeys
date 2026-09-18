import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import ChapterMark from '@/components/ChapterMark';
import PageHero from '@/components/PageHero';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export const metadata: Metadata = {
  title: 'FAQ | Mountiva Journeys',
  description:
    'Answers about Mountiva journeys through Pakistan and Gilgit-Baltistan — timing, packages, permits, and how we travel.',
};

const topics = [
  {
    title: 'Destinations',
    body: 'Where we travel across Gilgit-Baltistan and northern Pakistan.',
  },
  {
    title: 'Timing',
    body: 'Best months for valleys, meadows, and high plains.',
  },
  {
    title: 'Packages',
    body: 'Private vs group, inclusions, and how bookings work.',
  },
  {
    title: 'On the trail',
    body: 'Fitness, permits, and what to expect day to day.',
  },
] as const;

const faqGroups = [
  {
    id: 'places',
    label: 'Places & seasons',
    items: [
      {
        question: 'Which destinations does Mountiva cover in Pakistan?',
        answer:
          'We specialise in Gilgit-Baltistan — Hunza Valley, Skardu, Fairy Meadows, Deosai Plains, Naltar, Khaplu, Passu, and Astore — with custom routes across northern Pakistan.',
      },
      {
        question: 'When is the best time to visit Gilgit-Baltistan?',
        answer:
          'April to June brings spring blooms and milder roads. July to August is peak summer for high meadows like Deosai. September to October offers clear mountain light and fewer crowds.',
      },
    ],
  },
  {
    id: 'trips',
    label: 'Trips & inclusions',
    items: [
      {
        question: 'Are your packages private or group trips?',
        answer:
          'Both. Choose a ready-made package or ask for a private itinerary. Small groups stay intimate; custom trips can be tailored for couples, families, or friends.',
      },
      {
        question: 'What is usually included in a package?',
        answer:
          'Most packages include transport, stays, and local guides. Meals, entry fees, and optional activities vary by trip — full details are listed on each package page.',
      },
      {
        question: 'Can you plan a custom Hunza or Skardu itinerary?',
        answer:
          'Yes. Share your dates, group size, and interests — valleys, trekking, culture, or photography — and we will shape a route with stays and logistics that fit.',
      },
    ],
  },
  {
    id: 'practical',
    label: 'Practical details',
    items: [
      {
        question: 'Do I need a permit for Fairy Meadows or Deosai?',
        answer:
          'Some areas require local permits or registration. We arrange these for you when they are part of your itinerary so you can focus on the journey.',
      },
      {
        question: 'How fit do I need to be for these trips?',
        answer:
          'Most journeys suit active travellers comfortable with day walks of 4–6 hours. Trek-focused trips like Fairy Meadows need stronger legs and steady footing; we can adjust pace on request.',
      },
      {
        question: 'How do I book or ask a question?',
        answer:
          'Browse packages from the home search, or contact us with your preferred destinations and travel month. We reply with options and next steps.',
      },
    ],
  },
] as const;

export default function FaqPage() {
  return (
    <div className="min-h-screen">
      <main>
        <PageHero
          priority
          eyebrow="Help centre"
          title="FAQ"
          headline="Clear answers before you pack for the north."
          description="Timing, packages, permits, and how Mountiva journeys through Pakistan and Gilgit-Baltistan actually work."
          image="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2400&q=80"
          imageAlt="Sunlit mountain ridges above a northern valley"
          navLabel="FAQ sections"
          nav={[
            { href: '#topics', label: 'Topics' },
            { href: '#answers', label: 'Answers' },
            { href: '#next', label: 'Next step' },
          ]}
        />

        {/* Topics */}
        <section id="topics" className="scroll-mt-28 px-5 py-16 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-7xl">
            <ChapterMark index={1} label="Topics" />

            <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <h2 className="max-w-md text-3xl font-medium tracking-[-0.03em] sm:text-4xl">
                What people ask before they travel
              </h2>
              <p className="max-w-sm text-sm leading-6 text-muted-foreground">
                Jump into the themes below, then open the full answers in the
                next section.
              </p>
            </div>

            <div className="grid gap-px overflow-hidden rounded-md border border-accent/12 bg-accent/12 sm:grid-cols-2 lg:grid-cols-4">
              {topics.map((topic, index) => (
                <article
                  key={topic.title}
                  className="bg-surface px-6 py-8 transition-colors duration-300 hover:bg-muted/30 sm:px-7 sm:py-10"
                >
                  <span className="text-sm font-medium tracking-[0.12em] text-accent/40 tabular-nums">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-6 text-xl font-medium tracking-[-0.025em]">
                    {topic.title}
                  </h3>
                  <p className="mt-3 max-w-xs text-sm leading-6 text-muted-foreground">
                    {topic.body}
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

        {/* Answers */}
        <section
          id="answers"
          className="scroll-mt-28 border-y border-accent/10 bg-surface px-5 py-16 sm:px-6 sm:py-24"
        >
          <div className="mx-auto max-w-7xl">
            <ChapterMark index={2} label="Answers" />

            <div className="mb-12 max-w-2xl">
              <h2 className="text-3xl font-medium tracking-[-0.03em] sm:text-4xl">
                Frequently asked questions
              </h2>
              <p className="mt-4 text-sm leading-6 text-muted-foreground sm:text-[15px]">
                Practical answers about destinations, timing, packages, and
                life on the trail with Mountiva.
              </p>
            </div>

            <div className="space-y-14">
              {faqGroups.map((group, groupIndex) => (
                <div key={group.id} id={group.id} className="scroll-mt-28">
                  <div className="mb-5 flex items-center gap-4">
                    <p className="text-[11px] font-medium tracking-[0.16em] text-accent uppercase">
                      {group.label}
                    </p>
                    <span aria-hidden className="h-px flex-1 bg-accent/15" />
                    <span className="text-[12px] font-medium tracking-[0.12em] text-accent/40 tabular-nums">
                      {String(groupIndex + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <Accordion type="single" collapsible className="w-full">
                    {group.items.map((faq, index) => (
                      <AccordionItem
                        key={faq.question}
                        value={`${group.id}-${index}`}
                      >
                        <AccordionTrigger className="text-left text-base font-medium tracking-[-0.01em]">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-[15px] leading-7 text-muted-foreground">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Next step CTA */}
        <section id="next" className="scroll-mt-28 bg-surface px-5 py-16 sm:px-6 sm:pb-24 sm:pt-20">
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-md text-surface">
            <Image
              className="object-cover object-center"
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=2000&q=80"
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
                    Still have a question?
                  </p>
                  <h2 className="mt-3 max-w-md text-4xl font-medium tracking-[-0.035em] sm:text-5xl">
                    Tell us where you want to go
                  </h2>
                  <p className="mt-4 max-w-md text-sm leading-6 text-surface/80 sm:text-[15px]">
                    Share your dates and pace — we reply with itinerary options
                    and clear next steps through Gilgit-Baltistan.
                  </p>
                </div>

                <div className="flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-surface/65">
                  <span>Custom routes</span>
                  <span className="text-surface/30">·</span>
                  <span>Ready packages</span>
                  <span className="text-surface/30">·</span>
                  <span>Women-only</span>
                </div>
              </div>

              <div className="flex flex-col gap-3 border-t border-surface/15 p-6 sm:p-8 lg:border-t-0 lg:border-l lg:border-surface/15">
                <Link
                  href="/contact-us"
                  className="group flex flex-1 flex-col justify-between rounded-md border border-highlight/50 bg-[rgb(197_212_168_/_0.22)] px-5 py-6 text-surface shadow-[inset_0_1px_0_rgb(255_255_255_/_0.12)] backdrop-blur-md transition-colors duration-300 hover:bg-[rgb(197_212_168_/_0.35)]"
                >
                  <div>
                    <p className="text-[11px] font-medium tracking-[0.14em] text-highlight uppercase">
                      Contact
                    </p>
                    <h3 className="mt-2 text-xl font-medium tracking-[-0.02em]">
                      Send an enquiry
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-surface/75">
                      Ask anything about seasons, permits, fitness, or a custom
                      northern route.
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
                  href="/tour"
                  className="group flex flex-1 flex-col justify-between rounded-md border border-surface/25 bg-surface/15 px-5 py-6 text-surface backdrop-blur-md transition-colors duration-300 hover:bg-surface/25"
                >
                  <div>
                    <p className="text-[11px] font-medium tracking-[0.14em] text-highlight uppercase">
                      Browse
                    </p>
                    <h3 className="mt-2 text-xl font-medium tracking-[-0.02em]">
                      Explore tours
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-surface/75">
                      Compare valley escapes, treks, and longer circuits across
                      the Mountiva collection.
                    </p>
                  </div>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-highlight">
                    View all tours
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
