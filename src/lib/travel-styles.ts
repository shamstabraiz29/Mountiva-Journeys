export type TourStyle =
  | 'Valley'
  | 'Trek'
  | 'Adventure'
  | 'Culture'
  | 'Women travellers';

export type TravelStyle = {
  slug: string;
  name: TourStyle;
  label: string;
  tagline: string;
  overview: string;
  image: string;
};

export const travelStyles: TravelStyle[] = [
  {
    slug: 'valley',
    name: 'Valley',
    label: 'Valley journeys',
    tagline: 'Orchard towns, lake shores, and comfortable stays.',
    overview:
      'Valley journeys are paced around Hunza, Naltar, Passu, and similar floors of the north — boutique or guesthouse nights, short walks, and viewpoint days without long trail loads. Choose this style if you want signature landscapes with time to breathe.',
    image:
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=80',
  },
  {
    slug: 'trek',
    name: 'Trek',
    label: 'Treks',
    tagline: 'Trail days, meadow camps, and mountain air.',
    overview:
      'Treks are for travellers comfortable with moderate or challenging walking — Fairy Meadows, Astore, and similar approaches where the point is the path. Jeep sectors and camp or lodge nights still sit in the plan; the days themselves are on trail.',
    image:
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80',
  },
  {
    slug: 'adventure',
    name: 'Adventure',
    label: 'Adventure tours',
    tagline: 'Jeep country, high plains, and bigger scale.',
    overview:
      'Adventure tours lean into 4x4 approaches, cold desert dunes, Deosai when the season opens, and routes that ask for flexible weather buffers. They still stay hosted — the difference is terrain and tempo, not a stripped expedition.',
    image:
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1600&q=80',
  },
  {
    slug: 'culture',
    name: 'Culture',
    label: 'Cultural heritage',
    tagline: 'Forts, palace towns, crafts, and slower streets.',
    overview:
      'Cultural journeys put heritage first: Baltit and Altit context, Khaplu’s palace-town texture, village walks, and room for conversation. Landscapes are still the frame — the days just spend more time with people and place than with altitude gains.',
    image:
      'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=1600&q=80',
  },
  {
    slug: 'women-travellers',
    name: 'Women travellers',
    label: 'Women travellers',
    tagline: 'Women-only groups, trusted hosts, and room to go slowly.',
    overview:
      'Women-only journeys are shaped for travellers who want the north without a loud mixed group — trusted local hosts, women-aware pacing, and days that leave space to talk, walk, and simply be among the mountains. Hunza valley stays, quieter Passu mornings, Naltar weekends, and Khaplu heritage days are the usual frames. Choose this style if you want signature landscapes with companions who understand why the day can move slowly.',
    image:
      'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=1600&q=80',
  },
];

export const tourStyles: TourStyle[] = travelStyles.map(
  (style) => style.name,
);

export function getTravelStyleHref(slug: string) {
  return `/travel-styles/${slug}`;
}

export function getTravelStyleBySlug(slug: string) {
  return travelStyles.find((style) => style.slug === slug);
}

export function getTravelStyleByName(name: string) {
  const needle = name.trim().toLowerCase();
  return travelStyles.find(
    (style) =>
      style.name.toLowerCase() === needle ||
      style.slug === needle ||
      style.label.toLowerCase() === needle,
  );
}

export function styleToSlug(style: TourStyle | string) {
  return (
    getTravelStyleByName(style)?.slug ?? style.trim().toLowerCase()
  );
}
