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
  slugify,
  textareaClass,
} from '@/components/admin/field-styles';
import Button from '@/components/Button';
import DestinationCard from '@/components/DestinationCard';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { Destination, DestinationGalleryItem } from '@/lib/destinations';

type DestinationDraft = {
  name: string;
  slug: string;
  region: string;
  note: string;
  overview: string;
  image: string;
  query: string;
  featured: boolean;
  lat: string;
  lng: string;
  mapDelta: string;
  highlights: string[];
  bestMonths: string[];
  gallery: DestinationGalleryItem[];
};

function emptyGalleryItem(): DestinationGalleryItem {
  return { src: '', alt: '', caption: '' };
}

function toDraft(destination?: Destination): DestinationDraft {
  return {
    name: destination?.name ?? '',
    slug: destination?.slug ?? '',
    region: destination?.region ?? 'Gilgit-Baltistan',
    note: destination?.note ?? '',
    overview: destination?.overview ?? '',
    image: destination?.image ?? '',
    query: destination?.query ?? '',
    featured: destination?.featured ?? false,
    lat: destination ? String(destination.coordinates.lat) : '',
    lng: destination ? String(destination.coordinates.lng) : '',
    mapDelta: destination ? String(destination.mapDelta) : '0.25',
    highlights: destination?.highlights ?? [],
    bestMonths: destination?.bestMonths ?? [],
    gallery: destination?.gallery.length
      ? destination.gallery
      : [emptyGalleryItem()],
  };
}

