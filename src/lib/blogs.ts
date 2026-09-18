export type BlogCategory =
  | 'Seasons'
  | 'Destinations'
  | 'Responsible travel'
  | 'Field notes'
  | 'Guides';

export type BlogSection = {
  heading: string;
  paragraphs: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  /** Short PageHero title word — kept brief like other pages */
  heroLabel: string;
  excerpt: string;
  category: BlogCategory;
  destination?: string;
  author: string;
  publishedAt: string;
  readMinutes: number;
  image: string;
  takeaways: string[];
  sections: BlogSection[];
  featured?: boolean;
};

export const blogCategories: BlogCategory[] = [
  'Seasons',
  'Destinations',
  'Responsible travel',
  'Field notes',
  'Guides',
];

export const blogPosts: BlogPost[] = [
  {
    slug: 'when-to-visit-hunza',
    title: 'When to visit Hunza: blossom, high summer, and golden autumn',
    heroLabel: 'Hunza',
    excerpt:
      'A clear season-by-season guide to Hunza’s light, roads, and rhythms — so you pick the month that matches how you like to travel.',
    category: 'Seasons',
    destination: 'Hunza Valley',
    author: 'Mountiva Field Desk',
    publishedAt: '2026-03-12',
    readMinutes: 7,
    image:
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1400&q=80',
    featured: true,
    takeaways: [
      'Spring favours blossom and softer roads',
      'Summer opens higher viewpoints with more travellers',
      'Autumn brings clear peaks and orchard colour',
      'Winter needs flexible plans and local advice',
    ],
    sections: [
      {
        heading: 'Why the month matters',
        paragraphs: [
          'Hunza changes character with the season. Apricot blossom, high summer haze, and autumn gold are not interchangeable — each asks for a different pace, packing list, and set of expectations on the road.',
          'Mountiva shapes itineraries around that truth. The aim is not to force every viewpoint into one trip, but to match the valley’s light and access to how you like to travel.',
        ],
      },
      {
        heading: 'Spring and early summer',
        paragraphs: [
          'April and May bring orchard bloom, greener terraces, and milder days. Lower valley routes feel generous; some high passes and alpine approaches are still settling.',
          'This window suits travellers who want Hunza’s softer side — Karimabad walks, Attabad shores, and time to sit with the landscape before peak season fills the roads.',
        ],
      },
      {
        heading: 'High summer and autumn',
        paragraphs: [
          'June through August offers the widest access to high viewpoints, with longer days and warmer nights. It is also the busiest corridor — we pace days so popular stops do not become a rush.',
          'September and October are favourites for clear Karakoram light and orchard colour. Crisp air, sharper peaks, and fewer crowds make this a strong photography and valley-stay season.',
        ],
      },
    ],
  },
  {
    slug: 'fairy-meadows-without-the-rush',
    title: 'Fairy Meadows without the rush',
    heroLabel: 'Meadows',
    excerpt:
      'How we pace Nanga Parbat base approaches — camp discipline, quieter windows, and what “enough time” really looks like on the meadow.',
    category: 'Destinations',
    destination: 'Fairy Meadows',
    author: 'Mountiva Field Desk',
    publishedAt: '2026-02-28',
    readMinutes: 6,
    image:
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1400&q=80',
    takeaways: [
      'Build in buffer days for weather and road delays',
      'Camp discipline protects a fragile meadow',
      'Quieter windows often mean early starts',
      'Enough time beats collecting every viewpoint',
    ],
    sections: [
      {
        heading: 'The meadow is the destination',
        paragraphs: [
          'Fairy Meadows rewards travellers who treat arrival as the beginning of the stay, not a checkbox before the next transfer. Nanga Parbat’s face asks for stillness as much as for footsteps.',
          'Mountiva builds itineraries with room for weather, jeep-track delays, and an extra night when the light is worth holding.',
        ],
      },
      {
        heading: 'Camp care and quieter windows',
        paragraphs: [
          'Waste, water, and foot traffic concentrate on a small alpine shelf. We brief guests on packing out refuse, respecting local camp rules, and keeping groups compact on popular paths.',
          'Early starts and shoulder-season dates often mean calmer meadows. When peak summer is the only option, we still protect downtime — hot drinks, slow walks, and space away from the loudest clusters.',
        ],
      },
    ],
  },
  {
    slug: 'waste-on-the-trail',
    title: 'What we bring into the mountains — and what we take out',
    heroLabel: 'Waste',
    excerpt:
      'Practical notes from Mountiva’s waste questions: packing lighter, managing camp refuse, and leaving valleys cleaner than we found them.',
    category: 'Responsible travel',
    author: 'Mountiva Field Desk',
    publishedAt: '2026-02-10',
    readMinutes: 8,
    image:
      'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1400&q=80',
    takeaways: [
      'Prevent waste before you pack',
      'Track what enters high camps',
      'Pack out what the trail cannot hold',
      'Measure impact — then improve',
    ],
    sections: [
      {
        heading: 'Start before the trailhead',
        paragraphs: [
          'Most trail waste is decided in the packing list. Single-use bottles, excess packaging, and “just in case” snacks add up quickly when a million visitors concentrate on a few corridors.',
          'We ask travellers to reduce before they pack, reuse where they can, and refuse what the mountains cannot absorb. Guides and stewards reinforce the same habits on the ground.',
        ],
      },
      {
        heading: 'Systems, not slogans',
        paragraphs: [
          'Mountiva treats waste as an operating question — how we manage what we bring, how campsites stay clean, and how communities benefit from tourism that does not leave a mess behind.',
          'That means clear guest briefings, steward support, and a willingness to measure what works so the next season is cleaner than the last.',
        ],
      },
    ],
  },
  {
    slug: 'skardu-first-timer',
    title: 'Skardu for first-timers: lakes, dunes, and the K2 gateway',
    heroLabel: 'Skardu',
    excerpt:
      'A primer on Shangrila, cold desert edges, and how to shape a first Skardu chapter without stacking every viewpoint into one day.',
    category: 'Guides',
    destination: 'Skardu',
    author: 'Mountiva Field Desk',
    publishedAt: '2026-01-22',
    readMinutes: 9,
    image:
      'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=1400&q=80',
    takeaways: [
      'Separate lake days from desert and fort days',
      'Allow recovery after long road transfers',
      'Keep one buffer day for weather',
      'Pair Skardu with a clear next chapter',
    ],
    sections: [
      {
        heading: 'A first chapter, not a checklist',
        paragraphs: [
          'Skardu opens many doors at once — turquoise lakes, cold desert dunes, historic forts, and the sense that higher ranges sit just beyond the next ridge. First-timers often try to see all of it in three days.',
          'We recommend fewer anchors done properly: a lake morning, a desert evening, a town day with room to breathe after the road from Gilgit or Islamabad.',
        ],
      },
      {
        heading: 'Building the onward route',
        paragraphs: [
          'Skardu works as a gateway. Some travellers continue toward Khaplu or Deosai; others turn toward Hunza on a longer circuit. Naming the next chapter early keeps transfers honest and pacing kind.',
          'Tell us your group size and season — we will sketch a first Skardu stay that leaves energy for what comes after.',
        ],
      },
    ],
  },
  {
    slug: 'deosai-summer-window',
    title: 'Deosai’s short summer: when the plains open',
    heroLabel: 'Deosai',
    excerpt:
      'Why Deosai is a summer story — weather windows, wildlife notes, and how we plan high-plateau days with room to turn back.',
    category: 'Seasons',
    destination: 'Deosai Plains',
    author: 'Mountiva Field Desk',
    publishedAt: '2026-01-08',
    readMinutes: 5,
    image:
      'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?auto=format&fit=crop&w=1400&q=80',
    takeaways: [
      'Peak access is a short summer window',
      'Weather can close plans without warning',
      'Wildlife viewing needs quiet pacing',
      'Always keep a turn-back option',
    ],
    sections: [
      {
        heading: 'A plateau with a short season',
        paragraphs: [
          'Deosai is not a year-round destination. Snow, wind, and road conditions keep the high plains closed for much of the year — and that scarcity is part of why summer days feel so open.',
          'We plan Deosai chapters only when the window is real, with flexible day plans and a clear exit if weather turns.',
        ],
      },
      {
        heading: 'Travel lightly on the plains',
        paragraphs: [
          'Wide space can still be fragile. Staying on established tracks, packing out waste, and keeping noise low protects wildlife and the sense of remoteness travellers come for.',
          'If Deosai is on your list, share your month early — we will be honest about whether the plains will be open for your dates.',
        ],
      },
    ],
  },
  {
    slug: 'community-led-stays',
    title: 'Why local hosts sit at the centre of every Mountiva journey',
    heroLabel: 'Hosts',
    excerpt:
      'How community-led stays and guides shape safer, warmer trips — and keep tourism income closer to the valleys travellers come to see.',
    category: 'Responsible travel',
    author: 'Mountiva Field Desk',
    publishedAt: '2025-12-18',
    readMinutes: 6,
    image:
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1400&q=80',
    takeaways: [
      'Local hosts hold place knowledge',
      'Income should stay in the valleys',
      'Training builds long-term capacity',
      'Warmth is part of responsible travel',
    ],
    sections: [
      {
        heading: 'Empower is an operating pillar',
        paragraphs: [
          'Mountiva’s journeys are not generic hotel chains dropped onto a mountain map. Independent stays and guides from Gilgit-Baltistan shape the day — from road conditions to the quietest viewpoint for sunset.',
          'When hosts and stewards sit at the centre, travellers get better trips and communities keep more of the value tourism creates.',
        ],
      },
      {
        heading: 'What guests notice',
        paragraphs: [
          'Guests often remember the meal that arrived late because the family was finishing harvest work — and the conversation that followed. That human pace is intentional.',
          'We train and partner for reliability without sanding away the local character that makes northern Pakistan feel considered rather than packaged.',
        ],
      },
    ],
  },
  {
    slug: 'women-only-hunza-notes',
    title: 'Field notes from a women-only Hunza departure',
    heroLabel: 'Women',
    excerpt:
      'Quiet mornings above Karimabad, paced valley days, and what travellers told us they needed from a women-aware northern route.',
    category: 'Field notes',
    destination: 'Hunza Valley',
    author: 'Mountiva Field Desk',
    publishedAt: '2025-11-30',
    readMinutes: 7,
    image:
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1400&q=80',
    takeaways: [
      'Pacing matters as much as the viewpoint',
      'Women-aware hosts change the feel of a day',
      'Small groups leave room to talk and rest',
      'Quiet is a design choice, not an accident',
    ],
    sections: [
      {
        heading: 'She came for the peaks',
        paragraphs: [
          'On a spring morning above Karimabad, a small circle of women watched apricot blossom catch the first light — no rush to the next viewpoint, no need to explain why the day could move slowly.',
          'Mountiva’s women-only journeys are shaped for that kind of travel: trusted local hosts, women-aware pacing, and room to talk, walk, and simply be among the mountains.',
        ],
      },
      {
        heading: 'What we heard',
        paragraphs: [
          'Travellers asked for clear inclusions, flexible mornings, and groups small enough that nobody felt lost in a loud itinerary. They wanted the valleys properly — not a checklist shouted from a bus.',
          'If that sounds like how you want to travel, enquire for a women-only departure and we will share upcoming windows through Hunza and the high valleys.',
        ],
      },
    ],
  },
];

export function getFeaturedPost() {
  return blogPosts.find((post) => post.featured) ?? blogPosts[0];
}

export function getBlogPosts(options?: { excludeSlug?: string }) {
  return blogPosts.filter((post) => post.slug !== options?.excludeSlug);
}

export function getPostsByCategory(category: BlogCategory) {
  return blogPosts.filter((post) => post.category === category);
}

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function formatBlogDate(iso: string) {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(iso));
}
