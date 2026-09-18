import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import BlogCard from '@/components/BlogCard';
import PageHero from '@/components/PageHero';
import SectionHeader from '@/components/SectionHeader';
import {
  blogCategories,
  getBlogPosts,
  getFeaturedPost,
  getPostsByCategory,
} from '@/lib/blogs';

export const metadata: Metadata = {
  title: 'Blogs | Mountiva Journeys',
  description:
    'Stories, season notes, and practical guides from Mountiva journeys across Gilgit-Baltistan.',
};

export default function BlogsPage() {
  const featured = getFeaturedPost();
  const latest = getBlogPosts({ excludeSlug: featured.slug });
  const topicCounts = blogCategories.map((category) => ({
    category,
    count: getPostsByCategory(category).length,
  }));

  return (
    <div className="min-h-screen">
      <main>
        <PageHero
          priority
          eyebrow="Field notes"
          title="Blogs"
          headline="Stories from the valleys — seasons, trails, and how we travel."
          description="Practical guides and longer reads from Gilgit-Baltistan: when to go, what to expect, and how responsible mountain tourism works on the ground."
          image="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=2400&q=80"
          imageAlt="Snow-covered mountain summit under a clear sky"
          navLabel="Blog sections"
          nav={[
            { href: '#featured', label: 'Featured' },
            { href: '#latest', label: 'Latest' },
            { href: '#topics', label: 'Topics' },
          ]}
        />

        <section
          id="featured"
          className="scroll-mt-28 px-5 py-16 sm:px-6 sm:py-20"
        >
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              eyebrow="Featured"
              title="Start here"
              description="A longer read to open the season — then browse the latest field notes below."
            />
            <BlogCard post={featured} layout="featured" priority />
          </div>
        </section>

        <section
          id="latest"
          className="scroll-mt-28 border-y border-accent/10 bg-surface px-5 py-16 sm:px-6 sm:py-20"
        >
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              eyebrow="Latest"
              title="Recent writing"
              description="Season guides, destination primers, and notes from Mountiva journeys through the north."
            />

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {latest.map((post, index) => (
                <BlogCard
                  key={post.slug}
                  post={post}
                  priority={index < 2}
                />
              ))}
            </div>
          </div>
        </section>

        <section
          id="topics"
          className="scroll-mt-28 bg-surface px-5 py-16 sm:px-6 sm:py-20"
        >
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              eyebrow="Topics"
              title="Browse by theme"
              description="Jump into the conversations Mountiva keeps returning to."
            />

            <ul className="grid gap-px overflow-hidden rounded-md border border-accent/12 bg-accent/12 sm:grid-cols-2 lg:grid-cols-5">
              {topicCounts.map(({ category, count }, index) => (
                <li key={category}>
                  <Link
                    href={`#latest`}
                  className="group flex h-full flex-col justify-between bg-surface px-5 py-6 transition-colors duration-300 hover:bg-muted/30"
                  >
                    <span className="text-[12px] font-medium tracking-[0.12em] text-accent/40 tabular-nums">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="mt-8">
                      <p className="text-base font-medium tracking-[-0.02em] transition-colors group-hover:text-accent">
                        {category}
                      </p>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {count} {count === 1 ? 'article' : 'articles'}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-[13px] font-medium text-accent">
                        View
                        <ArrowRight
                          size={13}
                          className="transition-transform duration-300 group-hover:translate-x-0.5"
                          aria-hidden
                        />
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}