export default function DestinationForm({
  initial,
}: {
  initial?: Destination;
}) {
  const [form, setForm] = useState<DestinationDraft>(() => toDraft(initial));
  const [slugLocked, setSlugLocked] = useState(Boolean(initial));
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const isEdit = Boolean(initial);

  function update<K extends keyof DestinationDraft>(
    key: K,
    value: DestinationDraft[K],
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleName(value: string) {
    setForm((prev) => ({
      ...prev,
      name: value,
      slug: slugLocked ? prev.slug : slugify(value),
      query: prev.query || value,
    }));
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setStatus('saving');
    window.setTimeout(() => setStatus('saved'), 450);
  }

  if (status === 'saved') {
    return (
      <AdminSuccess
        title={isEdit ? 'Destination updated' : 'Destination ready'}
        description="This is a design preview — the destination is not stored yet. Wire this form to your CMS or API when you are ready."
        backHref="/admin/destinations"
        backLabel="Back to destinations"
        onReset={() => {
          setForm(toDraft());
          setSlugLocked(false);
          setStatus('idle');
        }}
      />
    );
  }

  const preview: Destination = {
    slug: form.slug || 'new-destination',
    name: form.name || 'Untitled destination',
    region: form.region || 'Gilgit-Baltistan',
    note: form.note || 'A short note for the card.',
    overview: form.overview,
    image: form.image.startsWith('http') ? form.image : PLACEHOLDER_IMAGE,
    query: form.query || form.name,
    featured: form.featured,
    coordinates: {
      lat: Number(form.lat) || 35.9,
      lng: Number(form.lng) || 74.3,
    },
    mapDelta: Number(form.mapDelta) || 0.25,
    highlights: form.highlights,
    bestMonths: form.bestMonths,
    gallery: form.gallery,
  };

  return (
    <div>
      <AdminPageHeader
        eyebrow={isEdit ? 'Edit' : 'Create'}
        title={isEdit ? form.name || 'Edit destination' : 'New destination'}
        description="Name the place, write the overview, and add map and gallery details used on the public destination page."
      />

      <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-[1fr_18rem]">
        <div className="space-y-6">
          <FormSection
            title="Identity"
            description="How the destination appears in lists, search, and URLs."
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="dest-name">Name</Label>
                <Input
                  id="dest-name"
                  required
                  value={form.name}
                  onChange={(event) => handleName(event.target.value)}
                  placeholder="Hunza Valley"
                  className={fieldClass}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dest-slug">Slug</Label>
                <Input
                  id="dest-slug"
                  required
                  value={form.slug}
                  onChange={(event) => {
                    setSlugLocked(true);
                    update('slug', slugify(event.target.value));
                  }}
                  placeholder="hunza-valley"
                  className={fieldClass}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dest-region">Region</Label>
                <Input
                  id="dest-region"
                  value={form.region}
                  onChange={(event) => update('region', event.target.value)}
                  placeholder="Gilgit-Baltistan"
                  className={fieldClass}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dest-query">Search query</Label>
                <Input
                  id="dest-query"
                  value={form.query}
                  onChange={(event) => update('query', event.target.value)}
                  placeholder="Hunza"
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

          <FormSection
            title="Copy"
            description="Short card note and the longer overview on the destination page."
          >
            <div className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="dest-note">Card note</Label>
                <Input
                  id="dest-note"
                  value={form.note}
                  onChange={(event) => update('note', event.target.value)}
                  placeholder="Rakaposhi views, apricot orchards, and Passu cones."
                  className={fieldClass}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dest-overview">Overview</Label>
                <Textarea
                  id="dest-overview"
                  rows={6}
                  value={form.overview}
                  onChange={(event) => update('overview', event.target.value)}
                  placeholder="Describe the place, how journeys usually start, and what days feel like."
                  className={textareaClass}
                />
              </div>
            </div>
          </FormSection>

          <FormSection title="Media">
            <ImageUrlField
              id="dest-image"
              label="Cover image"
              value={form.image}
              onChange={(value) => update('image', value)}
            />
            <div className="mt-6 space-y-3">
              <div className="flex items-center justify-between">
                <Label>Gallery</Label>
                <button
                  type="button"
                  onClick={() =>
                    update('gallery', [...form.gallery, emptyGalleryItem()])
                  }
                  className="inline-flex items-center gap-1 text-xs font-medium text-accent"
                >
                  <Plus size={13} />
                  Add image
                </button>
              </div>
              <div className="space-y-3">
                {form.gallery.map((item, index) => (
                  <div
                    key={index}
                    className="grid gap-3 rounded-md border border-accent/10 p-3 sm:grid-cols-[1fr_auto]"
                  >
                    <div className="grid gap-3 sm:grid-cols-2">
                      <Input
                        value={item.src}
                        onChange={(event) => {
                          const next = [...form.gallery];
                          next[index] = { ...item, src: event.target.value };
                          update('gallery', next);
                        }}
                        placeholder="Image URL"
                        className={fieldClass}
                      />
                      <Input
                        value={item.caption}
                        onChange={(event) => {
                          const next = [...form.gallery];
                          next[index] = { ...item, caption: event.target.value };
                          update('gallery', next);
                        }}
                        placeholder="Caption"
                        className={fieldClass}
                      />
                      <Input
                        value={item.alt}
                        onChange={(event) => {
                          const next = [...form.gallery];
                          next[index] = { ...item, alt: event.target.value };
                          update('gallery', next);
                        }}
                        placeholder="Alt text"
                        className={`${fieldClass} sm:col-span-2`}
                      />
                    </div>
                    <button
                      type="button"
                      aria-label="Remove gallery image"
                      className="flex size-10 items-center justify-center rounded-md text-foreground/40 hover:bg-muted hover:text-[#8f3d3d]"
                      onClick={() =>
                        update(
                          'gallery',
                          form.gallery.filter((_, i) => i !== index),
                        )
                      }
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </FormSection>

          <FormSection
            title="Map & details"
            description="Coordinates power the destination map. Highlights and months appear on the page."
          >
            <div className="grid gap-5 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="dest-lat">Latitude</Label>
                <Input
                  id="dest-lat"
                  value={form.lat}
                  onChange={(event) => update('lat', event.target.value)}
                  placeholder="36.3167"
                  className={fieldClass}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dest-lng">Longitude</Label>
                <Input
                  id="dest-lng"
                  value={form.lng}
                  onChange={(event) => update('lng', event.target.value)}
                  placeholder="74.65"
                  className={fieldClass}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dest-delta">Map delta</Label>
                <Input
                  id="dest-delta"
                  value={form.mapDelta}
                  onChange={(event) => update('mapDelta', event.target.value)}
                  placeholder="0.35"
                  className={fieldClass}
                />
              </div>
            </div>
            <div className="mt-5 space-y-5">
              <ChipInput
                id="dest-highlights"
                label="Highlights"
                values={form.highlights}
                onChange={(values) => update('highlights', values)}
                placeholder="Karimabad & Baltit"
              />
              <MonthPicker
                values={form.bestMonths}
                onChange={(values) => update('bestMonths', values)}
              />
            </div>
          </FormSection>

          <div className="flex flex-wrap gap-3">
            <Button type="submit" variant="primary" size="lg" disabled={status === 'saving'}>
              {status === 'saving'
                ? 'Saving…'
                : isEdit
                  ? 'Save destination'
                  : 'Publish destination'}
            </Button>
            <Button href="/admin/destinations" variant="secondary" size="lg">
              Cancel
            </Button>
          </div>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <p className="mb-3 text-[11px] font-medium tracking-[0.16em] text-accent uppercase">
            Card preview
          </p>
          <DestinationCard destination={preview} href="#" />
        </aside>
      </form>
    </div>
  );
}
