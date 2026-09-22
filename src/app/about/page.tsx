import Image from 'next/image';
import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import Button from '@/components/Button';
import ChapterMark from '@/components/ChapterMark';
import PageHero from '@/components/PageHero';

export const metadata: Metadata = {
  title: 'About | Mountiva Journeys',
  description:
    'Mountiva is a sustainable mountain tourism operating system for Gilgit-Baltistan — protecting nature, supporting communities, and building practical systems.',
};

const chapters = [
  { id: 'origin', label: 'Origin' },
  { id: 'direction', label: 'Direction' },
  { id: 'belief', label: 'Belief' },
  { id: 'pillars', label: 'Pillars' },
  { id: 'position', label: 'Position' },
  { id: 'team', label: 'Team' },
  { id: 'values', label: 'Values' },
] as const;

const questions = [
  {
    q: 'How do we prevent unnecessary waste?',
    hint: 'Reduce before we pack. Refuse what the trail cannot hold.',
  },
  {
    q: 'How do we manage what we bring into the mountains?',
    hint: 'Track gear, food, and materials from valley floor to high camp.',
  },
  {
    q: 'How do we protect wildlife and local environments?',
    hint: 'Route choices, camp discipline, and respect for living systems.',
  },
  {
    q: 'How do communities benefit?',
    hint: 'Local hosts, guides, and stewards at the centre of every journey.',
  },
  {
    q: 'How do we measure and demonstrate impact?',
    hint: 'Learn in public. Improve with evidence. Scale only after.',
  },
] as const;

const pillars = [
  {
    title: 'Protect',
    body: 'Keep waste out of valleys and trails, care for water and campsites, and travel in ways that leave the landscape intact for the next season.',
    image:
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Empower',
    body: 'Work with local hosts, guides, and stewards so tourism income stays in Gilgit-Baltistan — and communities shape how journeys run.',
    image:
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Account',
    body: 'Measure what matters, share what we learn, and improve the systems behind every trip — so responsibility is visible, not just promised.',
    image:
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1200&q=80',
  },
] as const;

const notList = [
  'Not just another trekking company',
  'Not just another clean-up campaign',
  'Not just a waste-management company',
  'Not just an NGO project',
  'Not just a certification label',
] as const;

const teamRoles = [
  'Founder / CEO',
  'Operations Lead',
  'Community & Training Lead',
  'Finance & Admin',
  'Field Stewards',
  'Technical Advisors',
] as const;

