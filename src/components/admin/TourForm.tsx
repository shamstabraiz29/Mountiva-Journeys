'use client';

import { Plus, Trash2 } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import AdminSuccess from '@/components/admin/AdminSuccess';
import ChipInput from '@/components/admin/ChipInput';
import FeaturedToggle from '@/components/admin/FeaturedToggle';
import FormSection from '@/components/admin/FormSection';
import ImageUrlField from '@/components/admin/ImageUrlField';
import MonthPicker from '@/components/admin/MonthPicker';
import {
  fieldClass,
  PLACEHOLDER_IMAGE,
  selectClass,
  slugify,
  textareaClass,
} from '@/components/admin/field-styles';
import Button from '@/components/Button';
import TourCard from '@/components/TourCard';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { destinations } from '@/lib/destinations';
import type { Tour, TourDifficulty } from '@/lib/tours';
import { tourStyles, type TourStyle } from '@/lib/travel-styles';
import { cn } from '@/lib/utils';

type ItineraryDay = { day: number; title: string; detail: string };

type TourDraft = {
  id: string;
  name: string;
  destination: string;
  destinationSlug: string;
  region: string;
  days: string;
  priceFrom: string;
  difficulty: TourDifficulty;
  styles: TourStyle[];
  groupSize: string;
  bestMonths: string[];
  highlights: string[];
  summary: string;
  overview: string;
  includes: string[];
  excludes: string[];
  itinerary: ItineraryDay[];
  image: string;
  featured: boolean;
};

function emptyDay(day: number): ItineraryDay {
  return { day, title: '', detail: '' };
}

function toDraft(tour?: Tour): TourDraft {
  return {
    id: tour?.id ?? '',
    name: tour?.name ?? '',
    destination: tour?.destination ?? '',
    destinationSlug: tour?.destinationSlug ?? '',
    region: tour?.region ?? 'Gilgit-Baltistan',
    days: tour ? String(tour.days) : '7',
    priceFrom: tour ? String(tour.priceFrom) : '',
    difficulty: tour?.difficulty ?? 'Easy',
    styles: tour?.styles ?? [],
    groupSize: tour?.groupSize ?? '2–12',
    bestMonths: tour?.bestMonths ?? [],
    highlights: tour?.highlights ?? [],
    summary: tour?.summary ?? '',
    overview: tour?.overview ?? '',
    includes: tour?.includes ?? [],
    excludes: tour?.excludes ?? [],
    itinerary: tour?.itinerary.length ? tour.itinerary : [emptyDay(1)],
    image: tour?.image ?? '',
    featured: tour?.featured ?? false,
  };
}

