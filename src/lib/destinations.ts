export type DestinationGalleryItem = {
  src: string;
  alt: string;
  caption: string;
};

export type Destination = {
  slug: string;
  name: string;
  region: string;
  note: string;
  overview: string;
  image: string;
  query: string;
  featured?: boolean;
  coordinates: { lat: number; lng: number };
  mapDelta: number;
  highlights: string[];
  bestMonths: string[];
  gallery: DestinationGalleryItem[];
};

export function getDestinationHref(slug: string) {
  return `/destinations/${slug}`;
}

export const destinations: Destination[] = [
  {
    slug: 'gilgit',
    name: 'Gilgit',
    region: 'Gilgit-Baltistan',
    note: 'The northern hub — bazaars, Naltar access, and the KKH gateway.',
    overview:
      'Gilgit is where most northern journeys begin: a working town on the Karakoram Highway, with bazaar energy, river corridors, and easy reach to Naltar. Stay a night to settle in, then branch toward Hunza, Fairy Meadows, or a longer Baltistan circuit — the packages below are the ones we run from this base.',
    image: 'https://picsum.photos/seed/gilgit-mj/900/700',
    query: 'Gilgit',
    featured: true,
    coordinates: { lat: 35.9208, lng: 74.3083 },
    mapDelta: 0.28,
    highlights: ['Gilgit bazaar', 'Kargah Buddha', 'Naltar road', 'KKH gateway'],
    bestMonths: ['April', 'May', 'June', 'September', 'October'],
    gallery: [
      {
        src: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=1400&q=80',
        alt: 'River valley town in the mountains',
        caption: 'Indus corridors',
      },
      {
        src: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1400&q=80',
        alt: 'Pine forest road near Gilgit',
        caption: 'Toward Naltar',
      },
      {
        src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1400&q=80',
        alt: 'Mountain town terraces',
        caption: 'Town and terraces',
      },
      {
        src: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=1400&q=80',
        alt: 'High viewpoint above a valley gateway',
        caption: 'KKH light',
      },
    ],
  },
  {
    slug: 'hunza-valley',
    name: 'Hunza Valley',
    region: 'Gilgit-Baltistan',
    note: 'Rakaposhi views, apricot orchards, and Passu cones.',
    overview:
      'Hunza is the north’s signature valley: orchard towns, turquoise Attabad, and a Karakoram skyline that rewards unhurried days. Karimabad is the usual base — forts, cafés, and evening light over the terraces — with upper Hunza opening toward Passu when you want more drama without a long expedition.',
    image: 'https://picsum.photos/seed/hunza-valley-mj/900/700',
    query: 'Hunza',
    featured: true,
    coordinates: { lat: 36.3167, lng: 74.65 },
    mapDelta: 0.35,
    highlights: [
      'Karimabad & Baltit',
      'Attabad Lake',
      'Passu Cones',
      'Eagle Nest',
    ],
    bestMonths: ['April', 'May', 'June', 'September', 'October'],
    gallery: [
      {
        src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1400&q=80',
        alt: 'Hunza valley terraces and peaks',
        caption: 'Karimabad terraces',
      },
      {
        src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1400&q=80',
        alt: 'Mountain lake in northern Pakistan',
        caption: 'Attabad shores',
      },
      {
        src: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?auto=format&fit=crop&w=1400&q=80',
        alt: 'Sharp mountain cones above a valley road',
        caption: 'Passu skyline',
      },
      {
        src: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=1400&q=80',
        alt: 'High viewpoint over mountain valleys',
        caption: 'Eagle Nest light',
      },
    ],
  },
  {
    slug: 'skardu',
    name: 'Skardu',
    region: 'Gilgit-Baltistan',
    note: 'Shangrila lake, cold desert dunes, and the K2 gateway.',
    overview:
      'Skardu is Baltistan’s hub — a wide Indus bowl with lake basins, a cold desert against granite walls, and the road toward Khaplu and the high plains. Days here mix town orientation with jeep time: Shangrila and Upper Kachura in the morning, dunes and viewpoints when the light goes long.',
    image: 'https://picsum.photos/seed/skardu-mj/900/700',
    query: 'Skardu',
    featured: true,
    coordinates: { lat: 35.2971, lng: 75.6333 },
    mapDelta: 0.4,
    highlights: ['Shangrila', 'Cold Desert', 'Manthal Buddha', 'Khaplu road'],
    bestMonths: ['May', 'June', 'July', 'August', 'September'],
    gallery: [
      {
        src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1400&q=80',
        alt: 'Alpine lake surrounded by mountains',
        caption: 'Shangrila basin',
      },
      {
        src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1400&q=80',
        alt: 'High mountain walls above a valley',
        caption: 'Skardu granite',
      },
      {
        src: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=1400&q=80',
        alt: 'Open landscape under mountain light',
        caption: 'Indus valley',
      },
      {
        src: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=1400&q=80',
        alt: 'Snowy peaks and wilderness',
        caption: 'Toward the high country',
      },
    ],
  },
  {
    slug: 'fairy-meadows',
    name: 'Fairy Meadows',
    region: 'Gilgit-Baltistan',
    note: 'Nanga Parbat base views and alpine meadow camps.',
    overview:
      'Fairy Meadows is a short, high-reward approach to Nanga Parbat: jeep to Raikot, then a forest trail into alpine grass and clear night sky. It is not a valley-town circuit — expect trail days, meadow camps, and an optional push toward Beyal for closer mountain walls.',
    image: 'https://picsum.photos/seed/fairy-meadows-mj/900/700',
    query: 'Fairy Meadows',
    featured: true,
    coordinates: { lat: 35.3889, lng: 74.5778 },
    mapDelta: 0.22,
    highlights: ['Raikot Bridge', 'Fairy Meadows', 'Beyal Camp', 'Nanga Parbat'],
    bestMonths: ['May', 'June', 'July', 'August', 'September'],
    gallery: [
      {
        src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1400&q=80',
        alt: 'Alpine meadow beneath a high peak',
        caption: 'Meadow camp',
      },
      {
        src: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=1400&q=80',
        alt: 'Mountain trail and snow',
        caption: 'Trail to Beyal',
      },
      {
        src: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=1400&q=80',
        alt: 'Peak faces above a high camp',
        caption: 'Nanga Parbat faces',
      },
      {
        src: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1400&q=80',
        alt: 'Forest path toward the mountains',
        caption: 'Forest approach',
      },
    ],
  },
  {
    slug: 'deosai-plains',
    name: 'Deosai Plains',
    region: 'Gilgit-Baltistan',
    note: 'High plateau wildlife, summer blooms, open sky.',
    overview:
      'Deosai is a high plateau above Skardu — wide grassland, Sheosar Lake, and summer wildlife when the road opens. It is not a year-round destination: snow and wind close the plains for much of the year, which is part of why July and August feel so open. Most journeys pair Deosai with Skardu stays rather than treating the plateau as a standalone town.',
    image: 'https://picsum.photos/seed/deosai-mj/900/700',
    query: 'Deosai',
    coordinates: { lat: 35.02, lng: 75.45 },
    mapDelta: 0.55,
    highlights: ['Sheosar Lake', 'High grassland', 'Wildlife watching', 'Open sky'],
    bestMonths: ['July', 'August', 'September'],
    gallery: [
      {
        src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1400&q=80',
        alt: 'Wide high plains under open sky',
        caption: 'Summer plateau',
      },
      {
        src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1400&q=80',
        alt: 'High-altitude lake',
        caption: 'Sheosar light',
      },
      {
        src: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=1400&q=80',
        alt: 'Remote mountain wilderness',
        caption: 'Wildlife country',
      },
      {
        src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1400&q=80',
        alt: 'Rolling high landscape',
        caption: 'Bloom season',
      },
    ],
  },
  {
    slug: 'passu',
    name: 'Passu',
    region: 'Gilgit-Baltistan',
    note: 'Iconic cones, Hussaini bridge, and quiet upper-Hunza mornings.',
    overview:
      'Passu is upper Hunza at its most graphic — cathedral cones, the Hussaini crossing, and village roads that stay quieter than Karimabad. It works as a compact escape if you already know the lower valley, or as a chapter inside a longer Hunza journey when you want the skyline as your main frame.',
    image: 'https://picsum.photos/seed/passu-mj/900/700',
    query: 'Passu',
    coordinates: { lat: 36.4694, lng: 74.8958 },
    mapDelta: 0.18,
    highlights: ['Passu Cones', 'Hussaini Bridge', 'Borit Lake', 'Village walks'],
    bestMonths: ['April', 'May', 'June', 'September', 'October'],
    gallery: [
      {
        src: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?auto=format&fit=crop&w=1400&q=80',
        alt: 'Passu cathedral cones',
        caption: 'The cones',
      },
      {
        src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1400&q=80',
        alt: 'Upper Hunza valley road',
        caption: 'Village roads',
      },
      {
        src: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1400&q=80',
        alt: 'Quiet lake near Passu',
        caption: 'Borit side trip',
      },
      {
        src: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=1400&q=80',
        alt: 'High viewpoint in upper Hunza',
        caption: 'Upper Hunza light',
      },
    ],
  },
  {
    slug: 'naltar-valley',
    name: 'Naltar Valley',
    region: 'Gilgit-Baltistan',
    note: 'Coloured lakes, pine forest, and an easy reset near Gilgit.',
    overview:
      'Naltar sits close to Gilgit — coloured lakes, pine air, and easy walking rather than high-pass logistics. It is built for long weekends and travellers connecting through Gilgit who want nature without a multi-day expedition. Days stay short: forest quiet in the evening, lakes when the weather holds.',
    image: 'https://picsum.photos/seed/naltar-mj/900/700',
    query: 'Naltar',
    coordinates: { lat: 36.1397, lng: 74.2075 },
    mapDelta: 0.2,
    highlights: ['Naltar Lakes', 'Pine forests', 'Easy walks', 'Gilgit access'],
    bestMonths: ['May', 'June', 'July', 'August', 'September'],
    gallery: [
      {
        src: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1400&q=80',
        alt: 'Pine forest and coloured lakes',
        caption: 'Naltar lakes',
      },
      {
        src: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=1400&q=80',
        alt: 'Forest valley light',
        caption: 'Pine air',
      },
      {
        src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1400&q=80',
        alt: 'Green valley near Gilgit',
        caption: 'Valley floor',
      },
      {
        src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1400&q=80',
        alt: 'Open meadow in Naltar',
        caption: 'Easy walking',
      },
    ],
  },
  {
    slug: 'khaplu',
    name: 'Khaplu',
    region: 'Gilgit-Baltistan',
    note: 'Palace-town atmosphere, Shyok views, and Baltistan heritage.',
    overview:
      'Khaplu is Baltistan’s quieter cultural heart — palace context, riverside villages, and craft stories rather than peak-bagging. Reached from Skardu along the Shyok, it suits travellers who want heritage texture, terrace walks, and time to talk. Nights feel more town than camp.',
    image: 'https://picsum.photos/seed/khaplu-mj/900/700',
    query: 'Khaplu',
    coordinates: { lat: 35.1594, lng: 76.3372 },
    mapDelta: 0.22,
    highlights: ['Khaplu Palace', 'Village walks', 'Shyok views', 'Local crafts'],
    bestMonths: ['April', 'May', 'June', 'September', 'October'],
    gallery: [
      {
        src: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=1400&q=80',
        alt: 'Heritage town in a mountain valley',
        caption: 'Palace town',
      },
      {
        src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1400&q=80',
        alt: 'Riverside terraces in Baltistan',
        caption: 'Shyok terraces',
      },
      {
        src: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1400&q=80',
        alt: 'Village path in Khaplu',
        caption: 'Village walks',
      },
      {
        src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1400&q=80',
        alt: 'River landscape near Khaplu',
        caption: 'River light',
      },
    ],
  },
  {
    slug: 'astore',
    name: 'Astore',
    region: 'Gilgit-Baltistan',
    note: 'Quieter trails, Rama Meadows, and more altitude air.',
    overview:
      'Astore rewards travellers who want fewer groups and longer trail days. Rama Meadows and the surrounding river valleys are simpler than Hunza’s town circuit — camps, mountain air, and fitness-minded pacing. It is a good match if Fairy Meadows feels too well known and you still want high grass under big walls.',
    image: 'https://picsum.photos/seed/astore-mj/900/700',
    query: 'Astore',
    coordinates: { lat: 35.3667, lng: 74.85 },
    mapDelta: 0.35,
    highlights: ['Rama Meadows', 'Mountain trails', 'River valleys', 'Remote camps'],
    bestMonths: ['June', 'July', 'August', 'September'],
    gallery: [
      {
        src: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=1400&q=80',
        alt: 'Remote meadows and mountain trails',
        caption: 'Rama Meadows',
      },
      {
        src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1400&q=80',
        alt: 'High trail in Astore',
        caption: 'Trail days',
      },
      {
        src: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=1400&q=80',
        alt: 'River valley in the Astore region',
        caption: 'River corridors',
      },
      {
        src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1400&q=80',
        alt: 'Open wilderness in Astore',
        caption: 'Quieter country',
      },
    ],
  },
];

export function getFeaturedDestinations() {
  return destinations.filter((destination) => destination.featured);
}

export function getDestinationBySlug(slug: string) {
  return destinations.find((destination) => destination.slug === slug);
}

export function getDestinationByName(name: string) {
  const needle = name.trim().toLowerCase();
  if (!needle) return undefined;

  return (
    destinations.find(
      (destination) =>
        destination.name.toLowerCase() === needle ||
        destination.query.toLowerCase() === needle ||
        destination.slug === needle,
    ) ??
    destinations.find(
      (destination) =>
        destination.name.toLowerCase().includes(needle) ||
        destination.query.toLowerCase().includes(needle) ||
        destination.slug.includes(needle.replace(/\s+/g, '-')),
    )
  );
}

export function resolveDestinationPath(query?: string | null) {
  const match = query ? getDestinationByName(query) : undefined;
  return match ? getDestinationHref(match.slug) : '/destinations';
}
