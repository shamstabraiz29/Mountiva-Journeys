'use client';

import { Plus, Trash2 } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import AdminSuccess from '@/components/admin/AdminSuccess';
import ChipInput from '@/components/admin/ChipInput';
import FeaturedToggle from '@/components/admin/FeaturedToggle';
import FormSection from '@/components/admin/FormSection';
import ImageUrlField from '@/components/admin/ImageUrlField';
import {
  fieldClass,
  PLACEHOLDER_IMAGE,
  selectClass,
  slugify,
  textareaClass,
} from '@/components/admin/field-styles';
import Button from '@/components/Button';
import BlogCard from '@/components/BlogCard';
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
import {
  blogCategories,
  type BlogCategory,
  type BlogPost,
  type BlogSection,
} from '@/lib/blogs';
import { destinations } from '@/lib/destinations';

type BlogDraft = {
  title: string;
  slug: string;
  heroLabel: string;
  excerpt: string;
  category: BlogCategory | '';
  destination: string;
  author: string;
  publishedAt: string;
  readMinutes: string;
  image: string;
  takeaways: string[];
  sections: BlogSection[];
  featured: boolean;
};

function emptySection(): BlogSection {
  return { heading: '', paragraphs: [''] };
}

function toDraft(post?: BlogPost): BlogDraft {
  return {
    title: post?.title ?? '',
    slug: post?.slug ?? '',
    heroLabel: post?.heroLabel ?? '',
    excerpt: post?.excerpt ?? '',
    category: post?.category ?? '',
    destination: post?.destination ?? '',
    author: post?.author ?? 'Mountiva Field Desk',
    publishedAt: post?.publishedAt ?? new Date().toISOString().slice(0, 10),
    readMinutes: post ? String(post.readMinutes) : '6',
    image: post?.image ?? '',
    takeaways: post?.takeaways ?? [],
    sections: post?.sections.length ? post.sections : [emptySection()],
    featured: post?.featured ?? false,
  };
}

