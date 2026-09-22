'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BookOpen,
  CircleHelp,
  Compass,
  LayoutDashboard,
  Leaf,
  MapPin,
  Menu,
  Mountain,
  X,
} from 'lucide-react';
import { useEffect, useState, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

const nav = [
  { href: '/admin', label: 'Overview', icon: LayoutDashboard },
  { href: '/admin/destinations', label: 'Destinations', icon: MapPin },
  { href: '/admin/tours', label: 'Tours', icon: Compass },
  { href: '/admin/travel-styles', label: 'Travel styles', icon: Mountain },
  { href: '/admin/blogs', label: 'Blogs', icon: BookOpen },
  { href: '/admin/faq', label: 'FAQ', icon: CircleHelp },
] as const;

function isActive(pathname: string, href: string) {
  if (href === '/admin') return pathname === '/admin';
  return pathname === href || pathname.startsWith(`${href}/`);
}

function SidebarNav({
  onNavigate,
}: {
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-1 flex-col gap-1 px-3 py-4">
      {nav.map(({ href, label, icon: Icon }) => {
        const active = isActive(pathname, href);
        return (
          <Link
            key={href}
            href={href}
            onClick={onNavigate}
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
              active
                ? 'bg-highlight text-foreground'
                : 'text-surface/70 hover:bg-white/8 hover:text-surface',
            )}
          >
            <Icon size={16} aria-hidden />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

function SidebarBrand() {
  return (
    <Link href="/admin" className="flex items-center gap-2.5 px-5 py-5">
      <span className="flex size-9 items-center justify-center rounded-xl bg-highlight text-foreground">
        <Leaf size={16} aria-hidden />
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-[15px] font-semibold tracking-[-0.03em] text-surface">
          Mountiva
        </span>
        <span className="mt-0.5 text-[10px] font-medium tracking-[0.16em] text-highlight uppercase">
          Admin studio
        </span>
      </span>
    </Link>
  );
}

export default function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const page = nav.find((item) => isActive(pathname, item.href));

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <div className="flex min-h-screen bg-secondary">
      <aside className="relative hidden w-[17.5rem] shrink-0 flex-col bg-foreground lg:flex">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgb(72_96_82/0.35)_0%,transparent_42%)]"
        />
        <div className="relative z-10 flex h-full flex-col">
          <SidebarBrand />
          <SidebarNav />
          <div className="border-t border-white/10 px-5 py-5">
            <p className="text-xs leading-5 text-surface/50">
              Design preview — content is not saved yet.
            </p>
            <Link
              href="/"
              className="mt-3 inline-flex text-sm font-medium text-highlight underline-offset-4 hover:underline"
            >
              View public site
            </Link>
          </div>
        </div>
      </aside>

      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 bg-foreground/50"
            onClick={() => setOpen(false)}
          />
          <aside className="relative flex h-full w-[17.5rem] flex-col bg-foreground shadow-xl">
            <div className="flex items-center justify-between pr-3">
              <SidebarBrand />
              <button
                type="button"
                aria-label="Close menu"
                className="flex size-9 items-center justify-center rounded-xl text-surface"
                onClick={() => setOpen(false)}
              >
                <X size={18} />
              </button>
            </div>
            <SidebarNav onNavigate={() => setOpen(false)} />
          </aside>
        </div>
      ) : null}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 border-b border-accent/12 bg-surface/90 backdrop-blur-xl">
          <div className="flex h-16 items-center justify-between gap-3 px-4 sm:px-6">
            <div className="flex min-w-0 items-center gap-3">
              <button
                type="button"
                className="flex size-9 items-center justify-center rounded-xl border border-accent/20 text-accent lg:hidden"
                aria-label="Open menu"
                onClick={() => setOpen(true)}
              >
                <Menu size={17} />
              </button>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium tracking-[-0.01em]">
                  {page?.label ?? 'Admin'}
                </p>
                <p className="hidden text-xs text-muted-foreground sm:block">
                  Shape destinations, tours, and stories
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="hidden rounded-full bg-highlight/70 px-2.5 py-1 text-[11px] font-medium tracking-[0.08em] text-foreground uppercase sm:inline">
                Preview
              </span>
              <span className="flex size-9 items-center justify-center rounded-full bg-accent text-xs font-semibold text-surface">
                MJ
              </span>
            </div>
          </div>
        </header>
        <main className="flex-1 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
          <div className="mx-auto max-w-6xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