export default function TourForm({ initial }: { initial?: Tour }) {
  const [form, setForm] = useState<TourDraft>(() => toDraft(initial));
  const [idLocked, setIdLocked] = useState(Boolean(initial));
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const isEdit = Boolean(initial);

  function update<K extends keyof TourDraft>(key: K, value: TourDraft[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleName(value: string) {
    setForm((prev) => ({
      ...prev,
      name: value,
      id: idLocked ? prev.id : slugify(value),
    }));
  }

  function handleDestination(name: string) {
    const match = destinations.find((item) => item.name === name);
    setForm((prev) => ({
      ...prev,
      destination: name,
      destinationSlug: match?.slug ?? slugify(name),
      region: match?.region ?? prev.region,
    }));
  }

  function toggleStyle(style: TourStyle) {
    update(
      'styles',
      form.styles.includes(style)
        ? form.styles.filter((item) => item !== style)
        : [...form.styles, style],
    );
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setStatus('saving');
    window.setTimeout(() => setStatus('saved'), 450);
  }

  if (status === 'saved') {
    return (
      <AdminSuccess
        title={isEdit ? 'Tour updated' : 'Tour ready'}
        description="This is a design preview — the tour is not stored yet. Connect this form when you add persistence."
        backHref="/admin/tours"
        backLabel="Back to tours"
        onReset={() => {
          setForm(toDraft());
          setIdLocked(false);
          setStatus('idle');
        }}
      />
    );
  }

  const preview: Tour = {
    id: form.id || 'new-tour',
    name: form.name || 'Untitled tour',
    destination: form.destination || 'Gilgit-Baltistan',
    destinationSlug: form.destinationSlug || 'gilgit',
    region: form.region,
    days: Number(form.days) || 7,
    priceFrom: Number(form.priceFrom) || 0,
    difficulty: form.difficulty,
    styles: form.styles.length ? form.styles : ['Valley'],
    groupSize: form.groupSize || '2–12',
    bestMonths: form.bestMonths,
    highlights: form.highlights,
    summary: form.summary || 'A paced journey through the north.',
    overview: form.overview,
    includes: form.includes,
    excludes: form.excludes,
    itinerary: form.itinerary,
    image: form.image.startsWith('http') ? form.image : PLACEHOLDER_IMAGE,
    featured: form.featured,
  };

  return (
    <div>
      <AdminPageHeader
        eyebrow={isEdit ? 'Edit' : 'Create'}
        title={isEdit ? form.name || 'Edit tour' : 'New tour'}
        description="Package identity, pacing, inclusions, and the day-by-day itinerary shown on the tour page."
      />

      <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-[1fr_18rem]">
        <div className="space-y-6">
          <FormSection title="Identity">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="tour-name">Tour name</Label>
                <Input
                  id="tour-name"
                  required
                  value={form.name}
                  onChange={(event) => handleName(event.target.value)}
                  placeholder="Hunza Explorer"
                  className={fieldClass}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tour-id">ID</Label>
                <Input
                  id="tour-id"
                  required
                  value={form.id}
                  onChange={(event) => {
                    setIdLocked(true);
                    update('id', slugify(event.target.value));
                  }}
                  placeholder="hunza-explorer"
                  className={fieldClass}
                />
              </div>
              <div className="space-y-2">
                <Label>Destination</Label>
                <Select
                  value={form.destination || undefined}
                  onValueChange={(value) => handleDestination(value ?? '')}
                >
                  <SelectTrigger className={selectClass}>
                    <SelectValue placeholder="Choose a destination" />
                  </SelectTrigger>
                  <SelectContent>
                    {destinations.map((destination) => (
                      <SelectItem key={destination.slug} value={destination.name}>
                        {destination.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="tour-region">Region</Label>
                <Input
                  id="tour-region"
                  value={form.region}
                  onChange={(event) => update('region', event.target.value)}
                  className={fieldClass}
                />
              </div>
              <div className="flex items-end">
                <FeaturedToggle
                  checked={form.featured}
                  onChange={(value) => update('featured', value)}
                />
              </div>
            </div>
          </FormSection>

          <FormSection title="Specs">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="tour-days">Days</Label>
                <Input
                  id="tour-days"
                  inputMode="numeric"
                  value={form.days}
                  onChange={(event) => update('days', event.target.value)}
                  className={fieldClass}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tour-price">Price from (PKR)</Label>
                <Input
                  id="tour-price"
                  inputMode="numeric"
                  value={form.priceFrom}
                  onChange={(event) => update('priceFrom', event.target.value)}
                  placeholder="89000"
                  className={fieldClass}
                />
              </div>
              <div className="space-y-2">
                <Label>Difficulty</Label>
                <Select
                  value={form.difficulty}
                  onValueChange={(value) =>
                    update('difficulty', (value as TourDifficulty) ?? 'Easy')
                  }
                >
                  <SelectTrigger className={selectClass}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {(['Easy', 'Moderate', 'Challenging'] as const).map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="tour-group">Group size</Label>
                <Input
                  id="tour-group"
                  value={form.groupSize}
                  onChange={(event) => update('groupSize', event.target.value)}
                  placeholder="2–12"
                  className={fieldClass}
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label>Travel styles</Label>
                <div className="flex flex-wrap gap-2">
                  {tourStyles.map((style) => {
                    const active = form.styles.includes(style);
                    return (
                      <button
                        key={style}
                        type="button"
                        onClick={() => toggleStyle(style)}
                        className={cn(
                          'rounded-full border px-3 py-1.5 text-xs font-medium transition-colors',
                          active
                            ? 'border-accent bg-accent text-surface'
                            : 'border-accent/15 bg-background text-foreground/70 hover:border-accent/35',
                        )}
                      >
                        {style}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </FormSection>

          <FormSection title="Copy">
            <div className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="tour-summary">Summary</Label>
                <Input
                  id="tour-summary"
                  value={form.summary}
                  onChange={(event) => update('summary', event.target.value)}
                  placeholder="A paced valley journey through orchards and viewpoints."
                  className={fieldClass}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tour-overview">Overview</Label>
                <Textarea
                  id="tour-overview"
                  rows={5}
                  value={form.overview}
                  onChange={(event) => update('overview', event.target.value)}
                  className={textareaClass}
                />
              </div>
            </div>
          </FormSection>

          <FormSection title="Media">
            <ImageUrlField
              id="tour-image"
              label="Cover image"
              value={form.image}
              onChange={(value) => update('image', value)}
            />
          </FormSection>

          <FormSection title="Inclusions">
            <div className="grid gap-5 sm:grid-cols-2">
              <ChipInput
                id="tour-includes"
                label="Includes"
                values={form.includes}
                onChange={(values) => update('includes', values)}
                placeholder="Private transport"
              />
              <ChipInput
                id="tour-excludes"
                label="Excludes"
                values={form.excludes}
                onChange={(values) => update('excludes', values)}
                placeholder="Flights"
              />
            </div>
            <div className="mt-5">
              <ChipInput
                id="tour-highlights"
                label="Highlights"
                values={form.highlights}
                onChange={(values) => update('highlights', values)}
                placeholder="Attabad Lake"
              />
            </div>
            <div className="mt-5">
              <MonthPicker
                values={form.bestMonths}
                onChange={(values) => update('bestMonths', values)}
              />
            </div>
          </FormSection>

          <FormSection
            title="Itinerary"
            description="One card per day — title and a short detail line."
          >
            <div className="space-y-3">
              {form.itinerary.map((item, index) => (
                <div
                  key={index}
                  className="grid gap-3 rounded-md border border-accent/10 p-3 sm:grid-cols-[3rem_1fr_auto]"
                >
                  <div className="flex h-12 items-center justify-center rounded-md bg-muted text-sm font-medium text-accent">
                    {item.day}
                  </div>
                  <div className="grid gap-3">
                    <Input
                      value={item.title}
                      onChange={(event) => {
                        const next = [...form.itinerary];
                        next[index] = { ...item, title: event.target.value };
                        update('itinerary', next);
                      }}
                      placeholder="Arrive Gilgit / drive to Hunza"
                      className={fieldClass}
                    />
                    <Textarea
                      value={item.detail}
                      onChange={(event) => {
                        const next = [...form.itinerary];
                        next[index] = { ...item, detail: event.target.value };
                        update('itinerary', next);
                      }}
                      placeholder="Meet your host and ease into valley views."
                      className={`${textareaClass} min-h-20`}
                    />
                  </div>
                  <button
                    type="button"
                    aria-label="Remove day"
                    className="flex size-10 items-center justify-center rounded-md text-foreground/40 hover:bg-muted hover:text-[#8f3d3d]"
                    onClick={() =>
                      update(
                        'itinerary',
                        form.itinerary
                          .filter((_, i) => i !== index)
                          .map((day, i) => ({ ...day, day: i + 1 })),
                      )
                    }
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() =>
                update('itinerary', [
                  ...form.itinerary,
                  emptyDay(form.itinerary.length + 1),
                ])
              }
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent"
            >
              <Plus size={15} />
              Add day
            </button>
          </FormSection>

          <div className="flex flex-wrap gap-3">
            <Button type="submit" variant="primary" size="lg" disabled={status === 'saving'}>
              {status === 'saving' ? 'Saving…' : isEdit ? 'Save tour' : 'Publish tour'}
            </Button>
            <Button href="/admin/tours" variant="secondary" size="lg">
              Cancel
            </Button>
          </div>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <p className="mb-3 text-[11px] font-medium tracking-[0.16em] text-accent uppercase">
            Card preview
          </p>
          <TourCard tour={preview} href="#" />
        </aside>
      </form>
    </div>
  );
}
