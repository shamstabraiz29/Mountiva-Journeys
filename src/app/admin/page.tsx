import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  BookOpen,
  CircleHelp,
  Compass,
  MapPin,
  Mountain,
  Plus,
} from 'lucide-react';
import { blogPosts } from '@/lib/blogs';
import { destinations } from '@/lib/destinations';
import { getFaqItems } from '@/lib/faq';
import { tours } from '@/lib/tours';
import { travelStyles } from '@/lib/travel-styles';

export const metadata: Metadata = {
  title: 'Overview',
};

const collections = [
  {
    href: '/admin/destinations',
    createHref: '/admin/destinations/new',
    label: 'Destinations',
    description: 'Places, maps, and galleries.',
    count: destinations.length,
    icon: MapPin,
  },
  {
    href: '/admin/tours',
    createHref: '/admin/tours/new',
    label: 'Tours',
    description: 'Packages and itineraries.',
    count: tours.length,
    icon: Compass,
  },
  {
    href: '/admin/travel-styles',
    createHref: '/admin/travel-styles/new',
    label: 'Travel styles',
    description: 'Valley, trek, adventure, culture.',
    count: travelStyles.length,
    icon: Mountain,
  },
  {
    href: '/admin/blogs',
    createHref: '/admin/blogs/new',
    label: 'Blogs',
    description: 'Field notes and guides.',
    count: blogPosts.length,
    icon: BookOpen,
  },
  {
    href: '/admin/faq',
    createHref: '/admin/faq/new',
    label: 'FAQ',
    description: 'Help-centre answers.',
    count: getFaqItems().length,
    icon: CircleHelp,
  },
] as const;

export default function AdminOverviewPage() {
  const featuredDestinations = destinations.filter((item) => item.featured).length;
  const featuredTours = tours.filter((item) => item.featured).length;
  const featuredPosts = blogPosts.filter((item) => item.featured).length;

  return (
    <div>
      <div className="mb-10">
        <p className="text-[11px] font-medium tracking-[0.16em] text-accent uppercase">
          Studio
        </p>
        <h1 className="mt-2 text-3xl font-medium tracking-[-0.03em] sm:text-4xl">
          Shape the north
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground sm:text-[15px]">
          Create destinations, tours, travel styles, and stories. This admin is a
          design preview — nothing is saved until you connect a backend.
        </p>
      </div>

      <div className="grid gap-px overflow-hidden rounded-md border border-accent/12 bg-accent/12 sm:grid-cols-3">
        {[
          { label: 'Featured places', value: featuredDestinations },
          { label: 'Featured tours', value: featuredTours },
          { label: 'Featured stories', value: featuredPosts },
        ].map((stat) => (
          <article key={stat.label} className="bg-surface px-5 py-6 sm:px-6">
            <p className="text-[11px] font-medium tracking-[0.14em] text-muted-foreground uppercase">
              {stat.label}
            </p>
            <p className="mt-3 text-4xl font-medium tracking-[-0.04em] tabular-nums">
              {stat.value}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {collections.map(({ href, createHref, label, description, count, icon: Icon }) => (
          <article
            key={href}
            className="flex flex-col rounded-md border border-accent/12 bg-surface p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <span className="flex size-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <Icon size={18} aria-hidden />
              </span>
              <Link
                href={createHref}
                className="inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1.5 text-xs font-medium text-surface hover:bg-[#3a5043]"
              >
                <Plus size={13} aria-hidden />
                New
              </Link>
            </div>
            <h2 className="mt-5 text-lg font-medium tracking-[-0.02em]">{label}</h2>
            <p className="mt-1.5 text-sm leading-6 text-muted-foreground">
              {description}
            </p>
            <div className="mt-auto flex items-end justify-between pt-6">
              <p className="text-3xl font-medium tracking-[-0.04em] tabular-nums">
                {count}
              </p>
              <Link
                href={href}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-accent underline-offset-4 hover:underline"
              >
                Manage
                <ArrowRight size={14} aria-hidden />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
