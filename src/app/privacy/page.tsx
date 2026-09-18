import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | Mountiva Journeys',
  description:
    'How Mountiva Journeys collects, uses, and protects your personal information.',
};

const sections = [
  {
    title: 'Information we collect',
    body: 'When you enquire about a tour, create an account, or contact us, we may collect your name, email address, phone number, travel preferences, and any details you share about your trip.',
  },
  {
    title: 'How we use your information',
    body: 'We use your information to respond to enquiries, prepare itineraries, process bookings, send trip updates, and improve our services. We do not sell your personal data.',
  },
  {
    title: 'Sharing with partners',
    body: 'To deliver your journey we may share necessary details with trusted local stays, transport partners, and guides in Gilgit-Baltistan. They only receive what is required to fulfil your trip.',
  },
  {
    title: 'Data retention',
    body: 'We keep enquiry and booking records for as long as needed to provide support, meet legal obligations, and resolve disputes. You may ask us to update or delete your information where applicable.',
  },
  {
    title: 'Your choices',
    body: 'You can request access to the personal data we hold, ask for corrections, or opt out of non-essential marketing messages by emailing hello@mountiva.travel.',
  },
  {
    title: 'Contact',
    body: 'For privacy questions, write to hello@mountiva.travel. We aim to respond within a reasonable timeframe.',
  },
] as const;

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-14 sm:px-6 sm:py-16 lg:py-20">
      <p className="text-[11px] font-medium tracking-[0.16em] text-accent uppercase">
        Legal
      </p>
      <h1 className="mt-3 text-4xl font-medium tracking-[-0.035em] sm:text-5xl">
        Privacy Policy
      </h1>
      <p className="mt-4 text-sm text-muted-foreground">
        Last updated: September 2026
      </p>
      <p className="mt-6 text-base leading-7 text-muted-foreground">
        Mountiva Journeys respects your privacy. This policy explains what we
        collect when you browse, enquire, or travel with us, and how that
        information is handled.
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
          href="/terms"
          className="font-medium text-accent underline-offset-4 hover:underline"
        >
          Terms &amp; Conditions
        </Link>
        .
      </p>
    </main>
  );
}
