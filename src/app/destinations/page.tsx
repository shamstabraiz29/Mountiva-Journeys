import type { Metadata } from 'next';
import DestinationCard from '@/components/DestinationCard';
import PageHero from '@/components/PageHero';
import SectionHeader from '@/components/SectionHeader';
import { destinations } from '@/lib/destinations';
import { getToursForDestination } from '@/lib/tours';

export const metadata: Metadata = {
  title: 'Destinations | Mountiva Journeys',
  description:
    'Explore Gilgit-Baltistan destinations — Gilgit, Hunza, Skardu, Fairy Meadows, and more — then open the packages that belong there.',
};

export default function DestinationsPage() {
  return (
    <main className="min-h-screen">
      <PageHero
        priority
        eyebrow="Where to go"
        title="Destinations"
        headline="Start with a place — then choose the package that belongs there."
        description="Each destination has an overview, map, gallery, and the Mountiva packages that visit it. Open a card, pick a journey, then read the full itinerary."
        image="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=2400&q=80"
        imageAlt="Terraced mountain valley in northern Pakistan"
        navLabel="Destination sections"
        nav={[
          { href: '#places', label: 'Places' },
          { href: '/travel-styles', label: 'Travel styles' },
        ]}
      />

      <section id="places" className="scroll-mt-28 px-5 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeader
            eyebrow="Gilgit-Baltistan"
            title="Choose a place"
            description="Northern destinations — from the Gilgit hub to orchard Hunza and high Deosai. Open any card for the packages we run there."
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {destinations.map((destination, index) => {
              const count = getToursForDestination(destination.slug).length;
              return (
                <DestinationCard
                  key={destination.slug}
                  destination={destination}
                  priority={index < 4}
                  ctaLabel={
                    count === 1 ? '1 package' : `${count} packages`
                  }
                />
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