export default function BlogForm({ initial }: { initial?: BlogPost }) {
  const [form, setForm] = useState<BlogDraft>(() => toDraft(initial));
  const [slugLocked, setSlugLocked] = useState(Boolean(initial));
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const isEdit = Boolean(initial);

  function update<K extends keyof BlogDraft>(key: K, value: BlogDraft[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleTitle(value: string) {
    setForm((prev) => ({
      ...prev,
      title: value,
      slug: slugLocked ? prev.slug : slugify(value),
      heroLabel: prev.heroLabel || value.split(' ')[0] || '',
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
        title={isEdit ? 'Story updated' : 'Story ready'}
        description="This is a design preview — the post is not stored yet."
        backHref="/admin/blogs"
        backLabel="Back to blogs"
        onReset={() => {
          setForm(toDraft());
          setSlugLocked(false);
          setStatus('idle');
        }}
      />
    );
  }

  const preview: BlogPost = {
    slug: form.slug || 'new-story',
    title: form.title || 'Untitled story',
    heroLabel: form.heroLabel || 'Story',
    excerpt: form.excerpt || 'A short excerpt for the listing card.',
    category: form.category || 'Field notes',
    destination: form.destination || undefined,
    author: form.author,
    publishedAt: form.publishedAt,
    readMinutes: Number(form.readMinutes) || 5,
    image: form.image.startsWith('http') ? form.image : PLACEHOLDER_IMAGE,
    takeaways: form.takeaways,
    sections: form.sections,
    featured: form.featured,
  };

  return (
    <div>
      <AdminPageHeader
        eyebrow={isEdit ? 'Edit' : 'Create'}
        title={isEdit ? 'Edit story' : 'New story'}
        description="Field notes, season guides, and destination pieces for the journal."
      />

      <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-[1fr_20rem]">
        <div className="space-y-6">
          <FormSection title="Identity">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="blog-title">Title</Label>
                <Input
                  id="blog-title"
                  required
                  value={form.title}
                  onChange={(event) => handleTitle(event.target.value)}
                  placeholder="When to visit Hunza"
                  className={fieldClass}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="blog-slug">Slug</Label>
                <Input
                  id="blog-slug"
                  required
                  value={form.slug}
                  onChange={(event) => {
                    setSlugLocked(true);
                    update('slug', slugify(event.target.value));
                  }}
                  className={fieldClass}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="blog-hero">Hero label</Label>
                <Input
                  id="blog-hero"
                  value={form.heroLabel}
                  onChange={(event) => update('heroLabel', event.target.value)}
                  placeholder="Hunza"
                  className={fieldClass}
                />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Select
                  value={form.category || undefined}
                  onValueChange={(value) =>
                    update('category', (value as BlogCategory) ?? '')
                  }
                >
                  <SelectTrigger className={selectClass}>
                    <SelectValue placeholder="Choose a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {blogCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Related destination</Label>
                <Select
                  value={form.destination || undefined}
                  onValueChange={(value) => update('destination', value ?? '')}
                >
                  <SelectTrigger className={selectClass}>
                    <SelectValue placeholder="Optional" />
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
                <Label htmlFor="blog-author">Author</Label>
                <Input
                  id="blog-author"
                  value={form.author}
                  onChange={(event) => update('author', event.target.value)}
                  className={fieldClass}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="blog-date">Published</Label>
                <Input
                  id="blog-date"
                  type="date"
                  value={form.publishedAt}
                  onChange={(event) => update('publishedAt', event.target.value)}
                  className={fieldClass}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="blog-read">Read time (minutes)</Label>
                <Input
                  id="blog-read"
                  inputMode="numeric"
                  value={form.readMinutes}
                  onChange={(event) => update('readMinutes', event.target.value)}
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

          <FormSection title="Excerpt">
            <div className="space-y-2">
              <Label htmlFor="blog-excerpt">Short excerpt</Label>
              <Textarea
                id="blog-excerpt"
                rows={4}
                value={form.excerpt}
                onChange={(event) => update('excerpt', event.target.value)}
                className={textareaClass}
              />
            </div>
          </FormSection>

          <FormSection title="Media">
            <ImageUrlField
              id="blog-image"
              label="Cover image"
              value={form.image}
              onChange={(value) => update('image', value)}
            />
          </FormSection>

          <FormSection title="Takeaways">
            <ChipInput
              id="blog-takeaways"
              label="Key takeaways"
              values={form.takeaways}
              onChange={(values) => update('takeaways', values)}
              placeholder="Spring favours blossom and softer roads"
            />
          </FormSection>

          <FormSection
            title="Sections"
            description="Each section has a heading and body. Separate paragraphs with a blank line."
          >
            <div className="space-y-4">
              {form.sections.map((section, index) => (
                <div
                  key={index}
                  className="space-y-3 rounded-md border border-accent/10 p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <Input
                      value={section.heading}
                      onChange={(event) => {
                        const next = [...form.sections];
                        next[index] = { ...section, heading: event.target.value };
                        update('sections', next);
                      }}
                      placeholder="Section heading"
                      className={fieldClass}
                    />
                    <button
                      type="button"
                      aria-label="Remove section"
                      className="flex size-10 shrink-0 items-center justify-center rounded-md text-foreground/40 hover:bg-muted hover:text-[#8f3d3d]"
                      onClick={() =>
                        update(
                          'sections',
                          form.sections.filter((_, i) => i !== index),
                        )
                      }
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                  <Textarea
                    rows={5}
                    value={section.paragraphs.join('\n\n')}
                    onChange={(event) => {
                      const next = [...form.sections];
                      next[index] = {
                        ...section,
                        paragraphs: event.target.value.split(/\n\s*\n/),
                      };
                      update('sections', next);
                    }}
                    placeholder="Write the section body…"
                    className={textareaClass}
                  />
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => update('sections', [...form.sections, emptySection()])}
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent"
            >
              <Plus size={15} />
              Add section
            </button>
          </FormSection>

          <div className="flex flex-wrap gap-3">
            <Button type="submit" variant="primary" size="lg" disabled={status === 'saving'}>
              {status === 'saving' ? 'Saving…' : isEdit ? 'Save story' : 'Publish story'}
            </Button>
            <Button href="/admin/blogs" variant="secondary" size="lg">
              Cancel
            </Button>
          </div>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <p className="mb-3 text-[11px] font-medium tracking-[0.16em] text-accent uppercase">
            Card preview
          </p>
          <BlogCard post={preview} href="#" />
        </aside>
      </form>
    </div>
  );
}
