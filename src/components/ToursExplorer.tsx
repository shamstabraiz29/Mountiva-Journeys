'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState, useTransition } from 'react';
import { MapPin, Search, X } from 'lucide-react';
import TourCard from '@/components/TourCard';
import Button from '@/components/Button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  durationFilters,
  filterTours,
  getFeaturedTours,
  sortOptions,
  tourStyles,
  uniqueDestinations,
  type DurationFilter,
  type SortOption,
  type TourFilters,
} from '@/lib/tours';
import { cn } from '@/lib/utils';

const months = [
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
] as const;

type ToursExplorerProps = {
  initialFilters: TourFilters;
};

function buildParams(filters: TourFilters) {
  const params = new URLSearchParams();
  if (filters.q?.trim()) params.set('q', filters.q.trim());
  if (filters.destination && filters.destination !== 'any') {
    params.set('destination', filters.destination);
  }
  if (filters.month && filters.month !== 'any')
    params.set('month', filters.month);
  if (filters.travelers) params.set('travelers', filters.travelers);
  if (filters.duration && filters.duration !== 'any') {
    params.set('duration', filters.duration);
  }
  if (filters.style && filters.style !== 'any')
    params.set('style', filters.style);
  if (filters.sort && filters.sort !== 'recommended')
    params.set('sort', filters.sort);
  return params;
}

function travelersLabel(value?: string) {
  if (!value) return null;
  if (value === '6+') return '6+ travellers';
  if (value === '1') return '1 traveller';
  return `${value} travellers`;
}

