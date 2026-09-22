'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ArrowRight, Leaf, Menu, Search, X } from 'lucide-react';
import { useEffect, useState, type FormEvent } from 'react';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group';
import { cn } from '@/lib/utils';

import { resolveDestinationPath } from '@/lib/destinations';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/destinations', label: 'Destinations' },
  { href: '/travel-styles', label: 'Travel Styles' },
  { href: '/about', label: 'About' },
  { href: '/contact-us', label: 'Contact Us' },
  { href: '/blogs', label: 'Blogs' },
] as const;

function HeaderSearch({
  onDark,
  className,
}: {
  onDark?: boolean;
  className?: string;
}) {
  const router = useRouter();
  const [query, setQuery] = useState('');

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = query.trim();
    router.push(resolveDestinationPath(value));
  }

  return (
    <form
      onSubmit={onSubmit}
      role="search"
      className={cn('group min-w-0', className)}
    >
      <InputGroup
        className={cn(
          'h-10 overflow-visible rounded-full shadow-none transition-[border-color,background-color,box-shadow] duration-200',
          onDark
            ? 'border-white/20 bg-white/10 has-[[data-slot=input-group-control]:focus-visible]:border-highlight/55 has-[[data-slot=input-group-control]:focus-visible]:ring-highlight/30'
            : 'border-accent/18 bg-background/80 has-[[data-slot=input-group-control]:focus-visible]:border-accent/45',
        )}
      >
        <InputGroupAddon
          className={cn('pl-3', onDark ? 'text-highlight' : 'text-accent')}
        >
          <Search className="size-4" aria-hidden />
        </InputGroupAddon>
        <InputGroupInput
          type="search"
          name="q"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search destinations"
          aria-label="Search destinations"
          autoComplete="off"
          className={cn(
            'h-10 text-sm [&::-webkit-search-cancel-button]:hidden',
            onDark
              ? 'text-surface placeholder:text-surface/45'
              : 'text-foreground placeholder:text-muted-foreground',
          )}
        />
        <InputGroupAddon align="inline-end" className="overflow-visible pr-4">
          <InputGroupButton
            type="submit"
            size="icon-xs"
            aria-label="Search destinations"
            className={cn(
              'header-search-cta size-7 rounded-full group-focus-within:animate-none',
              onDark
                ? 'bg-highlight text-foreground hover:bg-[#d4e0bc] hover:text-foreground'
                : 'bg-accent text-surface hover:bg-accent/90 hover:text-surface',
            )}
          >
            <ArrowRight
              className="header-search-cta-arrow size-3.5"
              aria-hidden
            />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </form>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isAuthRoute = pathname.startsWith('/auth');
  const isAdminRoute = pathname.startsWith('/admin');
  const darkHeroPaths = new Set([
    '/',
    '/about',
    '/faq',
    '/contact-us',
    '/blogs',
    '/tour',
    '/destinations',
    '/travel-styles',
  ]);
  const hasDarkHero =
    darkHeroPaths.has(pathname) ||
    pathname.startsWith('/blogs/') ||
    pathname.startsWith('/tour/') ||
    pathname.startsWith('/destinations/') ||
    pathname.startsWith('/travel-styles/');
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

  if (isAuthRoute || isAdminRoute) return null;

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4">
      <div
        className={`mx-auto max-w-7xl rounded-md border transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 ${
          onDark
            ? 'border-white/18 bg-foreground/35 shadow-[0_8px_28px_rgb(0_0_0_/_0.2)] backdrop-blur-xl'
            : 'border-accent/15 bg-surface/90 shadow-[0_8px_28px_rgb(31_41_35_/_0.08)] backdrop-blur-xl'
        }`}
      >
        <nav className="flex h-16 items-center gap-3 px-4 sm:gap-4 sm:px-5 lg:justify-between">
          <Link
            href="/"
            aria-label="Mountiva Journeys"
            className="group flex size-9 shrink-0 items-center gap-2.5 xl:size-auto"
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
            <span className="hidden flex-col leading-none xl:flex">
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

          <HeaderSearch
            onDark={onDark}
            className="min-w-0 flex-1 xl:order-last xl:w-72 xl:flex-none"
          />

          <button
            type="button"
            className={`inline-flex size-9 shrink-0 items-center justify-center rounded-xl border transition-colors xl:hidden ${
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

          <div className="hidden items-center gap-4 xl:flex">
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
        </nav>

        {open ? (
          <div className="border-t border-accent/15 bg-surface px-4 py-4 xl:hidden">
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
          </div>
        ) : null}
      </div>
    </header>
  );
}