const values = [
  'Practical',
  'Warm',
  'Responsible',
  'Adventurous',
  'Locally rooted',
  'Optimistic',
  'Professional',
] as const;

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <main>
        <PageHero
          priority
          eyebrow="About the system"
          title="Mountiva"
          headline="Built so mountain tourism in Gilgit-Baltistan can stay wild — and still work."
          description="A sustainable mountain tourism operating system — protecting nature, supporting communities, building practical systems."
          image="https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=2400&q=80"
          imageAlt="Traveller overlooking high peaks in northern Pakistan"
          navLabel="About chapters"
          nav={chapters.map((chapter) => ({
            href: `#${chapter.id}`,
            label: chapter.label,
          }))}
        />

        {/* Origin */}
        <section id="origin" className="scroll-mt-28 px-5 py-16 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-7xl">
            <ChapterMark index={1} label="Origin" />

            <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
              <div>
                <h2 className="text-3xl font-medium tracking-[-0.035em] sm:text-4xl md:text-5xl md:leading-[1.1]">
                  The pressure is real.
                  <span className="mt-2 block text-accent">
                    So is the opportunity.
                  </span>
                </h2>

                <div className="mt-8 space-y-5 text-[15px] leading-7 text-foreground/75 sm:text-base">
                  <p>
                    Gilgit-Baltistan draws{' '}
                    <strong className="font-medium text-foreground">
                      1M+ annual visitors
                    </strong>{' '}
                    (Clean Gilgit-Baltistan Project). Most of that pressure
                    lands in short seasons on popular routes — straining waste
                    systems, water, campsites, and communities.
                  </p>
                  <p>
                    Mountiva exists because tourism without systems becomes
                    extraction. We build the operating layer that makes every
                    journey more responsible.
                  </p>
                </div>
              </div>

              <aside className="relative min-h-[22rem] overflow-hidden rounded-md lg:min-h-full">
                <Image
                  className="object-cover object-center"
                  src="/images/hunza-village-terraces.jpg"
                  alt="Mountain village terraces in a northern Pakistan valley"
                  fill
                  sizes="(max-width:1024px) 100vw, 480px"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-[linear-gradient(to_top,rgb(12_20_16/0.75)_0%,transparent_55%)]"
                />
                <div className="absolute inset-x-0 bottom-0 p-6 text-surface">
                  <p className="text-[3.5rem] font-semibold leading-none tracking-[-0.05em]">
                    1M+
                  </p>
                  <p className="mt-2 text-sm text-surface/75">
                    visitors a year — concentrated on a few fragile corridors.
                  </p>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* Direction */}
        <section
          id="direction"
          className="scroll-mt-28 border-y border-accent/10 bg-surface px-5 py-16 sm:px-6 sm:py-24"
        >
          <div className="mx-auto max-w-7xl">
            <ChapterMark index={2} label="Direction" />

            <div className="grid gap-10 md:grid-cols-2 md:gap-0">
              <blockquote className="md:border-r md:border-accent/12 md:pr-12">
                <p className="text-[11px] font-medium tracking-[0.16em] text-accent uppercase">
                  Vision
                </p>
                <p className="mt-5 text-2xl font-medium leading-snug tracking-[-0.03em] sm:text-3xl">
                  Make Gilgit-Baltistan a globally respected model of clean,
                  safe, community-led mountain tourism.
                </p>
              </blockquote>

              <blockquote className="md:pl-12">
                <p className="text-[11px] font-medium tracking-[0.16em] text-accent uppercase">
                  Mission
                </p>
                <p className="mt-5 text-2xl font-medium leading-snug tracking-[-0.03em] sm:text-3xl">
                  Make every mountain journey more responsible — protecting
                  nature, supporting communities, building practical systems.
                </p>
              </blockquote>
            </div>
          </div>
        </section>

        {/* Belief */}
        <section id="belief" className="scroll-mt-28 px-5 py-16 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-7xl">
            <ChapterMark index={3} label="Belief" />

            <div className="mb-12 max-w-2xl">
              <h2 className="text-3xl font-medium tracking-[-0.03em] sm:text-4xl">
                Five questions we ask before we grow
              </h2>
              <p className="mt-4 text-sm leading-6 text-muted-foreground sm:text-[15px]">
                A worldview, not a sales pitch — the checks Mountiva runs on
                itself.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
              {questions.map((item, index) => (
                <article
                  key={item.q}
                  className="group flex flex-col border-t-2 border-accent/20 pt-5 transition-colors duration-300 hover:border-accent"
                >
                  <span className="text-[12px] font-medium tracking-[0.12em] text-accent/40 tabular-nums">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-4 text-base font-medium leading-snug tracking-[-0.02em] sm:text-[15px] lg:text-base">
                    {item.q}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {item.hint}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Pillars — photo panels */}
        <section id="pillars" className="scroll-mt-28 px-5 pb-16 sm:px-6 sm:pb-24">
          <div className="mx-auto max-w-7xl">
            <ChapterMark index={4} label="Pillars" />

            <h2 className="mb-10 max-w-lg text-3xl font-medium tracking-[-0.03em] sm:mb-12 sm:text-4xl">
              Protect. Empower. Account.
            </h2>

            <div className="grid gap-3 md:grid-cols-3 md:gap-4">
              {pillars.map((pillar, index) => (
                <article
                  key={pillar.title}
                  className="group relative min-h-[26rem] overflow-hidden rounded-md sm:min-h-[28rem]"
                >
                  <Image
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    src={pillar.image}
                    alt=""
                    fill
                    sizes="(max-width:768px) 100vw, 33vw"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-[linear-gradient(to_top,rgb(12_20_16/0.92)_0%,rgb(12_20_16/0.45)_50%,rgb(12_20_16/0.15)_100%)]"
                  />
                  <div className="relative z-10 flex h-full flex-col justify-end p-6 sm:p-7">
                    <span className="text-[12px] font-medium tracking-[0.14em] text-highlight/70 tabular-nums">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className="mt-2 text-3xl font-medium tracking-[-0.03em] text-white">
                      {pillar.title}
                    </h3>
                    <p className="mt-3 max-w-xs text-sm leading-6 text-white/70">
                      {pillar.body}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Position */}
        <section
          id="position"
          className="scroll-mt-28 bg-accent px-5 py-16 text-surface sm:px-6 sm:py-24"
        >
          <div className="mx-auto max-w-7xl">
            <ChapterMark index={5} label="Position" tone="on-accent" />

            <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
              <div>
                <h2 className="text-3xl font-medium tracking-[-0.03em] sm:text-4xl">
                  What Mountiva is not
                </h2>
                <ul className="mt-8 space-y-4">
                  {notList.map((item) => (
                    <li
                      key={item}
                      className="text-lg leading-snug text-surface/70 sm:text-xl"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col justify-center border-t border-surface/15 pt-10 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-16">
                <p className="text-[11px] font-medium tracking-[0.16em] text-highlight uppercase">
                  Closing line
                </p>
                <p className="mt-6 text-3xl font-medium leading-[1.15] tracking-[-0.035em] text-highlight sm:text-4xl md:text-5xl">
                  Mountiva is a sustainable mountain tourism operating system.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section id="team" className="scroll-mt-28 px-5 py-16 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-7xl">
            <ChapterMark index={6} label="Team" />

            <div className="mb-12 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
              <div>
                <h2 className="max-w-md text-3xl font-medium tracking-[-0.03em] sm:text-4xl">
                  The team behind Mountiva
                </h2>
                <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">
                  Roles we&apos;re building out — the structure that carries the
                  system.
                </p>
              </div>

              <aside className="relative min-h-[16rem] overflow-hidden rounded-md sm:min-h-[20rem]">
                <Image
                  className="object-cover object-center"
                  src="/images/team-behind-mountiva.jpg"
                  alt="The team behind Mountiva"
                  fill
                  sizes="(max-width:1024px) 100vw, 480px"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-[linear-gradient(to_top,rgb(12_20_16/0.7)_0%,transparent_55%)]"
                />
                <div className="absolute inset-x-0 bottom-0 p-5 text-surface">
                  <p className="text-[11px] font-medium tracking-[0.14em] text-highlight uppercase">
                    Field & system
                  </p>
                  <p className="mt-2 text-sm leading-6 text-surface/80">
                    Hosts, guides, and stewards — the people who make the
                    operating layer real.
                  </p>
                </div>
              </aside>
            </div>

            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {teamRoles.map((role, index) => (
                <li
                  key={role}
                  className="flex aspect-[3/4] flex-col justify-between rounded-md bg-accent px-4 py-5 text-surface transition-transform duration-300 hover:-translate-y-1"
                >
                  <span className="text-[11px] font-medium tracking-[0.12em] text-highlight/60 tabular-nums">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <p className="text-sm font-medium leading-snug tracking-[-0.02em] sm:text-[15px]">
                    {role}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Values */}
        <section
          id="values"
          className="scroll-mt-28 border-t border-accent/10 bg-surface px-5 py-16 sm:px-6 sm:py-20"
        >
          <div className="mx-auto max-w-7xl">
            <ChapterMark index={7} label="Values" />

            <h2 className="text-3xl font-medium tracking-[-0.03em] sm:text-4xl">
              How Mountiva shows up
            </h2>

            <p className="mt-10 max-w-4xl text-2xl font-medium leading-relaxed tracking-[-0.025em] text-foreground/80 sm:text-3xl sm:leading-relaxed">
              {values.map((value, index) => (
                <span key={value}>
                  <span className="text-accent">{value}</span>
                  {index < values.length - 1 ? (
                    <span className="mx-2 text-accent/25 sm:mx-3">·</span>
                  ) : (
                    <span className="text-accent/40">.</span>
                  )}
                </span>
              ))}
            </p>
            <p className="mt-6 max-w-lg text-sm leading-6 text-muted-foreground">
              Practical, warm, responsible, adventurous, locally rooted,
              optimistic, professional — one personality for the trail and the
              desk.
            </p>
          </div>
        </section>

        {/* Closing */}
        <section className="bg-surface px-5 py-16 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="grid overflow-hidden rounded-md lg:grid-cols-2">
              <div className="relative min-h-[18rem] lg:min-h-[28rem]">
                <Image
                  className="object-cover"
                  src="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1400&q=80"
                  alt="Snow-covered mountain summit under night sky"
                  fill
                  sizes="(max-width:1024px) 100vw, 50vw"
                />
              </div>

              <div className="flex flex-col justify-between bg-foreground px-7 py-10 text-background sm:px-10 sm:py-12">
                <div>
                  <p className="text-[11px] font-medium tracking-[0.16em] text-highlight uppercase">
                    How we grow
                  </p>
                  <h2 className="mt-5 text-3xl font-medium leading-snug tracking-[-0.035em] sm:text-4xl">
                    It will learn.
                    <br />
                    It will measure.
                    <br />
                    It will improve.
                  </h2>
                  <p className="mt-5 text-xl font-medium tracking-[-0.02em] text-highlight sm:text-2xl">
                    And only then will it scale.
                  </p>
                </div>

                <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                  <Button href="/destinations" variant="highlight" size="lg">
                    Explore journeys
                    <ArrowRight size={16} aria-hidden />
                  </Button>
                  <Button href="/contact-us" variant="outline" size="lg">
                    Talk to us
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
