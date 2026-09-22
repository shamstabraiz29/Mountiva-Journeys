import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import BlogCard from '@/components/BlogCard';
import ChapterMark from '@/components/ChapterMark';
import PageHero from '@/components/PageHero';
import SectionHeader from '@/components/SectionHeader';
import {
  formatBlogDate,
  getBlogPost,
  getBlogPosts,
  blogPosts,
} from '@/lib/blogs';
import { resolveDestinationPath } from '@/lib/destinations';

type BlogDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: 'Article not found | Mountiva Journeys' };

  return {
    title: `${post.title} | Mountiva Journeys`,
    description: post.excerpt,
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const related = getBlogPosts({ excludeSlug: post.slug }).slice(0, 3);
  const eyebrow = post.destination
    ? `${post.category} · ${post.destination}`
    : post.category;
  const metaLine = `${formatBlogDate(post.publishedAt)} · ${post.readMinutes} min read · ${post.author}`;

  return (
    <div className="min-h-screen">
      <main>
        <PageHero
          priority
          eyebrow={eyebrow}
          title={post.heroLabel}
          headline={post.title}
          description={metaLine}
          image={post.image}
          imageAlt={post.title}
          navLabel="Article sections"
          nav={[
            { href: '#article', label: 'Article' },
            { href: '#takeaways', label: 'Takeaways' },
            { href: '#next', label: 'Next step' },
            ...(related.length > 0
              ? [{ href: '#related', label: 'More notes' }]
              : []),
          ]}
        />

        {/* Article */}
        <section id="article" className="scroll-mt-28 px-5 py-16 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-7xl">
            <ChapterMark index={1} label="Article" />

            <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:items-start">
              <div>
                <p className="text-lg font-medium leading-8 tracking-[-0.02em] text-foreground sm:text-xl sm:leading-9">
                  {post.excerpt}
                </p>

                <div className="mt-12 space-y-12">
                  {post.sections.map((section) => (
                    <div key={section.heading}>
                      <h2 className="text-2xl font-medium tracking-[-0.03em] sm:text-3xl">
                        {section.heading}
                      </h2>
                      <div className="mt-5 space-y-5 text-[15px] leading-7 text-foreground/75 sm:text-base sm:leading-8">
                        {section.paragraphs.map((paragraph) => (
                          <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <aside className="space-y-6 lg:sticky lg:top-28">
                <div className="relative min-h-[18rem] overflow-hidden rounded-md sm:min-h-[22rem]">
                  <Image
                    className="object-cover"
                    src={post.image}
                    alt=""
                    fill
                    sizes="(max-width:1024px) 100vw, 35vw"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-[linear-gradient(to_top,rgb(12_20_16/0.7)_0%,transparent_55%)]"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-5 text-surface">
                    <p className="text-[11px] font-medium tracking-[0.14em] text-highlight uppercase">
                      {post.category}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-surface/80">
                      {post.destination
                        ? `Field note from ${post.destination}.`
                        : 'Field note from Gilgit-Baltistan.'}
                    </p>
                  </div>
                </div>

                <dl className="divide-y divide-accent/12 border-y border-accent/12">
                  <div className="grid gap-1 py-4 sm:grid-cols-[6.5rem_1fr] sm:gap-4">
                    <dt className="text-[11px] font-medium tracking-[0.14em] text-accent uppercase">
                      Published
                    </dt>
                    <dd className="text-sm font-medium tracking-[-0.01em]">
                      {formatBlogDate(post.publishedAt)}
                    </dd>
                  </div>
                  <div className="grid gap-1 py-4 sm:grid-cols-[6.5rem_1fr] sm:gap-4">
                    <dt className="text-[11px] font-medium tracking-[0.14em] text-accent uppercase">
                      Read time
                    </dt>
                    <dd className="text-sm font-medium tracking-[-0.01em]">
                      {post.readMinutes} minutes
                    </dd>
                  </div>
                  <div className="grid gap-1 py-4 sm:grid-cols-[6.5rem_1fr] sm:gap-4">
                    <dt className="text-[11px] font-medium tracking-[0.14em] text-accent uppercase">
                      Author
                    </dt>
                    <dd className="text-sm font-medium tracking-[-0.01em]">
                      {post.author}
                    </dd>
                  </div>
                </dl>

                <Link
                  href="/blogs"
                  className="inline-flex items-center gap-2 text-sm font-medium text-accent underline-offset-4 hover:underline"
                >
                  All field notes
                  <ArrowRight size={14} aria-hidden />
                </Link>
              </aside>
            </div>
          </div>
        </section>

        {/* Takeaways */}
        <section
          id="takeaways"
          className="scroll-mt-28 border-y border-accent/10 bg-surface px-5 py-16 sm:px-6 sm:py-24"
        >
          <div className="mx-auto max-w-7xl">
            <ChapterMark index={2} label="Takeaways" />

            <div className="mb-12 max-w-2xl">
              <h2 className="text-3xl font-medium tracking-[-0.03em] sm:text-4xl">
                What to carry forward
              </h2>
              <p className="mt-4 text-sm leading-6 text-muted-foreground sm:text-[15px]">
                Short anchors from this note — useful when you plan the next
                northern route.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
              {post.takeaways.map((item, index) => (
                <article
                  key={item}
                  className="group flex flex-col border-t-2 border-accent/20 pt-5 transition-colors duration-300 hover:border-accent"
                >
                  <span className="text-[12px] font-medium tracking-[0.12em] text-accent/40 tabular-nums">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <p className="mt-4 text-base font-medium leading-snug tracking-[-0.02em] sm:text-[15px]">
                    {item}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Next step CTA — matches homepage / contact */}
        <section id="next" className="scroll-mt-28 px-5 py-16 sm:px-6 sm:py-20">
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-md text-surface">
            <Image
              className="object-cover object-center"
              src={post.image}
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
                    Turn this note into a route
                  </h2>
                  <p className="mt-4 max-w-md text-sm leading-6 text-surface/80 sm:text-[15px]">
                    Browse matching journeys, or tell us your dates and pace —
                    we&apos;ll shape a private outline through Gilgit-Baltistan.
                  </p>
                </div>

                <div className="flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-surface/65">
                  <span>{post.category}</span>
                  {post.destination ? (
                    <>
                      <span className="text-surface/30">·</span>
                      <span>{post.destination}</span>
                    </>
                  ) : null}
                </div>
              </div>

              <div className="flex flex-col gap-3 border-t border-surface/15 p-6 sm:p-8 lg:border-t-0 lg:border-l lg:border-surface/15">
                <Link
                  href={resolveDestinationPath(post.destination)}
                  className="group flex flex-1 flex-col justify-between rounded-md border border-highlight/50 bg-[rgb(197_212_168_/_0.22)] px-5 py-6 text-surface shadow-[inset_0_1px_0_rgb(255_255_255_/_0.12)] backdrop-blur-md transition-colors duration-300 hover:bg-[rgb(197_212_168_/_0.35)]"
                >
                  <div>
                    <p className="text-[11px] font-medium tracking-[0.14em] text-highlight uppercase">
                      Browse
                    </p>
                    <h3 className="mt-2 text-xl font-medium tracking-[-0.02em]">
                      {post.destination
                        ? `Packages in ${post.destination}`
                        : 'Explore destinations'}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-surface/75">
                      See journeys that match this field note&apos;s place and
                      season.
                    </p>
                  </div>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-highlight">
                    View packages
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

        {/* Related */}
        {related.length > 0 ? (
          <section
            id="related"
            className="scroll-mt-28 border-t border-accent/10 bg-surface px-5 py-16 sm:px-6 sm:py-20"
          >
            <div className="mx-auto max-w-7xl">
              <SectionHeader
                eyebrow="Keep reading"
                title="More field notes"
                description="Other stories and guides from Mountiva journeys through the north."
                action={{ href: '/blogs', label: 'All blogs' }}
              />
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((item) => (
                  <BlogCard key={item.slug} post={item} />
                ))}
              </div>
            </div>
          </section>
        ) : null}
      </main>
    </div>
  );
}
