import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import ToursExplorer from '@/components/ToursExplorer';
import type { DurationFilter, SortOption, TourFilters } from '@/lib/tours';

export const metadata: Metadata = {
  title: 'Tours | Mountiva Journeys',
  description:
    'Browse guided Gilgit-Baltistan tours — Hunza, Skardu, Fairy Meadows, and more. Filter by destination, month, and trip length.',
};

type TourPageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

function first(value: string | string[] | undefined) {
  if (Array.isArray(value)) return value[0];
  return value;
}

function asDuration(value?: string): DurationFilter | undefined {
  if (value === 'short' || value === 'medium' || value === 'long' || value === 'any') {
    return value;
  }
  return undefined;
}

function asSort(value?: string): SortOption | undefined {
  if (
    value === 'recommended' ||
    value === 'price-asc' ||
    value === 'price-desc' ||
    value === 'duration'
  ) {
    return value;
  }
  return undefined;
}

export default async function TourPage({ searchParams }: TourPageProps) {
  const params = await searchParams;

  const initialFilters: TourFilters = {
    q: first(params.q) ?? '',
    destination: first(params.destination) ?? 'any',
    month: first(params.month) ?? 'any',
    travelers: first(params.travelers),
    duration: asDuration(first(params.duration)) ?? 'any',
    style: first(params.style) ?? 'any',
    sort: asSort(first(params.sort)) ?? 'recommended',
  };

  return (
    <main className="min-h-screen">
      <PageHero
        priority
        eyebrow="Tours · Gilgit-Baltistan"
        title="Tours"
        headline="Valley escapes, treks, and longer circuits — ready to filter."
        description="Compare itineraries by destination, month, and trip length, then open any tour for the full day-by-day plan."
        image="/images/tour-hero.jpg"
        imageAlt="Mountain peaks and valleys of northern Pakistan"
        navLabel="Tour sections"
        nav={[
          { href: '#browse', label: 'Browse' },
          { href: '#filters', label: 'Filters' },
        ]}
      />
      <ToursExplorer initialFilters={initialFilters} />
    </main>
  );
}
