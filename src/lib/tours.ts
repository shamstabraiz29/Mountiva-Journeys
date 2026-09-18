export type TourStyle = 'Valley' | 'Trek' | 'Adventure' | 'Culture';
export type TourDifficulty = 'Easy' | 'Moderate' | 'Challenging';

export type Tour = {
  id: string;
  name: string;
  destination: string;
  region: string;
  days: number;
  priceFrom: number;
  difficulty: TourDifficulty;
  style: TourStyle;
  groupSize: string;
  bestMonths: string[];
  highlights: string[];
  summary: string;
  overview: string;
  includes: string[];
  excludes: string[];
  itinerary: { day: number; title: string; detail: string }[];
  image: string;
  featured?: boolean;
};

export type Destination = {
  name: string;
  region: string;
  note: string;
  image: string;
  query: string;
};

export const destinations: Destination[] = [
  {
    name: 'Hunza Valley',
    region: 'Gilgit-Baltistan',
    note: 'Rakaposhi views, apricot orchards, and Passu cones.',
    image: 'https://picsum.photos/seed/hunza-valley-mj/900/700',
    query: 'Hunza',
  },
  {
    name: 'Skardu',
    region: 'Gilgit-Baltistan',
    note: 'Shangrila lake, cold desert dunes, and the K2 gateway.',
    image: 'https://picsum.photos/seed/skardu-mj/900/700',
    query: 'Skardu',
  },
  {
    name: 'Fairy Meadows',
    region: 'Gilgit-Baltistan',
    note: 'Nanga Parbat base views and alpine meadow camps.',
    image: 'https://picsum.photos/seed/fairy-meadows-mj/900/700',
    query: 'Fairy Meadows',
  },
  {
    name: 'Deosai Plains',
    region: 'Gilgit-Baltistan',
    note: 'High plateau wildlife, summer blooms, open sky.',
    image: 'https://picsum.photos/seed/deosai-mj/900/700',
    query: 'Deosai',
  },
];

