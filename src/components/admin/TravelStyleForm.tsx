'use client';

import { useState, type FormEvent } from 'react';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import AdminSuccess from '@/components/admin/AdminSuccess';
import FormSection from '@/components/admin/FormSection';
import ImageUrlField from '@/components/admin/ImageUrlField';
import {
  fieldClass,
  PLACEHOLDER_IMAGE,
  slugify,
  textareaClass,
} from '@/components/admin/field-styles';
import Button from '@/components/Button';
import TravelStyleCard from '@/components/TravelStyleCard';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { TravelStyle, TourStyle } from '@/lib/travel-styles';

type StyleDraft = {
  name: string;
  slug: string;
  label: string;
  tagline: string;
  overview: string;
  image: string;
};

function toDraft(style?: TravelStyle): StyleDraft {
  return {
    name: style?.name ?? '',
    slug: style?.slug ?? '',
    label: style?.label ?? '',
    tagline: style?.tagline ?? '',
    overview: style?.overview ?? '',
    image: style?.image ?? '',
  };
}

export default function TravelStyleForm({ initial }: { initial?: TravelStyle }) {
  const [form, setForm] = useState<StyleDraft>(() => toDraft(initial));
  const [slugLocked, setSlugLocked] = useState(Boolean(initial));
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const isEdit = Boolean(initial);

  function update<K extends keyof StyleDraft>(key: K, value: StyleDraft[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleName(value: string) {
    setForm((prev) => ({
      ...prev,
      name: value,
      slug: slugLocked ? prev.slug : slugify(value),
      label: prev.label || `${value} journeys`,
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
        title={isEdit ? 'Travel style updated' : 'Travel style ready'}
        description="This is a design preview — the style is not stored yet."
        backHref="/admin/travel-styles"
        backLabel="Back to travel styles"
        onReset={() => {
          setForm(toDraft());
          setSlugLocked(false);
          setStatus('idle');
        }}
      />
    );
  }

  const preview: TravelStyle = {
    slug: form.slug || 'new-style',
    name: (form.name || 'Valley') as TourStyle,
    label: form.label || 'New journeys',
    tagline: form.tagline || 'A short line for the card.',
    overview: form.overview,
    image: form.image.startsWith('http') ? form.image : PLACEHOLDER_IMAGE,
  };

  return (
    <div>
      <AdminPageHeader
        eyebrow={isEdit ? 'Edit' : 'Create'}
        title={isEdit ? form.label || 'Edit travel style' : 'New travel style'}
        description="Styles group tours — valley, trek, adventure, culture, or a new way of travelling."
      />

      <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-[1fr_18rem]">
        <div className="space-y-6">
          <FormSection title="Identity">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="style-name">Name</Label>
                <Input
                  id="style-name"
                  required
                  value={form.name}
                  onChange={(event) => handleName(event.target.value)}
                  placeholder="Valley"
                  className={fieldClass}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="style-slug">Slug</Label>
                <Input
                  id="style-slug"
                  required
                  value={form.slug}
                  onChange={(event) => {
                    setSlugLocked(true);
                    update('slug', slugify(event.target.value));
                  }}
                  placeholder="valley"
                  className={fieldClass}
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="style-label">Label</Label>
                <Input
                  id="style-label"
                  value={form.label}
                  onChange={(event) => update('label', event.target.value)}
                  placeholder="Valley journeys"
                  className={fieldClass}
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="style-tagline">Tagline</Label>
                <Input
                  id="style-tagline"
                  value={form.tagline}
                  onChange={(event) => update('tagline', event.target.value)}
                  placeholder="Orchard towns, lake shores, and comfortable stays."
                  className={fieldClass}
                />
              </div>
            </div>
          </FormSection>

          <FormSection title="Copy">
            <div className="space-y-2">
              <Label htmlFor="style-overview">Overview</Label>
              <Textarea
                id="style-overview"
                rows={6}
                value={form.overview}
                onChange={(event) => update('overview', event.target.value)}
                placeholder="Who this style is for, and how the days feel."
                className={textareaClass}
              />
            </div>
          </FormSection>

          <FormSection title="Media">
            <ImageUrlField
              id="style-image"
              label="Cover image"
              value={form.image}
              onChange={(value) => update('image', value)}
            />
          </FormSection>

          <div className="flex flex-wrap gap-3">
            <Button type="submit" variant="primary" size="lg" disabled={status === 'saving'}>
              {status === 'saving'
                ? 'Saving…'
                : isEdit
                  ? 'Save travel style'
                  : 'Publish travel style'}
            </Button>
            <Button href="/admin/travel-styles" variant="secondary" size="lg">
              Cancel
            </Button>
          </div>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <p className="mb-3 text-[11px] font-medium tracking-[0.16em] text-accent uppercase">
            Card preview
          </p>
          <TravelStyleCard style={preview} tourCount={0} />
        </aside>
      </form>
    </div>
  );
}
