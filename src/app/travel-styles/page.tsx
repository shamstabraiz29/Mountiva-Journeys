import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import SectionHeader from '@/components/SectionHeader';
import TravelStyleCard from '@/components/TravelStyleCard';
import { getToursForStyle } from '@/lib/tours';
import { travelStyles } from '@/lib/travel-styles';

export const metadata: Metadata = {
  title: 'Travel Styles | Mountiva Journeys',
  description:
    'Choose how you want to travel in Gilgit-Baltistan — valley journeys, treks, adventure tours, cultural heritage, or women-only departures.',
};

export default function TravelStylesPage() {
  return (
    <main className="min-h-screen">
      <PageHero
        priority
        eyebrow="How to travel"
        title="Styles"
        headline="Same north, different tempo — pick the style that matches how you like to move."
        description="Valley stays, treks, adventure terrain, heritage days, or women-only groups. Every Mountiva package is tagged with one or more of these styles."
        image="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2400&q=80"
        imageAlt="High mountain trail in northern Pakistan"
        navLabel="Travel style sections"
        nav={[
          { href: '#styles', label: 'Styles' },
          { href: '/destinations', label: 'Destinations' },
        ]}
      />

      <section id="styles" className="scroll-mt-28 px-5 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Travel styles"
            title="Choose your pace"
            description="Open a style for matching packages, then pick a destination if you already know the place you want."
            action={{ href: '/destinations', label: 'View destinations' }}
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
            {travelStyles.map((style, index) => (
              <TravelStyleCard
                key={style.slug}
                style={style}
                tourCount={getToursForStyle(style.slug).length}
                priority={index < 2}
                className={index >= 3 ? 'lg:col-span-3' : 'lg:col-span-2'}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