export const tours: Tour[] = [
  {
    id: 'hunza-explorer',
    name: 'Hunza Explorer',
    destination: 'Hunza Valley',
    region: 'Gilgit-Baltistan',
    days: 7,
    priceFrom: 89000,
    difficulty: 'Easy',
    style: 'Valley',
    groupSize: '2–12',
    bestMonths: ['April', 'May', 'June', 'September', 'October'],
    highlights: ['Karimabad', 'Attabad Lake', 'Passu Cones', 'Eagle Nest'],
    summary:
      'A paced valley journey through Hunza’s orchards, turquoise lakes, and classic Karakoram viewpoints.',
    overview:
      'Seven days shaped around Hunza’s softer rhythms — orchard towns, lake shores, and high viewpoints without rushing the road. Ideal if you want northern Pakistan’s signature landscapes with comfortable stays and time to breathe.',
    includes: [
      'Private transport',
      'Boutique valley stays',
      'Local guide',
      'Daily breakfast',
    ],
    excludes: ['Flights', 'Lunches & dinners unless noted', 'Personal expenses'],
    itinerary: [
      {
        day: 1,
        title: 'Arrive Gilgit / drive to Hunza',
        detail: 'Meet your host, settle into Karimabad, and ease into valley views.',
      },
      {
        day: 2,
        title: 'Karimabad & Baltit',
        detail: 'Old town walks, Baltit Fort context, and sunset above the orchards.',
      },
      {
        day: 3,
        title: 'Attabad Lake',
        detail: 'Turquoise water, boat time if conditions allow, and lakeside lunch stops.',
      },
      {
        day: 4,
        title: 'Passu & upper Hunza',
        detail: 'Passu Cones viewpoints, Hussaini bridge views, and quiet village roads.',
      },
      {
        day: 5,
        title: 'Eagle Nest & Duikar',
        detail: 'Classic panorama point for Rakaposhi and the Hunza ribbon below.',
      },
      {
        day: 6,
        title: 'Free valley day',
        detail: 'Optional walks, cafés, or a short cultural stop at your pace.',
      },
      {
        day: 7,
        title: 'Return south',
        detail: 'Drive back toward Gilgit / onward connection with buffer time.',
      },
    ],
    image:
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=80',
    featured: true,
  },
  {
    id: 'skardu-deosai',
    name: 'Skardu & Deosai',
    destination: 'Skardu',
    region: 'Gilgit-Baltistan',
    days: 8,
    priceFrom: 112000,
    difficulty: 'Moderate',
    style: 'Adventure',
    groupSize: '2–10',
    bestMonths: ['June', 'July', 'August', 'September'],
    highlights: ['Shangrila', 'Cold Desert', 'Deosai Plains', 'Khaplu'],
    summary:
      'From Skardu’s lakes and dunes to the wide summer grasslands of Deosai — big landscapes, unhurried days.',
    overview:
      'An eight-day Baltistan loop for travellers who want scale: lake bowls, cold desert dunes, and the open Deosai plateau when the season opens. Days mix jeep time with slow viewpoints and a Khaplu side journey.',
    includes: [
      '4x4 support where needed',
      'Hotel & camp stays',
      'Experienced guide',
      'Park entry fees',
    ],
    excludes: ['Flights to Skardu', 'Travel insurance', 'Tips'],
    itinerary: [
      {
        day: 1,
        title: 'Arrive Skardu',
        detail: 'Settle in, short orientation walk, and Indus valley first views.',
      },
      {
        day: 2,
        title: 'Shangrila & Upper Kachura',
        detail: 'Lake morning, café pause, and soft photo stops around the basin.',
      },
      {
        day: 3,
        title: 'Cold Desert & Manthal',
        detail: 'Sand dunes against mountain walls and the Buddha rock site.',
      },
      {
        day: 4,
        title: 'Enter Deosai',
        detail: 'High plateau drive, wildlife watching, and wide-sky camps or lodge.',
      },
      {
        day: 5,
        title: 'Deosai day',
        detail: 'Sheosar Lake viewpoint and unhurried grassland exploration.',
      },
      {
        day: 6,
        title: 'Khaplu',
        detail: 'Descend toward Khaplu for palace-town atmosphere and riverside quiet.',
      },
      {
        day: 7,
        title: 'Khaplu to Skardu',
        detail: 'Return via scenic Baltistan roads with flexible photo stops.',
      },
      {
        day: 8,
        title: 'Departure',
        detail: 'Airport or onward transfer with morning buffer.',
      },
    ],
    image:
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1600&q=80',
    featured: true,
  },
  {
    id: 'fairy-meadows-trek',
    name: 'Fairy Meadows Trek',
    destination: 'Fairy Meadows',
    region: 'Gilgit-Baltistan',
    days: 5,
    priceFrom: 68000,
    difficulty: 'Moderate',
    style: 'Trek',
    groupSize: '2–8',
    bestMonths: ['May', 'June', 'July', 'August', 'September'],
    highlights: ['Raikot Bridge', 'Fairy Meadows', 'Beyal Camp', 'Nanga Parbat views'],
    summary:
      'A short, high-reward trek to alpine meadows beneath Nanga Parbat — nights under clear mountain sky.',
    overview:
      'Five days focused on one of Pakistan’s most iconic meadow approaches. Jeep to Raikot, trek to Fairy Meadows, and an optional push toward Beyal for closer Nanga Parbat faces. Built for travellers comfortable with moderate trail days.',
    includes: [
      'Jeep transfer to Raikot',
      'Guided trek',
      'Camping or lodge nights',
      'Trail support',
    ],
    excludes: ['Personal trekking gear', 'Porter upgrades beyond plan', 'Flights'],
    itinerary: [
      {
        day: 1,
        title: 'To Raikot Bridge',
        detail: 'Road transfer and jeep sector to the trailhead staging point.',
      },
      {
        day: 2,
        title: 'Trek to Fairy Meadows',
        detail: 'Forest trail ascent into the classic meadow camp beneath the peak.',
      },
      {
        day: 3,
        title: 'Beyal viewpoint day',
        detail: 'Optional hike toward Beyal Camp for closer mountain walls.',
      },
      {
        day: 4,
        title: 'Meadow morning & descend',
        detail: 'Sunrise light, then trek down and jeep out toward the main road.',
      },
      {
        day: 5,
        title: 'Return',
        detail: 'Transfer toward Gilgit / onward connection.',
      },
    ],
    image:
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80',
    featured: true,
  },
  {
    id: 'gilgit-baltistan-grand',
    name: 'Gilgit-Baltistan Grand',
    destination: 'Hunza Valley',
    region: 'Gilgit-Baltistan',
    days: 12,
    priceFrom: 165000,
    difficulty: 'Moderate',
    style: 'Culture',
    groupSize: '2–10',
    bestMonths: ['May', 'June', 'September', 'October'],
    highlights: ['Gilgit', 'Hunza', 'Skardu', 'Naltar'],
    summary:
      'Our signature north circuit — valleys, high passes, and cultural stops across Gilgit-Baltistan.',
    overview:
      'Twelve days across the north’s headline regions: Gilgit base, Hunza valleys, a Skardu chapter, and Naltar’s quieter colour. Designed as Mountiva’s full-circuit introduction for travellers who want breadth without packing every hour.',
    includes: [
      'Full-circuit transport',
      'Handpicked stays',
      'Local guides',
      'Selected experiences',
    ],
    excludes: ['Domestic flights if chosen', 'Visa fees', 'Optional activities'],
    itinerary: [
      {
        day: 1,
        title: 'Arrive Gilgit',
        detail: 'Settle in, market stroll, and trip briefing with your host.',
      },
      {
        day: 2,
        title: 'Naltar Valley',
        detail: 'Day into coloured lakes and pine forest air near Gilgit.',
      },
      {
        day: 3,
        title: 'Gilgit to Hunza',
        detail: 'Karakoram Highway drive into Karimabad.',
      },
      {
        day: 4,
        title: 'Hunza heritage',
        detail: 'Baltit / Altit context and orchard-town wandering.',
      },
      {
        day: 5,
        title: 'Attabad & Passu',
        detail: 'Lake shores and upper-Hunza cone viewpoints.',
      },
      {
        day: 6,
        title: 'Eagle Nest morning',
        detail: 'Panorama stop, then free afternoon in the valley.',
      },
      {
        day: 7,
        title: 'Toward Skardu',
        detail: 'Transfer day with scenic breaks along the route.',
      },
      {
        day: 8,
        title: 'Skardu lakes',
        detail: 'Shangrila / Kachura basin and town orientation.',
      },
      {
        day: 9,
        title: 'Desert & viewpoints',
        detail: 'Cold desert dunes and classic Skardu overlooks.',
      },
      {
        day: 10,
        title: 'Khaplu day',
        detail: 'Heritage town energy and riverside quiet.',
      },
      {
        day: 11,
        title: 'Buffer / flexible day',
        detail: 'Weather buffer, optional short walk, or café recovery.',
      },
      {
        day: 12,
        title: 'Departure',
        detail: 'Airport or return connection south.',
      },
    ],
    image:
      'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=1600&q=80',
    featured: true,
  },
  {
    id: 'passu-cones-escape',
    name: 'Passu Cones Escape',
    destination: 'Passu',
    region: 'Gilgit-Baltistan',
    days: 4,
    priceFrom: 52000,
    difficulty: 'Easy',
    style: 'Valley',
    groupSize: '2–8',
    bestMonths: ['April', 'May', 'June', 'September', 'October'],
    highlights: ['Passu Cones', 'Hussaini Bridge', 'Borit Lake', 'Village walks'],
    summary:
      'A compact upper-Hunza escape focused on Passu’s iconic cones, bridges, and quiet village mornings.',
    overview:
      'Four days for travellers who already know Karimabad — or simply want upper Hunza’s drama without a long circuit. Guesthouse nights, short walks, and the Passu skyline as your main frame.',
    includes: [
      'Return transport',
      'Guesthouse stays',
      'Local host',
      'Breakfast daily',
    ],
    excludes: ['Flights', 'Adventure activity fees', 'Personal shopping'],
    itinerary: [
      {
        day: 1,
        title: 'To Passu',
        detail: 'Drive into upper Hunza and settle near the cones.',
      },
      {
        day: 2,
        title: 'Cones & Hussaini',
        detail: 'Viewpoints, bridge area, and slow photography light.',
      },
      {
        day: 3,
        title: 'Borit & village walks',
        detail: 'Lake side trip and gentle paths through local settlements.',
      },
      {
        day: 4,
        title: 'Return',
        detail: 'Drive south with flexible departure timing.',
      },
    ],
    image:
      'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 'naltar-valley-weekend',
    name: 'Naltar Valley Weekend',
    destination: 'Naltar Valley',
    region: 'Gilgit-Baltistan',
    days: 3,
    priceFrom: 42000,
    difficulty: 'Easy',
    style: 'Valley',
    groupSize: '2–10',
    bestMonths: ['May', 'June', 'July', 'August', 'September'],
    highlights: ['Naltar Lakes', 'Pine forests', 'Local cuisine', 'Easy walks'],
    summary:
      'A restorative long weekend among Naltar’s coloured lakes and pine-lined trails — close to Gilgit.',
    overview:
      'A short reset near Gilgit: coloured lakes, pine air, and easy walking. Built for long weekends and travellers connecting through Gilgit who want nature without a multi-pass expedition.',
    includes: [
      'Gilgit transfers',
      'Valley lodging',
      'Guided lake visit',
      'Meals as listed',
    ],
    excludes: ['Flights', 'Extra jeep upgrades', 'Souvenirs'],
    itinerary: [
      {
        day: 1,
        title: 'Gilgit to Naltar',
        detail: 'Transfer into the valley and evening forest quiet.',
      },
      {
        day: 2,
        title: 'Lakes & walks',
        detail: 'Coloured lakes circuit and optional short forest trails.',
      },
      {
        day: 3,
        title: 'Return to Gilgit',
        detail: 'Morning light, then transfer back for onward plans.',
      },
    ],
    image:
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 'khaplu-heritage',
    name: 'Khaplu Heritage Trail',
    destination: 'Khaplu',
    region: 'Gilgit-Baltistan',
    days: 6,
    priceFrom: 95000,
    difficulty: 'Easy',
    style: 'Culture',
    groupSize: '2–8',
    bestMonths: ['April', 'May', 'June', 'September', 'October'],
    highlights: ['Khaplu Palace', 'Village walks', 'Shyok views', 'Local crafts'],
    summary:
      'Slow travel through Baltistan’s heritage heart — palace stays energy, riverside villages, and craft stories.',
    overview:
      'Six days oriented around Khaplu’s cultural texture rather than peak-bagging. Palace context, village walks, Shyok river views, and space for craft and conversation — a quieter Baltistan chapter.',
    includes: [
      'Skardu–Khaplu transport',
      'Character stays',
      'Heritage guide',
      'Selected meals',
    ],
    excludes: ['Flights to Skardu', 'Optional craft purchases', 'Insurance'],
    itinerary: [
      {
        day: 1,
        title: 'Skardu arrive & transfer',
        detail: 'Meet in Skardu and continue toward Khaplu.',
      },
      {
        day: 2,
        title: 'Palace & old town',
        detail: 'Heritage orientation and unhurried town exploration.',
      },
      {
        day: 3,
        title: 'Village walks',
        detail: 'Nearby settlements, terraces, and everyday Baltistan life.',
      },
      {
        day: 4,
        title: 'Shyok viewpoints',
        detail: 'River landscapes and soft afternoon light stops.',
      },
      {
        day: 5,
        title: 'Crafts & free time',
        detail: 'Local makers where available, plus café and rest time.',
      },
      {
        day: 6,
        title: 'Return to Skardu',
        detail: 'Drive back for departure connections.',
      },
    ],
    image:
      'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=1600&q=80',
  },
  {
    id: 'astore-wilderness',
    name: 'Astore Wilderness',
    destination: 'Astore',
    region: 'Gilgit-Baltistan',
    days: 7,
    priceFrom: 98000,
    difficulty: 'Challenging',
    style: 'Trek',
    groupSize: '2–8',
    bestMonths: ['June', 'July', 'August', 'September'],
    highlights: ['Rama Meadows', 'Mountain trails', 'River valleys', 'Remote camps'],
    summary:
      'Quieter trails and wide meadows in Astore — for travellers who want fewer crowds and more altitude air.',
    overview:
      'A week for travellers ready for longer trail days and simpler camps. Rama Meadows and Astore’s quieter valleys reward those who prefer fewer groups and more mountain air over polished town circuits.',
    includes: [
      'Trail logistics',
      'Camping support',
      'Mountain guide',
      'Meals on trek',
    ],
    excludes: ['Personal trek kit', 'Emergency evacuation insurance', 'Flights'],
    itinerary: [
      {
        day: 1,
        title: 'Into Astore',
        detail: 'Transfer toward the valley and overnight near the trail system.',
      },
      {
        day: 2,
        title: 'Rama approach',
        detail: 'Move toward Rama Meadows with acclimatisation-minded pacing.',
      },
      {
        day: 3,
        title: 'Meadow day',
        detail: 'Wide-grass exploration and viewpoint walks.',
      },
      {
        day: 4,
        title: 'Higher trail option',
        detail: 'Challenging day hike based on group fitness and weather.',
      },
      {
        day: 5,
        title: 'River valley camp',
        detail: 'Shift camp along quieter water corridors.',
      },
      {
        day: 6,
        title: 'Descend',
        detail: 'Return toward road head with buffer for weather.',
      },
      {
        day: 7,
        title: 'Exit',
        detail: 'Transfer toward Gilgit / onward plans.',
      },
    ],
    image:
      'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=1600&q=80',
  },
];

