export const fieldClass =
  'h-12 rounded-md border-accent/15 bg-background px-3.5 text-sm shadow-none transition-colors focus-visible:border-accent/40';

export const selectClass =
  'h-12 w-full data-[size=default]:h-12 rounded-md border-accent/15 bg-background px-3.5 text-sm shadow-none transition-colors focus-visible:border-accent/40 focus-visible:ring-0';

export const textareaClass =
  'min-h-32 rounded-md border-accent/15 bg-background px-3.5 py-3 text-sm shadow-none focus-visible:border-accent/40';

export const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const;

export const PLACEHOLDER_IMAGE =
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1400&q=80';

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function isHttpUrl(value: string) {
  return /^https?:\/\//i.test(value);
}
