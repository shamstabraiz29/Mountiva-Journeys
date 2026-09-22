export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export type FaqGroup = {
  id: string;
  label: string;
  items: FaqItem[];
};

export const faqGroups: FaqGroup[] = [
  {
    id: 'places',
    label: 'Places & seasons',
    items: [
      {
        id: 'destinations-covered',
        question: 'Which destinations does Mountiva cover in Pakistan?',
        answer:
          'We specialise in Gilgit-Baltistan — Hunza Valley, Skardu, Fairy Meadows, Deosai Plains, Naltar, Khaplu, Passu, and Astore — with custom routes across northern Pakistan.',
      },
      {
        id: 'best-time',
        question: 'When is the best time to visit Gilgit-Baltistan?',
        answer:
          'April to June brings spring blooms and milder roads. July to August is peak summer for high meadows like Deosai. September to October offers clear mountain light and fewer crowds.',
      },
    ],
  },
  {
    id: 'trips',
    label: 'Trips & inclusions',
    items: [
      {
        id: 'private-or-group',
        question: 'Are your packages private or group trips?',
        answer:
          'Both. Choose a ready-made package or ask for a private itinerary. Small groups stay intimate; custom trips can be tailored for couples, families, or friends.',
      },
      {
        id: 'inclusions',
        question: 'What is usually included in a package?',
        answer:
          'Most packages include transport, stays, and local guides. Meals, entry fees, and optional activities vary by trip — full details are listed on each package page.',
      },
      {
        id: 'custom-itinerary',
        question: 'Can you plan a custom Hunza or Skardu itinerary?',
        answer:
          'Yes. Share your dates, group size, and interests — valleys, trekking, culture, or photography — and we will shape a route with stays and logistics that fit.',
      },
    ],
  },
  {
    id: 'practical',
    label: 'Practical details',
    items: [
      {
        id: 'permits',
        question: 'Do I need a permit for Fairy Meadows or Deosai?',
        answer:
          'Some areas require local permits or registration. We arrange these for you when they are part of your itinerary so you can focus on the journey.',
      },
      {
        id: 'fitness',
        question: 'How fit do I need to be for these trips?',
        answer:
          'Most journeys suit active travellers comfortable with day walks of 4–6 hours. Trek-focused trips like Fairy Meadows need stronger legs and steady footing; we can adjust pace on request.',
      },
      {
        id: 'booking',
        question: 'How do I book or ask a question?',
        answer:
          'Browse packages from the home search, or contact us with your preferred destinations and travel month. We reply with options and next steps.',
      },
    ],
  },
];

export function getFaqItems() {
  return faqGroups.flatMap((group) =>
    group.items.map((item) => ({ ...item, topic: group.label, topicId: group.id })),
  );
}

export function getFaqItem(id: string) {
  return getFaqItems().find((item) => item.id === id);
}