export const tourStyles: TourStyle[] = [
  'Valley',
  'Trek',
  'Adventure',
  'Culture',
];

export const durationFilters = [
  { value: 'any', label: 'Any length' },
  { value: 'short', label: '1–5 days' },
  { value: 'medium', label: '6–9 days' },
  { value: 'long', label: '10+ days' },
] as const;

export type DurationFilter = (typeof durationFilters)[number]['value'];

export const sortOptions = [
  { value: 'recommended', label: 'Recommended' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'duration', label: 'Trip length' },
] as const;

export type SortOption = (typeof sortOptions)[number]['value'];

export type TourFilters = {
  q?: string;
  destination?: string;
  month?: string;
  travelers?: string;
  duration?: DurationFilter;
  style?: string;
  sort?: SortOption;
};

function matchesDuration(days: number, duration?: DurationFilter) {
  if (!duration || duration === 'any') return true;
  if (duration === 'short') return days <= 5;
  if (duration === 'medium') return days >= 6 && days <= 9;
  if (duration === 'long') return days >= 10;
  return true;
}

export function formatPrice(amount: number) {
  return `From PKR ${amount.toLocaleString('en-PK')}`;
}

export function formatDays(days: number) {
  return `${days} day${days === 1 ? '' : 's'}`;
}

