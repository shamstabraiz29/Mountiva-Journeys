'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight, Leaf, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/tour', label: 'Tour' },
  { href: '/about', label: 'About' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact-us', label: 'Contact Us' },
  { href: '/blogs', label: 'Blogs' },
] as const;

function AuthSwitch({
  onDark,
  onNavigate,
}: {
  onDark?: boolean;
  onNavigate?: () => void;
}) {
  return (
    <div
      className={`inline-flex items-center rounded-full border bg-transparent p-1 backdrop-blur-md ${
        onDark ? 'border-highlight/40' : 'border-accent/40'
      }`}
    >
      <Link
        href="/auth/signin"
        onClick={onNavigate}
        className={`rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
          onDark
            ? 'text-surface/85 hover:text-surface'
            : 'text-accent hover:text-foreground'
        }`}
      >
        Login
      </Link>
      <Link
        href="/auth/signup"
        onClick={onNavigate}
        className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-opacity hover:opacity-90 ${
          onDark ? 'bg-highlight text-foreground' : 'bg-accent text-surface'
        }`}
      >
        Sign up
        <ArrowRight size={13} strokeWidth={2.25} aria-hidden />
      </Link>
    </div>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isAuthRoute = pathname.startsWith('/auth');
  const darkHeroPaths = new Set([
    '/',
    '/about',
    '/faq',
    '/contact-us',
    '/blogs',
    '/tour',
  ]);
  const hasDarkHero =
    darkHeroPaths.has(pathname) ||
    pathname.startsWith('/blogs/') ||
    pathname.startsWith('/tour/');
  const onDark = hasDarkHero && !scrolled && !open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  if (isAuthRoute) return null;

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4">
      <div
        className={`mx-auto max-w-7xl rounded-md border transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 ${
          onDark
            ? 'border-white/18 bg-foreground/35 shadow-[0_8px_28px_rgb(0_0_0_/_0.2)] backdrop-blur-xl'
            : 'border-accent/15 bg-surface/90 shadow-[0_8px_28px_rgb(31_41_35_/_0.08)] backdrop-blur-xl'
        }`}
      >
        <nav className="flex h-16 items-center justify-between gap-4 px-4 sm:px-5">
          <Link
            href="/"
            className="group flex shrink-0 items-center gap-2.5"
            onClick={() => setOpen(false)}
          >
            <span
              className={`flex size-9 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-105 ${
                onDark
                  ? 'bg-highlight text-foreground'
                  : 'bg-accent text-surface'
              }`}
            >
              <Leaf size={16} aria-hidden />
            </span>
            <span className="flex flex-col leading-none">
              <span
                className={`text-[15px] font-semibold tracking-[-0.03em] ${
                  onDark ? 'text-surface' : 'text-foreground'
                }`}
              >
                Mountiva
              </span>
              <span
                className={`mt-0.5 text-[10px] font-medium tracking-[0.16em] uppercase ${
                  onDark ? 'text-highlight' : 'text-accent'
                }`}
              >
                Journeys
              </span>
            </span>
          </Link>

          <div className="hidden items-center gap-5 md:flex">
            {navLinks.map(({ href, label }) => {
              const active =
                href === '/'
                  ? pathname === '/'
                  : pathname === href || pathname.startsWith(`${href}/`);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`relative py-1 text-[13px] font-medium tracking-[-0.01em] transition-colors duration-200 ${
                    active
                      ? onDark
                        ? 'text-highlight'
                        : 'text-accent'
                      : onDark
                        ? 'text-surface/70 hover:text-surface'
                        : 'text-foreground/55 hover:text-foreground'
                  }`}
                >
                  {label}
                  <span
                    className={`absolute inset-x-0 -bottom-0.5 h-0.5 origin-center rounded-full transition-transform duration-300 ${
                      active ? 'scale-x-100' : 'scale-x-0'
                    } ${onDark ? 'bg-highlight' : 'bg-accent'}`}
                  />
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <AuthSwitch onDark={onDark} />
            </div>

            <button
              type="button"
              className={`inline-flex size-9 items-center justify-center rounded-xl border transition-colors md:hidden ${
                onDark
                  ? 'border-highlight bg-transparent text-highlight'
                  : 'border-accent bg-transparent text-accent hover:bg-accent/5'
              }`}
              aria-expanded={open}
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X size={17} /> : <Menu size={17} />}
            </button>
          </div>
        </nav>

        {open ? (
          <div className="border-t border-accent/15 bg-surface px-4 py-4 md:hidden">
            <div className="flex flex-col gap-1">
              {navLinks.map(({ href, label }) => {
                const active =
                  href === '/'
                    ? pathname === '/'
                    : pathname === href || pathname.startsWith(`${href}/`);
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                    className={`px-3 py-2.5 text-sm font-medium transition-colors ${
                      active
                        ? 'text-accent underline decoration-2 underline-offset-4'
                        : 'text-foreground/70 hover:text-foreground'
                    }`}
                  >
                    {label}
                  </Link>
                );
              })}
            </div>
            <div className="mt-4 flex justify-center border-t border-accent/15 pt-4 sm:hidden">
              <AuthSwitch onNavigate={() => setOpen(false)} />
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}