export default function ToursExplorer({ initialFilters }: ToursExplorerProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [filters, setFilters] = useState<TourFilters>(initialFilters);
  const [searchDraft, setSearchDraft] = useState(initialFilters.q ?? '');
  const filtersRef = useRef(filters);
  filtersRef.current = filters;

  const initialKey = [
    initialFilters.q ?? '',
    initialFilters.destination ?? 'any',
    initialFilters.month ?? 'any',
    initialFilters.travelers ?? '',
    initialFilters.duration ?? 'any',
    initialFilters.style ?? 'any',
    initialFilters.sort ?? 'recommended',
  ].join('|');

  useEffect(() => {
    setFilters(initialFilters);
    setSearchDraft(initialFilters.q ?? '');
    // Sync when URL-driven props change (home search, chips, shared links).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialKey]);

  function applyFilters(next: TourFilters) {
    setFilters(next);
    const params = buildParams(next);
    startTransition(() => {
      router.replace(
        params.toString() ? `/tour?${params.toString()}` : '/tour',
        {
          scroll: false,
        },
      );
    });
  }

  useEffect(() => {
    const handle = window.setTimeout(() => {
      if ((filtersRef.current.q ?? '') === searchDraft) return;
      applyFilters({ ...filtersRef.current, q: searchDraft });
    }, 280);
    return () => window.clearTimeout(handle);
    // Intentionally only re-run when the search draft changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchDraft]);

  const results = useMemo(() => filterTours(filters), [filters]);
  const destinations = useMemo(() => uniqueDestinations(), []);
  const suggestions = useMemo(() => getFeaturedTours(3), []);

  function updateFilters(patch: Partial<TourFilters>) {
    applyFilters({ ...filtersRef.current, ...patch });
  }

  function clearFilters() {
    setSearchDraft('');
    applyFilters({
      q: '',
      destination: 'any',
      month: 'any',
      duration: 'any',
      style: 'any',
      sort: 'recommended',
      travelers: filtersRef.current.travelers,
    });
  }

  function removeChip(key: string) {
    if (key === 'q') {
      setSearchDraft('');
      updateFilters({ q: '' });
    }
    if (key === 'destination') updateFilters({ destination: 'any' });
    if (key === 'month') updateFilters({ month: 'any' });
    if (key === 'duration') updateFilters({ duration: 'any' });
    if (key === 'style') updateFilters({ style: 'any' });
  }

  const activeChips = [
    filters.q?.trim() ? { key: 'q', label: `“${filters.q.trim()}”` } : null,
    filters.destination && filters.destination !== 'any'
      ? { key: 'destination', label: filters.destination }
      : null,
    filters.month && filters.month !== 'any'
      ? { key: 'month', label: filters.month }
      : null,
    filters.duration && filters.duration !== 'any'
      ? {
          key: 'duration',
          label:
            durationFilters.find((item) => item.value === filters.duration)
              ?.label ?? filters.duration,
        }
      : null,
    filters.style && filters.style !== 'any'
      ? { key: 'style', label: filters.style }
      : null,
  ].filter(Boolean) as { key: string; label: string }[];

  const hasActiveFilters = activeChips.length > 0;
  const travelersNote = travelersLabel(filters.travelers);
  const activeStyle =
    filters.style && filters.style !== 'any' ? filters.style : null;

  return (
    <div className={cn('pb-4', isPending && 'opacity-90 transition-opacity')}>
      <section
        id="browse"
        className="scroll-mt-28 bg-surface"
      >
        <div id="filters" className="mx-auto max-w-7xl scroll-mt-28 space-y-4 px-5 py-8 sm:px-6 sm:py-10">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] font-medium tracking-[0.16em] text-accent uppercase">
                Browse
              </p>
              <h2 className="mt-1 text-2xl font-medium tracking-[-0.03em] sm:text-3xl">
                {filters.q?.trim() ? `“${filters.q.trim()}”` : 'All tours'}
              </h2>
            </div>
            <p className="text-sm text-foreground/70">
              <span className="font-medium text-foreground">
                {results.length}
              </span>
              {` tour${results.length === 1 ? '' : 's'} available`}
              {travelersNote ? ` · ${travelersNote}` : ''}
            </p>
          </div>

          <div className="relative">
            <Search
              size={16}
              className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
            <Input
              value={searchDraft}
              onChange={(event) => setSearchDraft(event.target.value)}
              placeholder="Search destination or tour name"
              className="h-12 rounded-md border-accent/15 bg-surface pl-11 text-sm shadow-none"
              aria-label="Search tours"
            />
          </div>

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div
              className="flex gap-2 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              role="group"
              aria-label="Tour style"
            >
              <StyleChip
                label="All"
                active={!activeStyle}
                onClick={() => updateFilters({ style: 'any' })}
              />
              {tourStyles.map((style) => (
                <StyleChip
                  key={style}
                  label={style}
                  active={activeStyle === style}
                  onClick={() =>
                    updateFilters({
                      style: activeStyle === style ? 'any' : style,
                    })
                  }
                />
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <CompactSelect
                label="Destination"
                value={filters.destination ?? 'any'}
                onChange={(value) => updateFilters({ destination: value })}
                options={[
                  { value: 'any', label: 'Destination' },
                  ...destinations.map((place) => ({
                    value: place,
                    label: place,
                  })),
                ]}
                active={Boolean(
                  filters.destination && filters.destination !== 'any',
                )}
              />
              <CompactSelect
                label="Length"
                value={filters.duration ?? 'any'}
                onChange={(value) =>
                  updateFilters({ duration: value as DurationFilter })
                }
                options={durationFilters.map((item) => ({
                  value: item.value,
                  label: item.value === 'any' ? 'Length' : item.label,
                }))}
                active={Boolean(filters.duration && filters.duration !== 'any')}
              />
              <CompactSelect
                label="Month"
                value={filters.month ?? 'any'}
                onChange={(value) => updateFilters({ month: value })}
                options={[
                  { value: 'any', label: 'Month' },
                  ...months.map((month) => ({ value: month, label: month })),
                ]}
                active={Boolean(filters.month && filters.month !== 'any')}
              />
              <CompactSelect
                label="Sort"
                value={filters.sort ?? 'recommended'}
                onChange={(value) =>
                  updateFilters({ sort: value as SortOption })
                }
                options={sortOptions.map((item) => ({
                  value: item.value,
                  label: item.label,
                }))}
              />
            </div>
          </div>

          {hasActiveFilters ? (
            <div className="flex flex-wrap items-center gap-2 border-t border-accent/10 pt-4">
              {activeChips.map((chip) => (
                <button
                  key={chip.key}
                  type="button"
                  onClick={() => removeChip(chip.key)}
                  className="inline-flex cursor-pointer items-center gap-1.5 rounded-md bg-accent/10 px-2.5 py-1.5 text-[13px] font-medium text-accent transition-colors hover:bg-accent/15"
                >
                  {chip.label}
                  <X size={12} aria-hidden />
                </button>
              ))}
              <button
                type="button"
                onClick={clearFilters}
                className="cursor-pointer px-1.5 text-[13px] font-medium text-muted-foreground underline-offset-4 hover:text-accent hover:underline"
              >
                Clear all
              </button>
            </div>
          ) : null}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-6 sm:py-12">
        {results.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3">
            {results.map((tour, index) => (
              <TourCard key={tour.id} tour={tour} priority={index < 3} />
            ))}
          </div>
        ) : (
          <div className="space-y-14">
            <div className="grid gap-8 border-y border-accent/15 py-12 lg:grid-cols-[auto_minmax(0,1fr)] lg:items-center lg:gap-12">
              <div className="flex size-16 items-center justify-center rounded-md border border-accent/20 bg-surface text-accent">
                <MapPin size={26} aria-hidden />
              </div>
              <div>
                <h2 className="text-2xl font-medium tracking-[-0.03em] sm:text-3xl">
                  No tours match these filters
                </h2>
                <p className="mt-3 max-w-lg text-sm leading-6 text-muted-foreground">
                  Try a broader destination, another month, or clear filters to
                  see the full Gilgit-Baltistan collection.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button
                    type="button"
                    onClick={clearFilters}
                    variant="primary"
                  >
                    Clear filters
                  </Button>
                  <Button href="/contact-us" variant="secondary">
                    Plan a custom trip
                  </Button>
                </div>
              </div>
            </div>

            <div>
              <p className="text-[11px] font-medium tracking-[0.14em] text-accent uppercase">
                Suggestions
              </p>
              <h3 className="mt-2 text-2xl font-medium tracking-[-0.03em]">
                Travellers also consider
              </h3>
              <div className="mt-6 grid gap-5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3">
                {suggestions.map((tour) => (
                  <TourCard key={tour.id} tour={tour} />
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-14 sm:px-6 sm:pb-16">
        <div className="grid gap-8 border-t border-accent/20 pt-10 md:grid-cols-[minmax(0,1.4fr)_auto] md:items-end md:gap-12">
          <div>
            <p className="text-[11px] font-medium tracking-[0.16em] text-accent uppercase">
              Custom planning
            </p>
            <h2 className="mt-3 text-3xl font-medium tracking-[-0.03em] sm:text-4xl">
              Prefer a route built around you?
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground sm:text-[15px]">
              Tell us your dates, pace, and must-sees — we&apos;ll shape a
              private Gilgit-Baltistan itinerary with local stays and guides.
            </p>
          </div>
          <Button href="/contact-us" variant="primary" size="lg">
            Plan a custom trip
          </Button>
        </div>
      </section>
    </div>
  );
}

function StyleChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'shrink-0 cursor-pointer rounded-md border px-3.5 py-2 text-sm font-medium transition-colors',
        active
          ? 'border-accent bg-accent text-surface'
          : 'border-accent/15 bg-surface text-foreground/75 hover:border-accent/35 hover:text-foreground',
      )}
    >
      {label}
    </button>
  );
}

function CompactSelect({
  label,
  value,
  onChange,
  options,
  active,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  active?: boolean;
}) {
  const selectedLabel =
    options.find((option) => option.value === value)?.label ?? label;

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger
        aria-label={label}
        className={cn(
          'h-10 w-auto min-w-[7.5rem] cursor-pointer rounded-md border-accent/15 bg-surface px-3 text-sm shadow-none',
          active && 'border-accent/40 bg-accent/5 text-accent',
        )}
      >
        <SelectValue placeholder={label}>{selectedLabel}</SelectValue>
      </SelectTrigger>
      <SelectContent position="popper" align="start" className="rounded-md">
        {options.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            className="cursor-pointer rounded-sm"
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