export type StayId = 'essential' | 'signature' | 'private';

export type TourStay = {
  id: StayId;
  name: string;
  tagline: string;
  description: string;
  price: number;
  recommended?: boolean;
  includes: string[];
};

function roundThousand(amount: number) {
  return Math.round(amount / 1000) * 1000;
}

export function getTourStays(tour: Tour): [TourStay, TourStay, TourStay] {
  const base = tour.priceFrom;

  return [
    {
      id: 'essential',
      name: 'Essential',
      tagline: 'The core journey, well hosted.',
      description:
        'Comfortable local stays and the published route — everything you need, nothing padded.',
      price: base,
      includes: [
        'Small-group or shared vehicle',
        'Comfortable local stays',
        'Daily breakfast',
        'Local guide',
        'The published itinerary',
      ],
    },
    {
      id: 'signature',
      name: 'Signature',
      tagline: 'Boutique nights, extra care.',
      description:
        'The Mountiva way — character stays, a private vehicle for your group, and selected dinners.',
      price: roundThousand(base * 1.32),
      recommended: true,
      includes: [
        'Private vehicle for your group',
        'Boutique / character stays',
        'Breakfast and selected dinners',
        'Local guide',
        'One hosted extra on the route',
      ],
    },
    {
      id: 'private',
      name: 'Private',
      tagline: 'Your vehicle, your pace.',
      description:
        'A dedicated host, heritage stays, and room to linger — shaped around how you like to travel.',
      price: roundThousand(base * 1.72),
      includes: [
        'Dedicated vehicle and host',
        'Heritage or highest-character stays',
        'Most meals',
        'Flexible pacing',
        'Tailored extras on request',
      ],
    },
  ];
}

