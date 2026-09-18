import Link from 'next/link';
import { Leaf } from 'lucide-react';
import { destinations } from '@/lib/tours';

const holidayTypes = [
  { href: '/tour?style=Valley', label: 'Valley journeys' },
  { href: '/tour?style=Trek', label: 'Treks' },
  { href: '/tour?style=Adventure', label: 'Adventure tours' },
  { href: '/tour?style=Culture', label: 'Cultural heritage' },
  { href: '/contact-us', label: 'Custom trips' },
] as const;

const companyLinks = [
  { href: '/about', label: 'About us' },
  { href: '/contact-us', label: 'Customise your tour' },
  { href: '/faq', label: 'Why travel with us' },
  { href: '/blogs', label: 'Blog' },
  { href: '/contact-us', label: 'Contact us' },
] as const;

const socialLinks = [
  {
    href: 'https://facebook.com',
    label: 'Facebook',
    icon: (
      <svg viewBox="0 0 24 24" className="size-5 fill-current" aria-hidden>
        <path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07C0 18.1 4.39 23.09 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.7 4.53-4.7 1.31 0 2.68.24 2.68.24v2.95h-1.51c-1.49 0-1.95.93-1.95 1.89v2.26h3.32l-.53 3.49h-2.79V24C19.61 23.09 24 18.1 24 12.07z" />
      </svg>
    ),
  },
  {
    href: 'https://instagram.com',
    label: 'Instagram',
    icon: (
      <svg viewBox="0 0 24 24" className="size-5 fill-current" aria-hidden>
        <path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.64-.07-4.85s.01-3.58.07-4.85C2.38 3.92 3.9 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16zm0-2.16C8.74 0 8.33.01 7.05.07 2.7.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95C23.73 2.7 21.31.27 16.95.07 15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.41-10.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z" />
      </svg>
    ),
  },
  {
    href: 'https://youtube.com',
    label: 'YouTube',
    icon: (
      <svg viewBox="0 0 24 24" className="size-5 fill-current" aria-hidden>
        <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6a3 3 0 0 0-2.1 2.1A31.5 31.5 0 0 0 0 12a31.5 31.5 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.5 31.5 0 0 0 24 12a31.5 31.5 0 0 0-.5-5.8zM9.75 15.5v-7l6.5 3.5-6.5 3.5z" />
      </svg>
    ),
  },
  {
    href: 'https://x.com',
    label: 'X',
    icon: (
      <svg viewBox="0 0 24 24" className="size-4 fill-current" aria-hidden>
        <path d="M18.9 2H22l-6.8 7.8L23.3 22h-6.5l-5.1-6.7L5.8 22H2.7l7.3-8.3L.7 2h6.7l4.6 6.1L18.9 2zm-1.1 18h1.8L6.3 3.9H4.4L17.8 20z" />
      </svg>
    ),
  },
  {
    href: 'https://tiktok.com',
    label: 'TikTok',
    icon: (
      <svg viewBox="0 0 24 24" className="size-5 fill-current" aria-hidden>
        <path d="M19.6 7.6A6.2 6.2 0 0 1 16.1 5V16a5.6 5.6 0 1 1-5.6-5.6c.3 0 .6 0 .9.1v2.8a2.8 2.8 0 1 0 2 2.7V2h2.8a6.2 6.2 0 0 0 3.4 5.6z" />
      </svg>
    ),
  },
];

const legalLinks = [
  { href: '/terms', label: 'Terms & Conditions' },
  { href: '/privacy', label: 'Privacy Policy' },
] as const;

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="footer"
      className="mt-auto border-t border-accent/15 bg-secondary text-foreground"
    >
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5">
              <span className="flex size-9 items-center justify-center rounded-xl bg-accent text-surface">
                <Leaf size={16} aria-hidden />
              </span>
              <span className="flex flex-col leading-none">
                <span className="text-[15px] font-semibold tracking-[-0.03em]">
                  Mountiva
                </span>
                <span className="mt-0.5 text-[10px] font-medium tracking-[0.16em] text-accent uppercase">
                  Journeys
                </span>
              </span>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-6 text-muted-foreground">
              Join us for Gilgit-Baltistan valleys and peaks — paced
              itineraries, local stays, and journeys shaped around how you like
              to travel.
            </p>
            <p className="mt-6 text-sm font-medium tracking-[0.12em] text-accent uppercase">
              Follow us
            </p>
            <div className="mt-3.5 flex flex-wrap gap-2.5">
              {socialLinks.map(({ href, label, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex size-11 items-center justify-center border border-accent/20 text-foreground/70 transition-colors hover:border-accent hover:text-accent"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[11px] font-medium tracking-[0.14em] text-accent uppercase">
              Holiday types
            </p>
            <ul className="mt-4 space-y-3">
              {holidayTypes.map(({ href, label }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-medium tracking-[0.14em] text-accent uppercase">
              Destinations
            </p>
            <ul className="mt-4 space-y-3">
              {destinations.map(({ name, query }) => (
                <li key={name}>
                  <Link
                    href={`/tour?q=${encodeURIComponent(query)}`}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/tour"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  All destinations
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-medium tracking-[0.14em] text-accent uppercase">
              Company
            </p>
            <ul className="mt-4 space-y-3">
              {companyLinks.map(({ href, label }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-accent/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-5 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-5">
            <p className="text-[13px]">
              © {year} Mountiva Journeys. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-[13px]">
              {legalLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="transition-colors hover:text-foreground"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
          <p className="text-[13px] sm:text-right">
            Made with ♥ in Gilgit-Baltistan by{' '}
            <a
              href="https://www.linkedin.com/in/shamstabraizbaig/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground/70 transition-colors hover:text-accent"
            >
              Shams Tabraiz Baig
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
