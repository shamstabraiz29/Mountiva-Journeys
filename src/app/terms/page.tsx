import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms & Conditions | Mountiva Journeys',
  description:
    'Terms governing enquiries, bookings, and guided journeys with Mountiva Journeys.',
};

const sections = [
  {
    title: 'Our services',
    body: 'Mountiva Journeys organises guided travel experiences across Gilgit-Baltistan. Tour details on this website are indicative; final inclusions, dates, and pricing are confirmed in writing when you book.',
  },
  {
    title: 'Bookings and payments',
    body: 'A booking is confirmed once we accept your enquiry and you complete any required deposit or payment schedule. Prices are typically listed per person and may change until confirmation.',
  },
  {
    title: 'Cancellations and changes',
    body: 'Cancellation and change terms depend on the specific tour and supplier policies. We will outline applicable timelines and fees before you commit. Weather, road conditions, and permit requirements in mountain regions may require itinerary adjustments.',
  },
  {
    title: 'Traveller responsibilities',
    body: 'You are responsible for valid travel documents, appropriate insurance, fitness for the chosen itinerary, and following guide instructions on the road and trail. Please share relevant medical or dietary needs before travel.',
  },
  {
    title: 'Liability',
    body: 'Mountain travel involves inherent risks. Mountiva Journeys takes reasonable care in planning and partner selection, but we are not liable for events outside our control, including natural conditions, third-party service failures, or delays beyond our reasonable influence.',
  },
  {
    title: 'Website use',
    body: 'Content on this site is for general information. Images and itineraries may vary from the experience on the ground. Unauthorised use of our brand, copy, or materials is not permitted.',
  },
  {
    title: 'Contact',
    body: 'Questions about these terms can be sent to hello@mountiva.travel.',
  },
] as const;

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-14 sm:px-6 sm:py-16 lg:py-20">
      <p className="text-[11px] font-medium tracking-[0.16em] text-accent uppercase">
        Legal
      </p>
      <h1 className="mt-3 text-4xl font-medium tracking-[-0.035em] sm:text-5xl">
        Terms &amp; Conditions
      </h1>
      <p className="mt-4 text-sm text-muted-foreground">
        Last updated: September 2026
      </p>
      <p className="mt-6 text-base leading-7 text-muted-foreground">
        These terms apply when you browse Mountiva Journeys, submit an enquiry, or
        book a guided trip with us.
      </p>

      <div className="mt-12 space-y-10">
        {sections.map((section) => (
          <section key={section.title}>
            <h2 className="text-xl font-medium tracking-[-0.02em]">
              {section.title}
            </h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              {section.body}
            </p>
          </section>
        ))}
      </div>

      <p className="mt-12 text-sm text-muted-foreground">
        See also our{' '}
        <Link
          href="/privacy"
          className="font-medium text-accent underline-offset-4 hover:underline"
        >
          Privacy Policy
        </Link>
        .
      </p>
    </main>
  );
}