export function getStayEnquireHref(tour: Tour, stay: TourStay) {
  const params = new URLSearchParams({
    tour: tour.name,
    stay: stay.name,
  });
  return `/contact-us?${params.toString()}`;
}

export function getFeaturedTours(limit = 4) {
  return tours.filter((tour) => tour.featured).slice(0, limit);
}

export function getTourById(id: string) {
  return tours.find((tour) => tour.id === id);
}

export function getRelatedTours(tour: Tour, limit = 3) {
  return tours
    .filter(
      (item) =>
        item.id !== tour.id &&
        (item.destination === tour.destination ||
          item.style === tour.style ||
          item.region === tour.region)
    )
    .slice(0, limit);
}

export const calendarMonths = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const;

const landscapePhotos = [
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1400&q=80',
] as const;

export function getTourScenes(tour: Tour) {
  const offset = Math.max(
    0,
    tours.findIndex((item) => item.id === tour.id)
  );

  return tour.highlights.map((label, index) => ({
    label,
    image: landscapePhotos[(offset + index) % landscapePhotos.length],
  }));
}

export function filterTours(filters: TourFilters = {}) {
  const query = filters.q?.trim().toLowerCase() ?? '';
  const destination = filters.destination?.trim().toLowerCase() ?? '';
  const month = filters.month?.trim() ?? '';
  const style = filters.style?.trim().toLowerCase() ?? '';
  const sort = filters.sort ?? 'recommended';

  let results = tours.filter((tour) => {
    const haystack = [
      tour.name,
      tour.destination,
      tour.region,
      tour.summary,
      ...tour.highlights,
    ]
      .join(' ')
      .toLowerCase();

    const matchesQuery = !query || haystack.includes(query);
    const matchesDestination =
      !destination ||
      destination === 'any' ||
      tour.destination.toLowerCase().includes(destination) ||
      haystack.includes(destination);
    const matchesMonth =
      !month || month === 'any' || tour.bestMonths.includes(month);
    const matchesStyle =
      !style || style === 'any' || tour.style.toLowerCase() === style;
    const matchesLength = matchesDuration(tour.days, filters.duration);

    return (
      matchesQuery &&
      matchesDestination &&
      matchesMonth &&
      matchesStyle &&
      matchesLength
    );
  });

  results = [...results].sort((a, b) => {
    if (sort === 'price-asc') return a.priceFrom - b.priceFrom;
    if (sort === 'price-desc') return b.priceFrom - a.priceFrom;
    if (sort === 'duration') return a.days - b.days;
    // recommended: featured first, then shorter trips as gentle default
    const featuredDelta = Number(Boolean(b.featured)) - Number(Boolean(a.featured));
    if (featuredDelta !== 0) return featuredDelta;
    return a.priceFrom - b.priceFrom;
  });

  return results;
}

export function uniqueDestinations() {
  return Array.from(new Set(tours.map((tour) => tour.destination))).sort();
}
